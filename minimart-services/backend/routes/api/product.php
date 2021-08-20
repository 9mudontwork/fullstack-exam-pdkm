<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::group([
    // 'prefix' => 'stores',
    // 'as' => 'stores.',
], function () {

    Route::resource('products', ProductController::class);
});
