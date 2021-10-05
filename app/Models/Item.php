<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SebastianBergmann\Environment\Runtime;

class Item extends Model
{
    use HasFactory;

    public function invoices() {
        return $this->belongsToMany(Invoice::class);
    }
}
