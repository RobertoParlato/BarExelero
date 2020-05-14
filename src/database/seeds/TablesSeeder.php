<?php

use Illuminate\Database\Seeder;

class TablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('table')->insert([
            [
                'number' => 10
            ],
            [
                'number' => 11
            ],
            [
                'number' => 12
            ]
        ]);
    }
}
