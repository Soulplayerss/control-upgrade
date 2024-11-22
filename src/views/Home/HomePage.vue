<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '../components/PageTitle.vue'
import PageFooter from '../components/PageFooter.vue'
import ProducePage from './components/ProducePage.vue'
import EnergyPage from './components/EnergyPage.vue'
import DevicePage from './components/DevicePage.vue'

const active = ref('produce')
const pageTitle = ref('生产调度模块')
const setingActiv = (value, title) => {
  active.value = value
  pageTitle.value = title
}

const showMenu = ref<Boolean>(false)
</script>

<template>
  <div class="w-full h-full _home flex flex-col relative">
    <div class="absolute z-2 top-3.5 right-25 cursor-pointer" @click="showMenu = !showMenu">
      <img src="@/assets/image/menu.svg" alt="" class="w-8 h-8" />
      <div class="absolute w-63 top-15 right-0 z-2 bg-[#172429] border-rd-2" v-if="showMenu">
        <dv-border-box-8>
          <div class="p-4">
            <div
              class="_btnBox"
              :class="active === 'produce' ? '_active' : ''"
              @click="setingActiv('produce', '生产调度模块')"
            >
              <div class="_bgBox"> </div>
              <dv-border-box-12>生产调度模块</dv-border-box-12>
            </div>
            <div
              class="_btnBox"
              :class="active === 'energy' ? '_active' : ''"
              @click="setingActiv('energy', '能源管理模块')"
            >
              <div class="_bgBox"> </div>
              <dv-border-box-12>能源管理模块</dv-border-box-12>
            </div>
            <div
              class="_btnBox"
              :class="active === 'device' ? '_active' : ''"
              @click="setingActiv('device', '设备管理模块')"
            >
              <div class="_bgBox"> </div>
              <dv-border-box-12>设备管理模块</dv-border-box-12>
            </div>
          </div>
        </dv-border-box-8>
      </div>
    </div>
    <PageTitle :title="pageTitle" />
    <div class="flex-1 px-8">
      <ProducePage v-if="active === 'produce'" />
      <EnergyPage v-if="active === 'energy'" />
      <DevicePage v-if="active === 'device'" />
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
