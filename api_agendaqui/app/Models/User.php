<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'senha',
        'adm',
        'proprietario',
    ];

    public function rules() {
        return [
            'nome' => 'required|min:3',
            'email' => 'required|email|unique:users,email'.$this->id,
            'telefone' => 'required|min:13|max:14|unique:users,telefone'.$this->id,
            'senha' => 'required|min:4',
        ];
    }

    public function feedback() {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.min' => 'O nome deve ter no mínimo 3 caracteres',
            'email.required' => 'O email é obrigatório',
            'email.email' => 'Digite um email válido',
            'email.unique' => 'Este email já existe',
            'telefone.required' => 'O telefone é obrigatório',
            'telefone.min' => 'Digite um telefone válido',
            'telefone.max' => 'Digite um telefone válido',
            'telefone.unique' => 'Este telefone já existe',
            'senha.required' => 'A senha é obrigatória',
            'senha.min' => 'A senha deve ter no mínimo 4 caracteres',
        ];
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'senha',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
