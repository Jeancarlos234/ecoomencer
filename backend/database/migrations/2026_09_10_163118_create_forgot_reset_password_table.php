<?php
// database/migrations/xxxx_xx_xx_create_forgot_reset_password_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forgot_reset_password', function (Blueprint $table) {
            $table->id();
            $table->string('correo')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forgot_reset_password');
    }
};