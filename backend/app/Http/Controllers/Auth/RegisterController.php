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
            // Nombres: solo letras y espacios, 2-100 caracteres
            'nombres' => [
                'required',
                'string',
                'min:2',
                'max:100',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u',
            ],
            // Apellidos: solo letras y espacios, 2-100 caracteres
            'apellidos' => [
                'required',
                'string',
                'min:2',
                'max:100',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u',
            ],
            'nombre_usuario' => 'required|string|min:3|max:50|unique:register_usuario,nombre_usuario',
            'correo' => 'required|email|max:100|unique:register_usuario,correo',
            // Cédula: exactamente 10 dígitos numéricos
            'numero_cedula' => [
                'required',
                'string',
                'digits:10',
                'unique:register_usuario,numero_cedula',
            ],
            // Edad: número entero entre 18 y 99
            'edad' => 'required|integer|min:18|max:99',
            'contraseña' => 'required|string|min:8|confirmed',
        ], [
            // Mensajes personalizados
            'nombres.required' => 'El nombre es obligatorio',
            'nombres.min' => 'El nombre debe tener al menos 2 caracteres',
            'nombres.max' => 'El nombre no puede exceder 100 caracteres',
            'nombres.regex' => 'El nombre solo puede contener letras y espacios',

            'apellidos.required' => 'El apellido es obligatorio',
            'apellidos.min' => 'El apellido debe tener al menos 2 caracteres',
            'apellidos.max' => 'El apellido no puede exceder 100 caracteres',
            'apellidos.regex' => 'El apellido solo puede contener letras y espacios',

            'nombre_usuario.required' => 'El nombre de usuario es obligatorio',
            'nombre_usuario.min' => 'El nombre de usuario debe tener al menos 3 caracteres',
            'nombre_usuario.max' => 'El nombre de usuario no puede exceder 50 caracteres',
            'nombre_usuario.unique' => 'Este nombre de usuario ya está en uso',

            'correo.required' => 'El correo es obligatorio',
            'correo.email' => 'El correo no tiene un formato válido',
            'correo.unique' => 'Este correo ya está registrado',

            'numero_cedula.required' => 'El número de cédula es obligatorio',
            'numero_cedula.digits' => 'El número de cédula debe tener exactamente 10 dígitos',
            'numero_cedula.unique' => 'Este número de cédula ya está registrado',

            'edad.required' => 'La edad es obligatoria',
            'edad.integer' => 'La edad debe ser un número',
            'edad.min' => 'Debes ser mayor de 18 años',
            'edad.max' => 'La edad ingresada no es válida',

            'contraseña.required' => 'La contraseña es obligatoria',
            'contraseña.min' => 'La contraseña debe tener al menos 8 caracteres',
            'contraseña.confirmed' => 'Las contraseñas no coinciden',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
            ], 422);
        }

        try {
            $usuario = RegisterUsuario::create([
                'nombres'        => $request->nombres,
                'apellidos'      => $request->apellidos,
                'nombre_usuario' => $request->nombre_usuario,
                'correo'         => $request->correo,
                'numero_cedula'  => $request->numero_cedula,
                'edad'           => $request->edad,
                'contraseña'     => Hash::make($request->contraseña),
                'rol'            => 'usuario',
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Usuario registrado exitosamente',
                'data'    => [
                    'id'             => $usuario->id,
                    'nombres'        => $usuario->nombres,
                    'apellidos'      => $usuario->apellidos,
                    'nombre_usuario' => $usuario->nombre_usuario,
                    'correo'         => $usuario->correo,
                    'numero_cedula'  => $usuario->numero_cedula,
                    'edad'           => $usuario->edad,
                    'rol'            => $usuario->rol,
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Error al registrar usuario',
                'error'   => config('app.debug') ? $e->getMessage() : 'Error interno del servidor',
            ], 500);
        }
    }
}