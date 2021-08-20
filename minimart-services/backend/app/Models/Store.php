<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $phone_number
 * @property string $address
 * @property string $created_at
 * @property string $updated_at
 */
class Store extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'description', 'phone_number', 'address', 'created_at', 'updated_at'];


    public function products()
    {
        return $this->belongsToMany(Product::class, 'stores_has_products');
    }
}
