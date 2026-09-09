<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RegisterUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'correo' => 'required|email',
                'contraseña' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $usuario = RegisterUsuario::where('correo', $request->correo)->first();

            if (!$usuario || !Hash::check($request->contraseña, $usuario->contraseña)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciales inválidas'
                ], 401);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Login exitoso',
                'user' => [
                    'id' => $usuario->id,
                    'nombres' => $usuario->nombres,
                    'apellidos' => $usuario->apellidos,
                    'nombre_usuario' => $usuario->nombre_usuario,
                    'correo' => $usuario->correo,
                    'rol' => $usuario->rol,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al iniciar sesión: ' . $e->getMessage()
            ], 500);
        }
    }
}