<template>
  <div id="app">
    <!-- 导航区域 -->
    <LuffyHeader />
  	<!-- <transition name="fade"> -->
    	<router-view />
	<!-- </transition> -->
  </div>
</template>

<script>
import LuffyHeader from '@/components/Common/LuffyHeader'
export default {
  name: 'App',
  data(){
  	return {
  	}
  },
  components:{
    LuffyHeader
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
