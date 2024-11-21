<script setup lang="ts">
import { ref, reactive, watch, h, nextTick, onMounted } from 'vue'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'

// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GaugeChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const list1 = ref([
  {
    name: '电能年度消耗量'
  },
  {
    name: '天然气年度消耗量'
  },
  {
    name: '燃油年度消耗量'
  },
  {
    name: '电能月度消耗量'
  },
  {
    name: '天然气月度消耗量'
  },
  {
    name: '燃油月度消耗量'
  },
  {
    name: '油库日库存量'
  }
])

const updateDragga = (e) => {
  setDraggableItemWidth()
}

const setDraggableItemWidth = () => {
  let _draggableWidth = document.getElementById('_draggable').offsetWidth
  let _draggableItemList = document.querySelectorAll('._draggableItem')
  list1.value.forEach((element) => {
    element.computedWidth = `${Math.floor((_draggableWidth - 20) / 2)}px`
  })
  list1.value[0].computedWidth = `${Math.floor((_draggableWidth - 40) / 3)}px`
  list1.value[1].computedWidth = `${Math.floor((_draggableWidth - 40) / 3)}px`
  list1.value[2].computedWidth = `${Math.floor((_draggableWidth - 40) / 3)}px`
}

onMounted(() => {
  setDraggableItemWidth()
})
</script>
<template>
  <div class="w-full h-full">
    <VueDraggable
      class="flex flex-wrap gap-5 w-full h-full"
      id="_draggable"
      v-model="list1"
      :animation="150"
      ghostClass="ghost"
      group="people"
      @update="updateDragga"
    >
      <div
        v-for="item in list1"
        :key="item.name"
        class="cursor-pointer _draggableItem border-rd-2"
        :style="{ width: item.computedWidth }"
      >
        <dv-border-box-11
          :color="['#6fbdc3', '#3a708a']"
          backgroundColor="rgba(40, 51, 52, 0.8)"
          :title="item.name"
          style="font-weight: 600"
        >
          <div class="w-full h-full box-border px-8 pt-12">111111111111111</div>
        </dv-border-box-11>
      </div>
    </VueDraggable>
  </div>
</template>

<style lang="less" scoped>
._draggableItem {
  // width: calc((100% - 20px) / 2);
  height: calc((100% - 40px) / 3);
  overflow: hidden;
}
._draggableItem:nth-child(-n + 3) {
  width: calc((100% - 40px) / 3);
}
</style>
