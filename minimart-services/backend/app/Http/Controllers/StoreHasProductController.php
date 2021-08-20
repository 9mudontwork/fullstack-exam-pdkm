<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class StoreHasProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        try {
            $store = Store::findOrFail($id);
            $product = new Product();

            $store->products()->syncWithoutDetaching($request->input('categories_id'));

            return response()->json([
                'status' => 200,
                'message' => "เพิ่มข้อมูลสินค้าในร้านค้า $store->name เรียบร้อย",
                'data' => [
                    'store' => $store->getAttributes(),
                    'products' => $store->products,
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $productId)
    {
        try {
            $store = Store::findOrFail($id);
            $product = new Product();

            $store->products()->detach($productId);

            return response()->json([
                'status' => 200,
                'message' => "ลบข้อมูลสินค้า เรียบร้อย",
                'data' => [
                    'store' => $store->getAttributes(),
                    'products' => $store->products,
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
}
