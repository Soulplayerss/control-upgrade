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
  <div class="w-full h-[100px] _title px-11 py-4 box-border flex justify-between mb-7">
    <span class="block w-75">{{ newTime }}</span>
    <span class="text-[40px] font-bold">{{ props.title }}</span>
    <div class="w-75 flex justify-end">
      <div
        class="_backBtn w-25 h-10 flex justify-center items-center cursor-pointer"
        v-show="props.isBack"
      >
        <img src="@/assets/image/back.png" alt="" class="w-5.5 h-5.5" />
        <span class="text-5 font-bold">返回</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._title {
  background: url('@/assets/image/title-bg.png') no-repeat;
  background-size: 100%;
  background-position: center;
}
._backBtn {
  background: url('@/assets/image/back-bg.png') no-repeat;
  background-size: 100%;
}
._backBtn:active {
  margin-top: 2px;
}
</style>
