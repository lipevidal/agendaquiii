<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->middleware('jwt.auth')->group(function() {
    Route::get('user', 'App\Http\Controllers\UserController@index');
    Route::post('user', 'App\Http\Controllers\UserController@store');
    Route::get('user/{id}', 'App\Http\Controllers\UserController@show');
    Route::put('user/{id}', 'App\Http\Controllers\UserController@update');
    Route::delete('use/{id}', 'App\Http\Controllers\UserController@destroy');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
});

Route::post('login', 'App\Http\Controllers\AuthController@login');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
