<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StoreResource::collection(
            Store::orderBy('created_at', 'desc')->get()
            // ->limit(2)
            // ->paginate(2)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validateRules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];

        $validateMessages = [
            'name.required' =>  ':attribute จำเป็นต้องกรอก',
            'description.required' =>  ':attribute จำเป็นต้องกรอก',
            'phone_number.required' =>  ':attribute จำเป็นต้องกรอก',
            'address.required' =>  ':attribute จำเป็นต้องกรอก',

            'name.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'description.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'phone_number.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'address.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
        ];

        $attributesName = [
            'name' => 'ชื่อร้านค้า',
            'description' => 'คำอธิบายร้านค้า',
            'phone_number' => 'เบอร์ติดต่อร้านค้า',
            'address' => 'ที่อยู่',
        ];

        $validator = Validator::make($request->all(), $validateRules, $validateMessages, $attributesName);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
                'data' => null,
            ], 400);
        }

        try {
            DB::beginTransaction();

            $store = new Store();

            $store->fill([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'phone_number' => $request->input('phone_number'),
                'address' => $request->input('address'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($store->save()) {
                DB::commit();

                return response()->json([
                    'message' => "เพิ่มข้อมูลร้าน $store->name เรียบร้อย",
                    'data' => $store->getAttributes(),
                ], 200);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
                'error' => "{$th->getLine()} {$th->getFile()}"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $store = Store::findOrFail($id);

            return response()->json([
                'status' => 200,
                'message' => "ข้อมูลร้านค้า $store->name",
                'data' => [
                    'store' => $store->getAttributes(),
                    'products' => $store->products
                ],
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'ไม่พบข้อมูล ร้านค้า',
                'data' => null,
            ], 404);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
                'error' => "{$th->getLine()} {$th->getFile()}"
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validateRules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];

        $validateMessages = [
            'name.required' =>  ':attribute จำเป็นต้องกรอก',
            'description.required' =>  ':attribute จำเป็นต้องกรอก',
            'phone_number.required' =>  ':attribute จำเป็นต้องกรอก',
            'address.required' =>  ':attribute จำเป็นต้องกรอก',

            'name.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'description.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'phone_number.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'address.max' =>  ':attribute ต้องไม่เกิน :max ตัวอักษร',
        ];

        $attributesName = [
            'name' => 'ชื่อร้านค้า',
            'description' => 'คำอธิบายร้านค้า',
            'phone_number' => 'เบอร์ติดต่อร้านค้า',
            'address' => 'ที่อยู่',
        ];

        $validator = Validator::make($request->all(), $validateRules, $validateMessages, $attributesName);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
                'data' => null,
            ], 400);
        }

        try {
            $store = Store::findOrFail($id);

            DB::beginTransaction();

            $store->fill([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'phone_number' => $request->input('phone_number'),
                'address' => $request->input('address'),
                'updated_at' => now(),
            ]);

            if ($store->save()) {
                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => "แก้ไขข้อมูลร้านค้า $store->name เรียบร้อย",
                    'data' => $store->getAttributes(),
                ], 200);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'ไม่พบข้อมูล ร้านค้า',
            ], 404);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
                'error' => "{$th->getLine()} {$th->getFile()}"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $store = Store::findOrFail($id);

            DB::beginTransaction();

            if ($store->delete()) {

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => "ลบข้อมูลร้านค้า $store->name เรียบร้อย",
                    'data' => $store->getAttributes(),
                ], 200);
            }
        } catch (ModelNotFoundException $e) {
            return response([
                'status' => 404,
                'message' => 'ไม่พบข้อมูล ร้านค้า',
            ], 404);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
                'error' => "{$th->getLine()} {$th->getFile()}"
            ], 500);
        }
    }
}
