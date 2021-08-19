<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name')->nullable()->comment('ชื่อร้านค้า');
            $table->text('description')->nullable()->comment('คำอธิบายร้านค้า');
            $table->string('phone_number', 20)->nullable()->comment('เบอร์ติดต่อร้านค้า');
            $table->text('address')->nullable()->comment('ที่อยู่');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}
