<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\StoreHasProduct;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(
            Product::orderBy('created_at', 'desc')->get()
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
            'price' => 'required|numeric|between:1,100000',
            'unit' => 'required|string|max:50',
            'categories_id' => 'required',
        ];

        $requiredMessage = ':attribute จำเป็นต้องกรอก';
        $maxMessage = ':attribute ต้องไม่เกิน :max ตัวอักษร';
        $maxNumbericMessage = ':attribute ต้องอยู่ระหว่าง :min ถึง :max';
        $validateMessages = [
            'name.required' =>  $requiredMessage,
            'description.required' =>  $requiredMessage,
            'price.required' =>  $requiredMessage,
            'unit.required' =>  $requiredMessage,
            'categories_id.required' =>  $requiredMessage,

            'name.max' =>  $maxMessage,
            'description.max' =>  $maxMessage,
            'price.between' =>  $maxNumbericMessage,
            'unit.max' =>  $maxMessage,
        ];

        $attributesName = [
            'name' => 'ชื่อสินค้า',
            'description' => 'รายละเอียดสินค้า',
            'price' => 'ราคาสินค้า',
            'unit' => 'หน่วยสินค้า',
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

            $product = new Product();

            $product->fill([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'unit' => $request->input('unit'),
                'categories_id' => $request->input('categories_id'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($product->save()) {
                DB::commit();

                return response()->json([
                    'message' => "เพิ่มข้อมูลสินค้า $product->name เรียบร้อย",
                    'data' => $product->getAttributes(),
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
            $product = Product::findOrFail($id);

            return response()->json([
                'status' => 200,
                'message' => "ข้อมูลสินค้า: $product->name",
                'data' => $product->getAttributes(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'ไม่พบข้อมูลสินค้า',
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
            'price' => 'required|numeric|between:1,100000',
            'unit' => 'required|string|max:50',
            'categories_id' => 'required',
        ];

        $requiredMessage = ':attribute จำเป็นต้องกรอก';
        $maxMessage = ':attribute ต้องไม่เกิน :max ตัวอักษร';
        $maxNumbericMessage = ':attribute ต้องอยู่ระหว่าง :min ถึง :max';
        $validateMessages = [
            'name.required' =>  $requiredMessage,
            'description.required' =>  $requiredMessage,
            'price.required' =>  $requiredMessage,
            'unit.required' =>  $requiredMessage,
            'categories_id.required' =>  $requiredMessage,

            'name.max' =>  $maxMessage,
            'description.max' =>  $maxMessage,
            'price.between' =>  $maxNumbericMessage,
            'unit.max' =>  $maxMessage,
        ];

        $attributesName = [
            'name' => 'ชื่อสินค้า',
            'description' => 'รายละเอียดสินค้า',
            'price' => 'ราคาสินค้า',
            'unit' => 'หน่วยสินค้า',
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
            $product = Product::findOrFail($id);

            DB::beginTransaction();

            $product->fill([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'unit' => $request->input('unit'),
                'categories_id' => $request->input('categories_id'),
                'updated_at' => now(),
            ]);

            if ($product->save()) {
                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => "แก้ไขข้อมูลสินค้า $product->name เรียบร้อย",
                    'data' => $product->getAttributes(),
                ], 200);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'ไม่พบข้อมูล สินค้า',
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
            $product = Product::findOrFail($id);
            $storeHasProduct = StoreHasProduct::where(['product_id' => $id]);

            DB::beginTransaction();

            if ($product->delete()) {

                if ($storeHasProduct->count() > 0)
                    $storeHasProduct->delete();

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => "ลบข้อมูลสินค้า $product->name เรียบร้อย",
                    'data' => $product->getAttributes(),
                ], 200);
            }
        } catch (ModelNotFoundException $e) {
            return response([
                'status' => 404,
                'message' => 'ไม่พบข้อมูล สินค้า',
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
