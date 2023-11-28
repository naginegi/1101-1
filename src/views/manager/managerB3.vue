<script>
import { RouterLink, RouterView } from "vue-router";
export default {
    data(){
        return{

        }
    },
}
</script>

<template>
    <div class="Barea">
        <div class="B title">
            <label for="">問卷：查看問卷回答人詳情(匿名)</label>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora eos repudiandae neque maxime, dicta consectetur reiciendis suscipit animi ipsa commodi, facilis blanditiis sunt veniam ullam quam quibusdam sint at.</p>
        </div>
        <div class="B instruction">
            <label for="">問卷說明：</label>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor adipisci sunt rem officia impedit. Quae rem sed repellat iste delectus. Explicabo neque praesentium iure fugit. Quo dolorem minima magnam perspiciatis.</p>
        </div>
        <div class="B contain">
            <label for="">題目：</label>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis modi libero id itaque esse. Asperiores pariatur atque deleniti dicta excepturi sint, corporis quisquam libero! Dolore optio ad rem illo nam.</p>
            <RouterLink to="B1">
                <button type="button">btn</button>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Barea{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
    .B{
        background-color: white;
        padding: 30px 30px;
        
    }
    .title{
        width: 70%;
        height: 20%;
        border: 1px solid black;
    }
    .instruction{
        width: 70%;
        height: 30%;
        border: 1px solid black;

    }
    .contain{
        width: 70%;
        height: 700px;
        border: 1px solid black;
        position: relative;
        button{
            width: 100px;
            height: 40px;
            position: absolute;
            right: 30px;
            bottom: 30px;
        }
    }
    label{
        font-size: 20pt;
    }
    p{
        font-size: 16pt;
    }
}
</style>