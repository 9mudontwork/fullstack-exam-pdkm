<?php

use App\Http\Controllers\Api\StoreController;
use Illuminate\Support\Facades\Route;

Route::group([
    // 'prefix' => 'stores',
    // 'as' => 'stores.',
], function () {

    Route::resource('stores', StoreController::class);
});
