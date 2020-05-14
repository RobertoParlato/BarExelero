<?php

use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        $list = $response['drinks'];
        $insertlist = array();
        foreach($list as $ingr){
            array_push($insertlist, ['name' => $ingr['strIngredient1']]);
        }
        DB::table('ingredient')->insert($insertlist);
    }
}
