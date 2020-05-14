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

Route::get('/ingredients', 'IngredientController@all');
Route::get('/ingredients/{name}', 'IngredientController@searchByName');

Route::get('/search', 'SearchController@search');

Route::get('/drinks/random', 'DrinkController@randomDrinks');
Route::get('/drinks/{id}', 'DrinkController@lookup');

Route::get('/orders', 'OrderController@all');
Route::get('/orders/{id}', 'OrderController@getById');
Route::post('/orders', 'OrderController@create');