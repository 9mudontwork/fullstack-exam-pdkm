<?php

use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\StoreHasProductController;
use Illuminate\Support\Facades\Route;

Route::group([
    // 'prefix' => 'stores',
    // 'as' => 'stores.',
], function () {

    Route::resource('stores', StoreController::class);
    Route::resource('stores.products', StoreHasProductController::class);
});
