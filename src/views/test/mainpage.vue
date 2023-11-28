<script>
export default{
    data(){
        return{
            arr:[
                
            ]
        }
    },
    methods:{

    }
}
</script>

<template>
    <div class="all">
        <h1>main</h1>
        <div class="area">
            <div class="arr" v-for="i in arr"></div>
        </div>
        <div class="code"></div>
    </div>

</template>

<style lang="scss" scoped>
.all{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .area{
        width: 60%;
        height: 80vh;
        border: 1px solid black;
    }
    .code{
        width: 60%;
        height: 5vh;
        border: 1px solid black;
        margin-top: 50px;
    }
}
</style>