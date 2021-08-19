<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $create_at
 * @property string $update_at
 */
class Category extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'description', 'create_at', 'update_at'];

}
