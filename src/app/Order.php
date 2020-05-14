<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';
    protected $primaryKey = 'id';
    //protected $with = ['order_detail','table'];

    public function order_detail()
    {
        return $this->hasMany('App\OrderDetail');
    }

    public function table()
    {
        return $this->belongsTo('App\Table');
    }
}
