<script>
import { RouterLink, RouterView } from "vue-router";
export default {
    data() {
        return {
            ansarr:[
                {
                    name:"1號"
                },
                {
                    name:"2號"
                },
                {
                    name:"3號"
                },
            ],
        };
    },
};
</script>

<template>
    <div class="Barea">
        <div class="B title">
            <label for="">問卷：開放中、已過期，這不可編輯，查看填寫人</label>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora
                eos repudiandae neque maxime, dicta consectetur reiciendis suscipit
                animi ipsa commodi, facilis blanditiis sunt veniam ullam quam quibusdam
                sint at.
            </p>
        </div>
        <div class="B instruction">
            <label for="">問卷說明：</label>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor adipisci
                sunt rem officia impedit. Quae rem sed repellat iste delectus. Explicabo
                neque praesentium iure fugit. Quo dolorem minima magnam perspiciatis.
            </p>
        </div>
        <div class="B contain">
            <label for="">填寫人：</label>
            <div class="answer">
                <div class="ans" v-for="i in ansarr" >
                <p>回答人:{{ i.name }} </p>
                </div>
            </div>
            <RouterLink to="managerA">
                <button class="btnA" type="button">返回</button>
            </RouterLink>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.Barea {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;

    .B {
        background-color: white;
        padding: 30px 30px;
    }

    .title {
        width: 70%;
        height: 20%;
        border: 1px solid black;
    }

    .instruction {
        width: 70%;
        height: 30%;
        border: 1px solid black;
    }

    .contain {
        width: 70%;
        height: auto;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .answer{
            width: 80%;
            height: auto;
            border: 1px solid black;
            .ans{
                width: 100%;
                height: 80px;
                border: 1px solid black;
            }
        }
        button {
            width: 150px;
            height: 40px;
            margin-top: 50px;
        }
        label{
            margin-bottom: 50px;
        }
    }

    label {
        font-size: 20pt;
    }

    p {
        font-size: 16pt;
    }
}</style>
