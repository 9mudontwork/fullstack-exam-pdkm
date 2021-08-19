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
            Store::orderBy('name', 'asc')
                ->limit(10)
                ->paginate(10)
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

        // $validateRules = [
        //     'name' => 'required|string|max:255',
        // ];

        // $validateMessages = [
        //     'name.required' =>  ':attribute จำเป็นต้องกรอก',
        //     'name.required' =>  ':attribute จำเป็นต้องกรอก',
        // ];

        // $attributesName = [
        //     'name' => 'ชื่อร้านค้า',
        //     'description' => 'คำอธิบายร้านค้า',
        //     'phone_number' => 'เบอร์ติดต่อร้านค้า',
        //     'address' => 'ที่อยู่',
        // ];

        // $validator = Validator::make($request->all(), $validateRules, $validateMessages, $attributesName);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 400,
        //         'message' => $validator->messages(),
        //         'data' => null,
        //     ], 400);
        // }

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
                    'message' => "สร้างมูลร้าน $store->name เรียบร้อย",
                    'data' => $store->getAttributes(),
                ], 200);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
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
                'data' => $store->getAttributes(),
            ], 200);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
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
                    'message' => "อัปเดตข้อมูลร้านค้า $store->name เรียบร้อย",
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
