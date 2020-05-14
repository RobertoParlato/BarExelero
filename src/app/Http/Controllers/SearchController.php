<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
    public function search(Request $request){
        if(isset($request->ingredient)){
            $response = Http::get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='.$request->ingredient);
            return $response['drinks'];
        }else{
            return [];
        }
    }
}
