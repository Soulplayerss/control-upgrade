<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '../components/PageTitle.vue'
import PageFooter from '../components/PageFooter.vue'
import ProducePage from './components/ProducePage.vue'

const active = ref('produce')
const setingActiv = (value) => {
  active.value = value
}
</script>

<template>
  <div class="w-full h-full _home flex flex-col">
    <PageTitle title="生产调度模块" />
    <div class="flex-1 px-8">
      <ProducePage v-show="active === 'produce'" />
    </div>
    <div class="flex justify-center mb-[50px] mt-[25px] text-[24px]">
      <div
        class="_btnBox mr-[24px]"
        :class="active === 'produce' ? '_active' : ''"
        @click="setingActiv('produce')"
      >
        <div class="_bgBox"> </div>
        <dv-border-box-12>生产调度模块</dv-border-box-12>
      </div>
      <div
        class="_btnBox mr-[24px]"
        :class="active === 'energy' ? '_active' : ''"
        @click="setingActiv('energy')"
      >
        <div class="_bgBox"> </div>
        <dv-border-box-12>能源管理模块</dv-border-box-12>
      </div>
      <div
        class="_btnBox"
        :class="active === 'device' ? '_active' : ''"
        @click="setingActiv('device')"
      >
        <div class="_bgBox"> </div>
        <dv-border-box-12>设备管理模块</dv-border-box-12>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<style lang="less" scoped>
._home {
  background-color: rgba(23, 36, 41, 0.6);
}
._btnBox {
  width: 220px;
  height: 70px;
  cursor: pointer;
  text-align: center;
  line-height: 70px;
  position: relative;
  > ._bgBox {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 212px;
    height: 62px;
    border-radius: 8px;
    background-color: rgba(23, 36, 41, 0.8);
  }
}
._active > ._bgBox {
  background-color: rgba(28, 78, 98, 0.8);
}
._btnBox:active {
  transform: translateY(2px);
}
</style>
