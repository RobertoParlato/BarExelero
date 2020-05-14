<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $table = 'table';
    protected $primaryKey = 'id';

    public function order()
    {
        return $this->hasMany('App\Order');
    }
}
