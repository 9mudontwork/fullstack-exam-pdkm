<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('categories')->delete();
        
        \DB::table('categories')->insert(array (
            0 => 
            array (
                'name' => 'ขนมขบเคี้ยว',
                'description' => 'ขนมขบเคี้ยว ขนมขบเคี้ยว ขนมขบเคี้ยว ขนมขบเคี้ยว ขนมขบเคี้ยว',
                'create_at' => '2021-08-20 02:09:01',
                'update_at' => '2021-08-20 02:09:01',
            ),
            1 => 
            array (
                'name' => 'นม',
                'description' => 'นม นม นม นม นม นม นม นม',
                'create_at' => '2021-08-20 02:09:18',
                'update_at' => '2021-08-20 02:09:18',
            ),
            2 => 
            array (
                'name' => 'เครื่องดื่มอัดลมและน้ำหวาน',
                'description' => 'เครื่องดื่มอัดลมและน้ำหวาน เครื่องดื่มอัดลมและน้ำหวาน เครื่องดื่มอัดลมและน้ำหวาน เครื่องดื่มอัดลมและน้ำหวาน เครื่องดื่มอัดลมและน้ำหวาน เครื่องดื่มอัดลมและน้ำหวาน',
                'create_at' => '2021-08-20 02:09:35',
                'update_at' => '2021-08-20 02:09:35',
            ),
            3 => 
            array (
                'name' => 'อื่นๆ',
                'description' => 'อื่นๆ อื่นๆ อื่นๆ อื่นๆ อื่นๆ อื่นๆ อื่นๆ อื่นๆ',
                'create_at' => '2021-08-20 02:09:44',
                'update_at' => '2021-08-20 02:09:44',
            ),
        ));
        
        
    }
}