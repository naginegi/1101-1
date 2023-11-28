<script>
export default {
    data(){
        return{
            page:1,
        }
    },
    methods:{
        pageadd(){
            this.page+=1;
            if(this.page>3){this.page=1}
        }
    }
}
</script>

<template>
    <div class="Carea">
        <div class="C Bar-chart" v-if="this.page==1">
            <p>1</p>
        </div>
        <div class="C pie-chart" v-if="this.page==2">
            <p>2</p>
        </div>
        <div class="C detall" v-if="this.page==3">
            <p>3</p>
        </div>
        <button type="button" @click="pageadd">switch</button>
    </div>
</template>

<style lang="scss" scoped>
.Carea{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .C{
        width: 80%;
        height: 80%;
        border: 1px solid black;
    }
    button{
        width: 5%;
        height: 5%;
        position: absolute;
        right: 50px;
        bottom: 50px;
    }
}
</style>