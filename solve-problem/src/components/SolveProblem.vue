<template>
  <n-config-provider :theme="darkTheme" class="item-FK1RYbfX">
    <!-- :default-expanded-names="['1', '2', '3']" -->
    <n-collapse :default-expanded-names="['3']">
      <!-- ===== 1 ===== -->
      <n-collapse-item title="ข้อ 1.1" name="1">
        <div>
          <n-h4
            >1.1 มีหินอยู่จำนวน N ก้อน แต่ละก้อนสามารถเป็นสีแดง R เขียว G หรือน้ำเงิน B
            หากนำหินทั้งหมดไปสุ่มวางเรียงกันเป็นแถวเดียว
            จงหาจำนวนของคู่หินที่มีสีเดียวกันและอยู่ติดกัน
          </n-h4>
        </div>

        <div>
          <n-card title="คำตอบ">
            <n-space vertical>
              <n-form :model="one.formValue" :rules="one.rules" ref="oneForm">
                <n-form-item label="จำนวนหิน" path="rockCount">
                  <n-input-number
                    v-model:value="one.formValue.rockCount"
                    min="1"
                    placeholder="ใส่จำนวนหิน"
                  />
                </n-form-item>

                <n-form-item label="ใส่หิน R G B" path="rockChar">
                  <n-input
                    v-model:value="one.formValue.rockChar"
                    :placeholder="`ใส่หิน ${one.formValue.rockCount ?? 'x'} ก้อน`"
                  />
                </n-form-item>
              </n-form>
            </n-space>
            มีจำนวนคู่หินที่มีสีเดียวกันติดอยู่ <n-text type="info">{{ one.answer }}</n-text> คู่
          </n-card>
        </div>
      </n-collapse-item>
      <!-- ===== 2 ===== -->
      <n-collapse-item title="ข้อ 1.2" name="2">
        <div>
          <n-h4>
            1.2 ประเทศ XYZ มีธนบัตรทั้งหมดอยู่ 5 ชนิดคือ 1, 5, 10, 20 และ 100
            ลุงพรชัยมีเงินอยู่ในธนาคาร N บาท
            หากถอนเงินออกมาทั้งหมดจะได้ธนบัตรจำนวนน้อยที่สุดจำนวนเท่าไร
          </n-h4>
        </div>

        <div>
          <n-card title="คำตอบ">
            <n-space vertical>
              <n-form :model="two.formValue" :rules="two.rules" ref="twoForm">
                <n-form-item label="จำนวนเงิน" path="moneyAmount">
                  <n-input-number
                    v-model:value="two.formValue.moneyAmount"
                    min="0"
                    placeholder="ใส่จำนวนเงิน"
                  />
                </n-form-item>
              </n-form>
            </n-space>
            จำนวนธนบัตรที่น้อยที่สุดที่ลุงพรชัยจะได้รับ
            <n-text type="info">{{ toCommaNumber(two.answer.value) }}</n-text>
            ใบ
          </n-card>
        </div>
      </n-collapse-item>
      <!-- ===== 3 ===== -->
      <n-collapse-item title="ข้อ 1.3  (Optional Test)" name="3">
        <div>
          <n-h4>
            1.3 * (Optional Test) ใช้ภาษาอะไรก็ได้เพื่อแก้ไขปัญหา กิ่งไม้มีความยาวเป็น N
            ต้องการตัดกิ่งไม้เป็นท่อนเล็กๆ ตามเงื่อนไขสองข้อดังต่อไปนี้:
            <ul>
              <li>กิ่งไม้แต่ละท่อนต้องมีความยาว A, B หรือ C</li>
              <li>จำนวนท่อนไม้ควรมีมากที่สุด</li>
            </ul>
            Input บรรทัดแรกจะเป็นค่า N A B C โดยที่ N คือ ความยาวของกิ่งไม้ (1 ≤ N) และ A, B, C
            คือความยาวของท่อนไม้ที่กำหนด (A, B, C ≤ 4000) Output แสดงจำนวนท่อนไม้ทั้งหมดที่ตัดได้
          </n-h4>
        </div>

        <div>
          <n-card title="คำตอบ">
            <n-space vertical>
              <n-form :model="three.formValue" :rules="three.rules" ref="threeForm">
                <n-form-item label="ใส่ข้อมูลรูปแบบ N A B C" path="timberData">
                  <n-input
                    v-model:value="three.formValue.timberData"
                    placeholder="ใส่ข้อมูลรูปแบบ N A B C"
                  />
                </n-form-item>
              </n-form>
            </n-space>
            จำนวนท่อนไม้ทั้งหมดที่ตัดได้ <n-text type="info">{{ three.answer }}</n-text> ท่อน
          </n-card>
        </div>
      </n-collapse-item>
    </n-collapse>
  </n-config-provider>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue'
  // component
  import {
    NCollapse,
    NCollapseItem,
    NH4,
    NCard,
    NText,
    NInputNumber,
    NSpace,
    NForm,
    NFormItem,
    NInput,
    NFormItemGi,
    NGrid,
    NButton,
  } from 'naive-ui'
  // theme
  import { darkTheme, NConfigProvider } from 'naive-ui'

  const props = defineProps({
    darkTheme,
  })

  const oneForm = ref(null)
  const twoForm = ref(null)
  const threeForm = ref(null)

  const toCommaNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  /**
   * 1.1 มีหินอยู่จำนวน N ก้อน แต่ละก้อนสามารถเป็นสีแดง R เขียว G หรือน้ำเงิน B หากนำหินทั้งหมดไปสุ่มวางเรียงกันเป็นแถวเดียว จงหาจำนวนของคู่หินที่มีสีเดียวกันและอยู่ติดกัน
   */
  const findOneAnswer = () => {
    const { rockCount, rockChar } = one.formValue
    let totalEven = 0
    let splitRockChar = Array.from(rockChar)
    splitRockChar.map((char, index) => {
      if (char === splitRockChar[index - 1]) totalEven += 1
    })

    oneForm.value.validate((errors) => {
      if (!errors) {
        one.answer.value = totalEven
      } else {
        one.answer.value = 'ใส่ข้อมูลไม่ถูกต้อง'
      }
    })
  }

  const one = {
    oneForm,
    formValue: reactive({
      rockCount: 1,
      rockChar: '',
    }),
    rules: {
      rockCount: {
        message: 'กรุณาใส่จำนวนหิน',
        trigger: ['blur', 'input', 'change'],
        validator: (rule, value) => {
          return value >= 1
        },
      },
      rockChar: [
        {
          required: true,
          trigger: ['blur', 'input', 'change'],
          message: 'กรุณาใส่หิน',
        },
        {
          trigger: ['blur', 'input', 'change'],
          message: `กรุณาใส่จำนวนหินให้ตรง`,
          validator: (rule, value) => {
            return value.length === one.formValue.rockCount
          },
        },
        {
          trigger: ['blur', 'input', 'change'],
          message: 'ใส่ได้เฉพาะตัวอักษร R G B',
          validator: (rule, value) => {
            return !/[^RGB]/.test(value)
          },
        },
      ],
    },
    answer: ref(0),
  }

  watch([one.formValue], ([oldCount, newCount]) => {
    findOneAnswer()
  })

  /**
   * 1.2 ประเทศ XYZ มีธนบัตรทั้งหมดอยู่ 5 ชนิดคือ 1, 5, 10, 20 และ 100 ลุงพรชัยมีเงินอยู่ในธนาคาร N บาท หากถอนเงินออกมาทั้งหมดจะได้ธนบัตรจำนวนน้อยที่สุดจำนวนเท่าไร
   */

  const findTwoAnswer = () => {
    const { moneyAmount } = two.formValue
    let cashCount = 0
    let moneyLeft = moneyAmount
    let cashTypes = [100, 20, 10, 5, 1]

    cashTypes.map((cashType) => {
      let divMoney = Math.floor(moneyLeft / cashType)
      cashCount += divMoney
      moneyLeft = moneyLeft - cashType * divMoney
    })

    two.answer.value = cashCount
  }

  const two = {
    twoForm,
    formValue: reactive({
      moneyAmount: 0,
    }),
    rules: {
      moneyAmount: {
        message: 'กรุณาใส่จำนวนเงิน',
        trigger: ['blur', 'input', 'change'],
        validator: (rule, value) => {
          return value >= 1
        },
      },
    },
    answer: ref(0),
  }

  watch([two.formValue], ([oldCount, newCount]) => {
    findTwoAnswer()
  })

  // 1.3 * (Optional Test) ใช้ภาษาอะไรก็ได้เพื่อแก้ไขปัญหา

  // กิ่งไม้มีความยาวเป็น N ต้องการตัดกิ่งไม้เป็นท่อนเล็กๆ ตามเงื่อนไขสองข้อดังต่อไปนี้:

  // กิ่งไม้แต่ละท่อนต้องมีความยาว A, B หรือ C
  // จำนวนท่อนไม้ควรมีมากที่สุด
  // Input บรรทัดแรกจะเป็นค่า N A B C โดยที่ N คือ ความยาวของกิ่งไม้ (1 ≤ N) และ A, B, C คือความยาวของท่อนไม้ที่กำหนด (A, B, C ≤ 4000) Output แสดงจำนวนท่อนไม้ทั้งหมดที่ตัดได้

  /**
   * Input
   * 5 5 3 2
   * Output
   * 2
   */

  const findThreeAnswer = () => {
    // const { timberData } = three.formValue

    let defaultTimberData = [5, 2, 2, 2]
    // let defaultTimberData = [3921, 17, 298, 107]
    let defaultN = defaultTimberData[0]
    let timberCount = 0

    defaultTimberData.shift()
    defaultTimberData.sort((a, b) => a - b)

    let loopCount = 0

    const calculateTimber = (timberData, N, timberCount) => {
      loopCount += 1

      let NLeft = N
      let A = timberData[0]
      let B = timberData[1]

      console.log(`${loopCount} - เหลือ ${NLeft} ท่อน`)
      console.log(`${loopCount} - ลองหารหาเศษด้วย ${A} เหลือเศษ ${NLeft % A} ท่อน`)

      //   ถ้าเหลือ
      if (NLeft % A != 0) {
        console.log(`${loopCount} - เหลือ ${NLeft} ท่อน ลบ ${B} ออก 1 ท่อน`)

        timberCount += 1
        console.log(`${loopCount} - ตอนนี้มี ${B} อยู่ ${timberCount} ท่อน`)

        return calculateTimber(timberData, NLeft - B, timberCount)
      }
      // ถ้าไม่เหลือ
      else {
        console.log(
          `${loopCount} - สุดท้ายไม่เหลือเศษแล้ว เอาที่เหลือ ${NLeft} ท่อน หารกับ ${A} ได้ ${
            NLeft / A
          } ท่อน แล้วบวก ${timberCount} ท่อน จาก ${B}`
        )
        return Math.floor(NLeft / A) + timberCount
      }
    }

    // timberCount = calculateTimber(defaultTimberData, defaultN, timberCount)

    three.answer.value = timberCount

    // เอา comment consol.log ออกเฉยๆ
    // let defaultTimberData = [3921, 17, 298, 107]
    // let defaultN = defaultTimberData[0]
    // let timberCount = 0

    // defaultTimberData.shift()
    // defaultTimberData.sort((a, b) => a - b)

    // const calculateTimber = (timberData, N, timberCount) => {
    //   let NLeft = N
    //   let A = timberData[0]
    //   let B = timberData[1]

    //   if (NLeft % A != 0) {
    //     timberCount += 1

    //     return calculateTimber(timberData, NLeft - B, timberCount)
    //   } else {
    //     return Math.floor(NLeft / A) + timberCount
    //   }
    // }

    // calculateTimber(defaultTimberData, defaultN, timberCount)
  }

  const three = {
    threeForm,
    formValue: reactive({
      timberData: '',
    }),
    rules: {
      timberData: [
        {
          message: 'รูปแบบข้อมูลไม่ถูกต้อง Ex. 1 4000 4000 4000',
          trigger: ['blur', 'input', 'change'],
          validator: (rule, value) => {
            let testValues = value.split(' ')
            if (testValues.length == 4) {
              let isNumber = true
              testValues.map((testValue) => {
                isNumber = !/[^0-9]/.test(testValue) ? true : false
              })

              if (isNumber) {
                return testValues[0] >= 1
                  ? testValues[1] <= 4000 && testValues[2] <= 4000 && testValues[3] <= 4000
                  : false
              }
            }

            return false
          },
        },
      ],
    },
    answer: ref(0),
  }

  watch([three.formValue], ([oldCount, newCount]) => {
    // findThreeAnswer()
  })
</script>

<style>
  html,
  body {
    background-color: #18181c;
    height: 100vh;
    padding: 24px;
  }
</style>

<style scoped>
  .item-FK1RYbfX {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
</style>
