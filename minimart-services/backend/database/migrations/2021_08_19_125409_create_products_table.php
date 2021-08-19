<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name')->nullable()->comment('ชื่อสินค้า');
            $table->text('description')->nullable()->comment('รายละเอียดสินค้า');
            $table->decimal('price', 10)->nullable()->comment('ราคาสินค้า');
            $table->string('unit_type')->nullable()->comment('หน่วยสินค้า');
            $table->string('created_at', 45)->nullable();
            $table->string('updated_at', 45)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
