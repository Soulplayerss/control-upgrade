<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const list1 = ref([
  {
    name: '实验计划模块',
    id: '1'
  },
  {
    name: '保养任务模块',
    id: '2'
  },
  {
    name: '技改任务模块',
    id: '3'
  },
  {
    name: '维修任务模块',
    id: '4'
  }
])

const onUpdate = () => {
  console.log('update')
}
const onAdd = () => {
  console.log('add')
}
const remove = () => {
  console.log('remove')
}
</script>

<template>
  <div class="w-full h-full">
    <VueDraggable
      class="grid grid-cols-2 gap-5 w-full h-full"
      v-model="list1"
      :animation="150"
      ghostClass="ghost"
      group="people"
      @update="onUpdate"
      @add="onAdd"
      @remove="remove"
    >
      <div v-for="item in list1" :key="item.id" class="cursor-pointer _draggableItem">
        <dv-border-box-1>
          <div class="w-full h-full box-border p-4">
            <div class="flex justify-between">
              <dv-decoration-11 style="width: 200px; height: 60px">{{
                item.name
              }}</dv-decoration-11>
              <div class="relative flex flex-justify-end pr-20" v-if="item.name === '实验计划模块'">
                <div class="absolute bottom-0 right-4 w-[300px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 300px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7 backgroundColor="#284a7d">日计划</dv-border-box-7>
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7 backgroundColor="#284a7d">周计划</dv-border-box-7>
                </div>
                <div class="_chengeBtn">
                  <dv-border-box-7 backgroundColor="#284a7d">年计划</dv-border-box-7>
                </div>
              </div>
              <div class="relative flex flex-justify-end pr-20" v-if="item.name === '保养任务模块'">
                <div class="absolute bottom-0 right-4 w-[300px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 300px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7 backgroundColor="#284a7d">一级保养</dv-border-box-7>
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7 backgroundColor="#284a7d">二级保养</dv-border-box-7>
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-1>
      </div>
    </VueDraggable>
  </div>
</template>

<style lang="less" scoped>
._draggableItem {
  background-color: rgba(40, 51, 52, 0.8);
}
._chengeBtn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin-top: 12px;
}
</style>
