<script>
import { RouterLink, RouterView } from "vue-router";
import Header from './views/header.vue';
export default{
  data(){
    return{

    }
  },
  methods:{

  },
  components:{
    Header,

  },
}
</script>

<template>
  <div class="all">
    <div class="header">
      <Header />  
    </div>
    <div class="contain">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.all{
  margin: 0px 0px;
  .header{
    width: 100vw;
    height: 15vh;
    border: 1px solid black;
  }
  
  .contain{
    width: 100vw;
    height: 80vh;
    border: 1px solid black;
    overflow: auto;
  }
}
</style>
