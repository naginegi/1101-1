<script>
import { RouterLink, RouterView } from "vue-router";
export default {
    data(){
        return{
            page:true,
            title:"user",
            gopage:"managerA"
        }
    },
    methods:{
        swit(){
            this.page = !this.page
            if(this.page){
                this.title = "user";
                this.gopage = "userA"
            }else{
                this.title = "manager";
                this.gopage = "managerA"
            }
        }
    }
}

</script>

<template>
    <div class="title" :class="{titlecolor:page}">
        <RouterLink :to="gopage" class="roulink">
            <h1 @click="swit">{{ title }}</h1>
        </RouterLink>
        <div class="link user" v-if="page==true">
            <RouterLink to="mainpage">A</RouterLink>
            <RouterLink to="Qdesign">B</RouterLink>
            <RouterLink to="Qreply">C</RouterLink>
        </div>
        <div class="link manager" v-if="page==false">
            <RouterLink to="managerA">A</RouterLink>
            <RouterLink to="managerB">B</RouterLink>
            <RouterLink to="C">C</RouterLink>
            <RouterLink to="QdesignCopy">D</RouterLink>
            <RouterLink to="Qcheck">E</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16pt;
    background-color: #FCD1D1;
    .roulink{
        text-decoration: none;
    }
    .link{
        width: 10%;
        display: flex;
        justify-content: space-around;
    }
}
.titlecolor{   
    background-color: #71C9CE;                     
}
</style>