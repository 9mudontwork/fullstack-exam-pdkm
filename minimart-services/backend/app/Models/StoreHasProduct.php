<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $stores_id
 * @property int $products_id
 */
class StoreHasProduct extends Model
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stores_has_products';

    /**
     * @var array
     */
    protected $fillable = [];
}
