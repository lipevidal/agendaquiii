<?php

namespace App\Http\Controllers;

use App\Models\Negocio;
use App\Http\Requests\StoreNegocioRequest;
use App\Http\Requests\UpdateNegocioRequest;
use Illuminate\Http\Request;

class NegocioController extends Controller
{
    public function __construct(Negocio $negocio) {
        $this->negocio = $negocio;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $negocios = $this->negocio::all();
        return $negocios;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreNegocioRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->validar) {
            $request->validate($this->negocio->rules(), $this->negocio->feedback());
        } else {
            $imagem = $request->file('logo');
            $imagem_urn = $imagem->store('imagens/logo', 'public');
            $negocio = $this->negocio->create([
                'nome' => $request->nome,
                'logo' => $imagem_urn,
                'tipo' => $request->tipo,
                'pagina' => $request->pagina
            ]);
            return $negocio;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function show(Negocio $negocio)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateNegocioRequest  $request
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateNegocioRequest $request, Negocio $negocio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Negocio $negocio)
    {
        //
    }
}
