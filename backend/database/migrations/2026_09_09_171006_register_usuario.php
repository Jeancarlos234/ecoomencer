<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('register_usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('nombre_usuario')->unique();
            $table->string('correo')->unique();
            $table->string('numero_cedula')->unique();
            $table->integer('edad');
            $table->string('contraseña');
            $table->enum('rol', ['usuario', 'administrador', 'moderador', 'owner'])->default('usuario');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('register_usuario');
    }
};