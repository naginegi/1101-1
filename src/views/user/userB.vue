<script>
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router";
export default {
    emits: [
        "cancal"
    ],
    data() {
        return {
            quizVoList: {},
            ansList: [],
            op: [],
            user_data:{
                userName:"",
                userPhone:"",
                userEmail:"",
                userAge:0,
            }
        }
    },
    props: [
        "props"
    ],
    created() {
        this.quizVoList = this.props
        console.log(this.quizVoList)
        this.split_options();
        this.push_box();
    },
    methods: {
        push_box() {
            this.quizVoList.questionList.forEach(item => {
                let ans = {
                    qnid: item.qnid,
                    quid: item.quid,
                    res: [],
                    ans: "",
                    userName:this.user_data.userName,
                    userPhone:this.user_data.userPhone,
                    userEmail:this.user_data.userEmail,
                    userAge:0,
                };
                this.ansList.push(ans)
            });

        },
        split_options() {
            this.quizVoList.questionList.forEach(item => {
                this.op.push(item.options.split(";"))
                // console.log(item.options.split(";"))
            });
            // this.op=this.quizVoList.questionList.options.split(";");
            console.log(this.op)
        },
        test() {
            // this.quizVoList = this.props
            // console.log(value)
            console.log(this.quizVoList)
            console.log(this.ansList)
            // console.log(this.radio)
            // console.log(this.check)
            // console.log(this.text)



        },
        set_ans() {
            let k = 0
            this.quizVoList.questionList.forEach(element => {
                if(element.necessary == true && this.ansList[k].res == ""){
                    alert("必填未填")
                    return;
                }
                k++
            });


            // 存進ans 同後端名稱最好
            this.ansList.forEach((item,id) => {
                // if(item.quid == this.quizVoList.questionList[id].quid){
                //     if(item.ans == ""){
                //         alert("必填未填")
                //         return;
                //     }
                // }

                //存
                if (Array.isArray(item.res)) {
                    item.ans = item.res.join(';');
                } else {
                    item.ans = item.res;
                }
                item.userName=this.user_data.userName,
                item.userPhone=this.user_data.userPhone,
                item.userEmail=this.user_data.userEmail,
                console.log(item.ans);
                // this.ansList.push(this.user_data)
            });
            ///
            console.log(this.ansList)
            console.log(this.user_data)
            // this.set( this.ansList);
            this.cancal();
        },
        set(ans){
            axios.post("http://localhost:8082/api/quiz/setAns", {
                ansList:ans
                // ansList: [
                //     {
                //         qnid: ansList.qnid,
                //         quid: ansList.quid,
                //         userPhone: "",
                //         userName: "Name",
                //         userEmail: "Email",
                //         userAge: 18,
                //         ans: "ansansans",
                //         dateTime: "2023-12-20 12:34:56"
                //     }
                // ]
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.rtnCode)
                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        cancal() {
            this.$emit("cancal")
        }
    }
}
</script>
<template>
    <div class="all">
        <div class="area user" v-if="quizVoList.questionnaire.anonymous == true">
            <label>name：</label>
            <input type="text" v-model="user_data.userName">
            <label>email：</label>
            <input type="text" v-model="user_data.userEmail">
            <label>phone：</label>
            <input type="text" v-model="user_data.userPhone">
            <label>age：</label>
            <input type="number" v-model="user_data.userAge">
        </div>
        <div class="area title">
            <label>問卷：</label>
            <p>{{ this.quizVoList.questionnaire.title }}</p>
            <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora eos repudiandae neque maxime, dicta consectetur reiciendis suscipit animi ipsa commodi, facilis blanditiis sunt veniam ullam quam quibusdam sint at.</p> -->
        </div>
        <div class="area instruction">
            <label>問卷說明：</label>
            <p>{{ this.quizVoList.questionnaire.description }}</p>
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor adipisci sunt rem officia impedit. Quae rem sed repellat iste delectus. Explicabo neque praesentium iure fugit. Quo dolorem minima magnam perspiciatis.</p> -->
        </div>
        <div class="area date">
            <label>開始時間：</label>
            <span>{{ this.quizVoList.questionnaire.startDate }}</span>
            <label>結束時間：</label>
            <span>{{ this.quizVoList.questionnaire.endDate }}</span>
        </div>
        <div class="area contain">
            <label>題目：</label>
            <div>
                <ol>
                    <li v-for="(qu, index) in quizVoList.questionList" :key="index">
                        <!-- <li> -->
                        <span>{{ qu.title }}</span>
                        <span v-if="qu.necessary == true">(必填)</span>
                        <ol>
                            <!-- <li> -->
                            <li v-for="(i, option) in op[index]" :key="option">
                                <input :type="qu.options_type" :value="i" v-model="ansList[index].res"
                                    v-if="qu.options_type != 'text'">
                                <input :type="qu.options_type" v-model="ansList[index].res"
                                    v-if="qu.options_type == 'text'">
                                <span>{{ i }}</span>
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
        <!-- <div class="check">
                <input type="checkbox" value="A" v-model="checkTest">
                <label for="">A</label>
                <input type="checkbox" value="B" v-model="checkTest">
                <label for="">B</label>
                <input type="checkbox" value="C" v-model="checkTest">
                <label for="">C</label>
            </div> -->
        <div class="area btn">
            <!-- <button type="button" @click="test">test</button> -->
            <button type="button" @click="cancal">取消</button>
            <button type="button" @click="set_ans">提交</button>
            <!-- <button type="button" @click="set_published">編輯完成-發佈</button> -->
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

    .user {
        display: flex;
        justify-content: space-around;
        align-items: center;

        input {
            font-size: 12pt;
        }

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