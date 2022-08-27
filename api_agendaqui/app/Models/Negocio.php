<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Negocio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'logo',
        'tipo',
        'pagina',
    ];

    public function rules() {
        return [
            'nome' => 'required|min:2',
            'logo' => 'required|file|mimes:png,jpeg,jpg',
            'tipo' => 'required|min:3',
            'pagina' => 'required|min:2|unique:negocios,pagina,'.$this->id,
        ];
    }

    public function feedback() {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.min' => 'O nome deve ter no mínimo 2 caracteres',
            'logo.required' => 'A logo é obrigatória',
            'logo.file' => 'A logo deve ser uma imagem',
            'logo.mimes' => 'A logo deve ser do tipo png, jpeg pu jpg',
            'tipo.required' => 'O tipo de negócio é obrigatório',
            'tipo.min' => 'O tipo de negócio deve ter no mínimo 2 caracteres',
            'pagina.required' => 'O nome da página é obrigatória',
            'pagina.min' => 'O nome da página deve ter no mínimo 2 caracteres',
            'pagina.unique' => 'Este nome de página já existe'
        ];
    }

    public function unidades() {
        return $this->hasMany('App\Models\Unidade');
    }

    public function users() {
        return $this->hasMany('App\Models\User');
    }
}
