<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  isBack: {
    type: Boolean,
    default: () => false
  },
  title: {
    type: String,
    default: () => ''
  }
})

const newTime = ref('')
</script>

<template>
  <div
    class="w-full h-[100px] _title px-[26px] py-[16px] box-border flex justify-between mb-[30px]"
  >
    <span class="block w-[300px]">{{ newTime }}</span>
    <span class="text-[40px] font-bold">{{ props.title }}</span>
    <div class="w-[300px] flex justify-end">
      <div class="_backBtn w-25 h-[38px] flex justify-center items-center cursor-pointer">
        <img src="@/assets/image/back.png" alt="" class="w-[22px] h-[22px]" />
        <span class="text-[20px] font-bold">返回</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._title {
  background: url('@/assets/image/title-bg.png') no-repeat;
  background-size: 100%;
}
._backBtn {
  background: url('@/assets/image/back-bg.png') no-repeat;
  background-size: 100%;
}
._backBtn:active {
  margin-top: 2px;
}
</style>
