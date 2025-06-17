<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'shopify_order_id',
        'customer_name',
        'email',
        'items',
        'raw',
        'status',
    ];
}
