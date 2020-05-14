<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderDetail;

class OrderController extends Controller
{
    public function all(){
        $response = Order::with('order_detail')->get();
        return $response;
    }

    public function create(Request $request){
        $body = json_decode($request->getContent());
        
        $order = new Order();
        $order->table_id = $body->table_id;
        $order->save();

        $orderdetails = [];
        foreach($body->details as $item){
            $details = new OrderDetail();
            $details->drink_id = $item->drink_id;
            $details->drink_name = $item->drink_name;
            $details->qty = $item->qty;
            array_push($orderdetails, $details);
        }

        $order->order_detail()->saveMany($orderdetails);

        return 'ok';
        //$order->table()->associate = ;

    }

    public function getById($id){
        /* $response = Order::find($id)->with(['order_detail' => function ($query) {
            $query->where('trashed', '<>', 1);
        }])->get(); */
        //return Order::find($id)->order_detail()->get();
        /* $data = Order::find($id)->get();
        $details = Order::find($id)->order_detail()->get();
        $data->details = $details;
        return $data; */
        return Order::find($id)->load('order_detail');
        //return Order::with('order_detail')->find($id); //OK
        //return Order::with('order_detail')->find($id);
    }
}
