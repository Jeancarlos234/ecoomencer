<?php
// app/Http/Controllers/PasswordResetController.php

namespace App\Http\Controllers;

use App\Models\RegisterUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * PASO 1: Enviar correo con token
     */
    public function sendResetLink(Request $request)
    {
        try {
            $validated = $request->validate([
                'correo' => 'required|email|exists:register_usuario,correo',
            ]);

            $token = Str::random(60);

            // Eliminar tokens anteriores
            DB::table('forgot_reset_password')
                ->where('correo', $validated['correo'])
                ->delete();

            // Guardar nuevo token
            DB::table('forgot_reset_password')->insert([
                'correo' => $validated['correo'],
                'token' => $token,
                'created_at' => now(),
            ]);

            // Enviar correo
            Mail::send('emails.password-reset', [
                'token' => $token,
                'correo' => $validated['correo'],
            ], function ($message) use ($validated) {
                $message->to($validated['correo']);
                $message->subject('Recuperación de Contraseña - Ecoomencer');
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Se ha enviado un enlace de recuperación a tu correo',
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error en sendResetLink: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error al enviar el correo: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PASO 2: Verificar que el token sea válido
     */
    public function verifyToken(Request $request)
    {
        try {
            $validated = $request->validate([
                'correo' => 'required|email',
                'token' => 'required|string',
            ]);

            $tokenData = DB::table('forgot_reset_password')
                ->where('correo', $validated['correo'])
                ->where('token', $validated['token'])
                ->first();

            if (!$tokenData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                ], 400);
            }

            $tokenCreatedAt = Carbon::parse($tokenData->created_at);
            if ($tokenCreatedAt->addMinutes(60)->isPast()) {
                DB::table('forgot_reset_password')->where('correo', $validated['correo'])->delete();
                return response()->json([
                    'status' => 'error',
                    'message' => 'El token ha expirado',
                ], 400);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Token válido',
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al verificar el token',
            ], 500);
        }
    }

    /**
     * PASO 3: Cambiar la contraseña
     */
    public function resetPassword(Request $request)
    {
        try {
            $validated = $request->validate([
                'correo' => 'required|email',
                'token' => 'required|string',
                'contraseña' => 'required|string|min:8|confirmed',
            ]);

            $tokenData = DB::table('forgot_reset_password')
                ->where('correo', $validated['correo'])
                ->where('token', $validated['token'])
                ->first();

            if (!$tokenData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                ], 400);
            }

            $tokenCreatedAt = Carbon::parse($tokenData->created_at);
            if ($tokenCreatedAt->addMinutes(60)->isPast()) {
                DB::table('forgot_reset_password')->where('correo', $validated['correo'])->delete();
                return response()->json([
                    'status' => 'error',
                    'message' => 'El token ha expirado',
                ], 400);
            }

            $user = RegisterUsuario::where('correo', $validated['correo'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario no encontrado',
                ], 404);
            }

            $user->contraseña = Hash::make($validated['contraseña']);
            $user->save();

            // Eliminar token usado
            DB::table('forgot_reset_password')
                ->where('correo', $validated['correo'])
                ->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Contraseña actualizada exitosamente',
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error en resetPassword: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error al restablecer la contraseña',
            ], 500);
        }
    }
}