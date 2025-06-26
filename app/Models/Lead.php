<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'product',
    ];

    public function assignedOperator()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
