<?php
// app/Http/Controllers/Auth/RegisterController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RegisterUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'nombre_usuario' => 'required|string|max:50|unique:register_usuario',
            'correo' => 'required|email|max:100|unique:register_usuario',
            'numero_cedula' => 'required|string|max:20|unique:register_usuario',
            'edad' => 'required|integer|min:18|max:100',
            'contraseña' => 'required|string|min:8|confirmed',
            'contraseña_confirmation' => 'required',
            'rol' => 'required|in:usuario,administrador,moderador,owner',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $usuario = RegisterUsuario::create([
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'nombre_usuario' => $request->nombre_usuario,
            'correo' => $request->correo,
            'numero_cedula' => $request->numero_cedula,
            'edad' => $request->edad,
            'contraseña' => Hash::make($request->contraseña),
            'rol' => $request->rol,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario registrado exitosamente',
            'data' => $usuario
        ], 201);
    }
}