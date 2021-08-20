<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;

Route::group([
    // 'prefix' => 'stores',
    // 'as' => 'stores.',
], function () {

    Route::resource('categories', CategoryController::class);
});
