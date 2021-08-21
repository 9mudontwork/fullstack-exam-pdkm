<template>
  <n-config-provider :theme="darkTheme" class="item-FK1RYbfX">
    <n-collapse>
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
                    @keydown="$event.target.value.replace(!/(R|G|B)/g, '')"
                  />
                </n-form-item>

                <!-- <n-form-item>
                  <n-button @click="one.handleSubmitOne">คลิกดูคำตอบ</n-button>
                </n-form-item> -->
              </n-form>
            </n-space>
            มีจำนวนคู่หินที่มีสีเดียวกันติดอยู่ <n-text type="info">{{ one.answer }}</n-text> คู่
          </n-card>
        </div>
      </n-collapse-item>

      <n-collapse-item title="ข้อ 1.2" name="2">
        <div>
          <n-h4>
            1.2 ประเทศ XYZ มีธนบัตรทั้งหมดอยู่ 5 ชนิดคือ 1, 5, 10, 20 และ 100
            ลุงพรชัยมีเงินอยู่ในธนาคาร N บาท
            หากถอนเงินออกมาทั้งหมดจะได้ธนบัตรจำนวนน้อยที่สุดจำนวนเท่าไร
          </n-h4>
        </div>
      </n-collapse-item>

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
    handleSubmitOne(e) {
      e.preventDefault()
      one.oneForm.value.validate((errors) => {
        console.log(errors)
        if (!errors) {
          console.log(errors)
        } else {
          console.log(errors)
        }
      })
    },
  }

  watch([one.formValue], ([oldCount, newCount]) => {
    findOneAnswer()
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
  }
</style>
