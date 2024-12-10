<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { onMounted } from 'vue'
import autofit from 'autofit.js'
onMounted(() => {
  autofit.init(
    {
      designHeight: 1080, //项目初始的分辨率，一般就是你开发电脑的屏幕分辨率
      designWidth: 1920, //项目初始的分辨率，一般就是你开发电脑的屏幕分辨率
      renderDom: '#app', //App最外层的id名，一般都为app
      resize: true //是否监听resize事件，默认是 true
    },
    false
  )
})
</script>
