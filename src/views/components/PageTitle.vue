<script setup lang="ts">
import { ref, watch } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

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

const emit = defineEmits(['back-page'])
const showBack = ref<Boolean>(false)

watch(props, (newValue) => {
  showBack.value = newValue.isBack
})

const back = () => {
  emit('back-page')
}

const newTime = ref<any>('')

setInterval(() => {
  newTime.value = ref(dayjs().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss'))
}, 1000)
</script>

<template>
  <div
    class="w-full h-[7.5vh] _title px-25 py-1 box-border flex justify-between mb-[2.5vh] font-bold"
  >
    <span class="block w-75 text-6">{{ newTime }}</span>
    <span class="text-[3.2vh]">{{ props.title }}</span>
    <div class="w-75 flex justify-end">
      <div
        class="_backBtn w-25 h-10 flex justify-center items-center cursor-pointer"
        v-show="showBack"
        @click="back"
      >
        <img src="@/assets/image/back.png" alt="" class="w-5.5 h-5.5" />
        <span class="text-5">返回</span>
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
