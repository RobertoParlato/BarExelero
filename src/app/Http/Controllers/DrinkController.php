<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DrinkController extends Controller
{
    public function lookup($id){
        $response = Http::get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=$id");

        if(isset($response['drinks'])){
            return $response['drinks'];
        }else{
            return [];
        }
    }

    public function randomDrinks(){
        $drinks = array();
        do{
            $response = Http::get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            array_push($drinks, $response['drinks'][0]);
        } while(count($drinks) < 9);
        return $drinks;
    }
}
