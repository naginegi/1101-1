<script>
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router";
export default {
    emits: [
        "cancal",
        "cancalAll"
    ],
    data() {
        return {
            quizVoList: {},
            check_page: false,
            opList: [],
        }
    },
    props: [
        "props"
    ],
    created() {
        this.quizVoList = this.props
        this.set_opList();
        console.log(this.quizVoList)

    },
    methods: {
        set_published() {
            // this.quizVoList.qu.ispublished = true
            this.quizVoList.qn.published = true;
            this.quizVoList.qn.opened = ((new Date(this.quizVoList.qn.startDate) <= new Date() && new Date() <= new Date(this.quizVoList.qn.endDate)))
            console.log("存入結果")
            console.log(this.quizVoList.qn)
            console.log(this.quizVoList.quList)
            this.create()
            this.cancalAll()
        },
        set_not_publisged() {
            this.quizVoList.qn.published = false;
            this.quizVoList.qn.opened = ((new Date(this.quizVoList.qn.startDate) <= new Date() && new Date() <= new Date(this.quizVoList.qn.endDate)))
            this.create()
            this.cancalAll()
        },
        set_opList() {
            this.quizVoList.quList.forEach(item => {
                this.opList.push(item.options.split(";"))
                console.log(item.options);
            });
            console.log(this.opList);
        },
        create() {
            axios.post("http://localhost:8082/api/quiz/create", {

                questionnaire: this.quizVoList.qn,
                questionList: this.quizVoList.quList
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)

                })
                .catch(error => {
                    console.error("error", error);
                })

        },
        cancal() {
            this.$emit("cancal")
        },

        cancalAll() {
            window.location.href = 'http://localhost:5173/managerA';

        },
        test(){
            console.log((new Date(this.quizVoList.qn.startDate) <= new Date() && new Date() <= new Date(this.quizVoList.qn.endDate)))
        }

    }
}
</script>

<template>
    <div class="all">
        <div class="area title">
            <label>問卷：</label>
            <p>{{ this.quizVoList.qn.title }}</p>
            <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora eos repudiandae neque maxime, dicta consectetur reiciendis suscipit animi ipsa commodi, facilis blanditiis sunt veniam ullam quam quibusdam sint at.</p> -->
        </div>
        <div class="area instruction">
            <label>問卷說明：</label>
            <p>{{ this.quizVoList.qn.description }}</p>
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor adipisci sunt rem officia impedit. Quae rem sed repellat iste delectus. Explicabo neque praesentium iure fugit. Quo dolorem minima magnam perspiciatis.</p> -->
        </div>
        <div class="area date">
            <label>開始時間：</label>
            <span>{{ this.quizVoList.qn.startDate }}</span>
            <label>結束時間：</label>
            <span>{{ this.quizVoList.qn.endDate }}</span>
        </div>
        <div class="area contain">
            <label>題目：</label>
            <div>
                <ol>
                    <li v-for="(qu, index) in quizVoList.quList" :key="index">
                        <!-- <li> -->
                        <span>{{ qu.title }}</span>
                        <ol>
                            <li v-for="op in opList[index]">
                                <span>{{ op }}</span>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
            <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis modi libero id itaque esse. Asperiores pariatur atque deleniti dicta excepturi sint, corporis quisquam libero! Dolore optio ad rem illo nam.</p> -->
            <!-- <RouterLink to="managerA">
            </RouterLink> -->
            <!-- <RouterLink to="managerA">
            </RouterLink> -->
        </div>
        <div class="area btn">
            <!-- <button type="button" @click="test">test</button> -->
            <button type="button" @click="cancal">取消</button>
            <button type="button" @click="set_not_publisged">編輯完成-暫存</button>
            <button type="button" @click="set_published">編輯完成-發佈</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.all {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;

    .area {
        width: 70%;
        background-color: white;
        padding: 30px 30px;
        border: 1px solid black;
        font-size: 16pt;
    }

    .date {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .contain {
        height: 700px;
    }

    .btn {
        display: flex;
        justify-content: space-evenly;
    }

    label {
        font-size: 20pt;
    }

    button {
        font-size: 14pt;
    }
}
</style>