<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class Invoice extends Model
{
    use HasFactory;

    // Custom id 
    protected $primaryKey = 'invoice_number';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'payment_term'
    ];


    public static function boot()
    {
        parent::boot();
        self::creating(function ($invoice) {
            $prefix = "IN";
            $config = [
                'table' => 'invoices',
                'field' => 'invoice_number',
                'length' => 6,
                'prefix' => $prefix
            ];

            $invoice->invoice_number = IdGenerator::generate($config);
        });
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function items() {
        return $this->belongsToMany(Item::class)->withPivot('quantity');
    }
    
}
