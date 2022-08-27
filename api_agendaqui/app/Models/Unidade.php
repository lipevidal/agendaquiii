<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'negocio_id',
        'nome',
        'link_whatsapp',
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado'
    ];

    public function rules() {
        return [
            'negocio_id' => 'exists:negocios,id',
            'nome' => 'required|min:2',
            'link_whatsapp' => 'required',
            'cep' => 'required|min:8',
            'rua' => 'required'
        ];
    }

    public function feedback() {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.min' => 'O nome deve ter no mínimo 2 caracteres',
            'link_whatsapp.required' => 'O link do whatsapp é obrigatório',
            'cep.required' => 'O cep é obrigatório',
            'cep.min' => 'Digite um cep válido',
            'rua.required' => 'A rua é obrigatória'
        ];
    }

    public function negocio() {
        return $this->belongsTo('App\Models\Negocio');
    }
}
