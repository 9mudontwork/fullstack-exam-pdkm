<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property float $price
 * @property string $unit
 * @property int $categories_id
 * @property string $created_at
 * @property string $updated_at
 */
class Product extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'description', 'price', 'unit', 'categories_id', 'created_at', 'updated_at'];

}
