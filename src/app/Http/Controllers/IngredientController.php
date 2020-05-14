<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;

class IngredientController extends Controller
{
    public function all(){
        $ingredients = Ingredient::all(); 
        return $ingredients;
    }

    public function searchByName($name){
        $ingredients = array();
        if(strlen($name) >= 3)
            $ingredients = Ingredient::where('name', 'like', '%'.$name.'%')->get(); 
        return $ingredients;
    }
}
