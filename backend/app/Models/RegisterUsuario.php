<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class RegisterUsuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'register_usuario';
    
    protected $fillable = [
        'nombres',
        'apellidos',
        'nombre_usuario',
        'correo',
        'numero_cedula',
        'edad',
        'contraseña',
        'rol',
    ];

    protected $hidden = [
        'contraseña',
        'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->contraseña;
    }
}