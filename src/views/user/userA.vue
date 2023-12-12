<script>
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router";
import UserB from './userB.vue';
export default {
    data() {
        return {
            // displayarr: new Array(10).fill(null),
            display_arr: [],
            total_arr: [],
            pageCode_arr: [],
            page: 0,
            title: "",
            startDate: "",
            start: "",
            endDate: "",
            end: "",
            pre_Title_Text: "",
            pre_Instruction: "",
            write_List: {},
            write_page: false,
        };
    },
    mounted() {
        this.getDate();
        // console.log(this.total_arr);
        // this.page = this.total_arr.length / 10 + 1;
        // for (let i = 1; i <= this.page + 2; i++) {
        //     this.pageCode_arr.push(i);
        // }
    },
    methods: {
        getDate() {
            axios.get("http://localhost:8082/api/quiz/getPublished")
                .then(response => {
                    this.data = response.data;
                    this.total_arr = this.data.quizVoList;
                    // this.getpub();
                    this.addDisplayArr(1);
                    this.page = Math.ceil(this.total_arr.length / 10);
                    this.pageCode_arr = [];
                    for (let i = 1; i <= this.page; i++) {
                        this.pageCode_arr.push(i);
                    }
                    console.log(this.data.quizVoList);
                    console.log(this.total_arr);
                })
                .catch(error => {
                    console.error("error", error);
                });
        },
        getpub() {
            let pub;
            let pub_arr = [];
            for(let i=0 ; i<this.total_arr.length ; i++){
                if (this.total_arr[i].questionnaire.published == true) {
                    pub=this.total_arr[i]
                    pub_arr.push(pub)
                    // pub_arr.push(this.total_arr[i].questionnaire,this.total_arr[i].quizVoList)
                }
            }
            console.log(pub_arr)
            // this.total_arr.forEach(arr => {
            //     console.log(arr)
            //     if (arr.questionnaire.published == true) {
            //         pub_arr.push(arr)
            //     }
            // });
        },
        addDisplayArr(k) {
            this.display_arr = [];
            for (let j = 0 + ((k - 1) * 10); j < 10 * k; j++) {
                if (this.total_arr[j] != null) {
                    this.display_arr.push(this.total_arr[j]);
                }
                else {
                    return;
                }
            }
            console.log(this.pageCode_arr);
        },
        getindex(index) {
            // console.log(index)
            this.pre_Title_Text = this.display_arr[index].questionnaire.title;
            this.pre_Instruction = this.display_arr[index].questionnaire.description;

        },
        switch_page(i) {
            console.log("switch:" + i);
            this.addDisplayArr(i);
        },
        search() {
            if (this.startDate == "") {
                this.start = "1970-01-01";
            }
            else {
                this.start = this.startDate;
            }
            if (this.endDate == "") {
                this.end = "2099-12-31";
            }
            else {
                this.end = this.endDate;
            }
            axios.get(`http://localhost:8082/api/quiz/search2?title=${this.title}&startDate=${this.start}&endDate=${this.end}`)
                .then(response => {
                    this.total_arr = response.data.quizVoList;
                    this.addDisplayArr(1);
                    this.page = Math.ceil(this.total_arr.length / 10);
                    this.pageCode_arr = [];
                    for (let i = 1; i <= this.page; i++) {
                        this.pageCode_arr.push(i);
                    }
                    console.log("total");
                    console.log(this.total_arr);
                })
                .catch(error => {
                    console.error("error", error);
                });
            console.log(this.title);
            console.log(this.startDate);
            console.log(this.endDate);
        },
        write_qu(index) {
            this.write_List = this.display_arr[index];
            this.switch_write_page();
            console.log(this.write_List);
        },
        switch_write_page() {
            this.write_page = !this.write_page
        }
    },
    components: { UserB }
};
</script>

<template>
    <div class="Aarea" v-if="write_page == false">
        <div class="search">
            <label>名稱搜尋：</label>
            <!-- <p></p> -->
            <input class="search_input" type="text" placeholder="search..." v-model="title" />
            <label>開始日期：</label>
            <input type="date" v-model="startDate">
            <label>結束日期：</label>
            <input type="date" v-model="endDate">
            <button @click="search">search</button>
            <!-- <div class="checkbox">
                <p>分類</p>
                <ul>
                    <li>
                        <p>編號：</p>
                        <ul>
                            <input type="checkbox" /><label>由上至下</label>
                            <p></p>
                            <input type="checkbox" /><label>由下至上</label>
                        </ul>
                    </li>
                    <li>
                        <p>狀態</p>
                        <ul>
                            <input type="checkbox" /><label>開放中</label>
                            <p></p>
                            <input type="checkbox" /><label>已過期</label>
                            <p></p>
                            <input type="checkbox" /><label>未開放</label>
                        </ul>
                    </li>
                    <li>
                        <p>日期</p>
                        <ul>
                            <input type="checkbox" /><label>由近至遠</label>
                            <p></p>
                            <input type="checkbox" /><label>由遠至近</label>
                        </ul>
                    </li>
                    <li>
                        <p>記名</p>
                        <ul>
                            <input type="checkbox" /><label>是</label>
                            <p></p>
                            <input type="checkbox" /><label>否</label>
                        </ul>
                    </li>
                </ul>
            </div> -->

        </div>
        <div class="from">
            <div class="from-A">
                <div class="from-title">
                    <span class="span num">編號</span>
                    <span class="span name">名稱</span>
                    <!-- <span class="span anon">記名</span> -->
                    <span class="span stat">狀態</span>
                    <span class="span start">開始</span>
                    <span class="span end">結束</span>
                    <!-- <span class="span data">統計</span> -->
                </div>
                <div class="from-area">
                    <div class="from-data" v-for="(i, index) in display_arr" :key="index">
                        <div class="from-data1" @click="getindex(index)">
                            <span class="span num">{{ index + 1 }}</span>
                            <div class="span name" :style="{ cursor: 'pointer' }" @click="write_qu(index)" v-if="i.questionnaire.opened == true">
                                {{i.questionnaire.title }}
                                <span :style="{ margin: '5px 5px' }" v-if="i.questionnaire.anonymous == true">(記名)</span>
                            </div>
                            <div class="span name" :style="{ cursor: 'pointer' }" v-if="i.questionnaire.opened == false" >
                                {{i.questionnaire.title }}
                                <span :style="{ margin: '5px 5px' }" v-if="i.questionnaire.anonymous == true">(記名)</span>
                            </div>
                            <!-- <span class="span anon">{{ i.questionnaire.anonymous }}</span> -->
                            <span class="span stat"  v-if="i.questionnaire.opened == true">開放中</span>
                            <span class="span stat"  v-if="i.questionnaire.opened == false && new Date() <= new Date(i.questionnaire.endDate)">未開放</span>
                            <span class="span stat"  v-if="i.questionnaire.opened == false && new Date() > new Date(i.questionnaire.endDate)">已過期</span>
                            <span class="span start">{{ i.questionnaire.startDate }}</span>
                            <span class="span end">{{ i.questionnaire.endDate }}</span>
                            <!-- <span class="span data">統計</span> -->
                        </div>
                        <!-- <RouterLink to="C">to C</RouterLink> -->
                    </div>
                </div>
                <!-- <RouterLink to="userB">to B</RouterLink> -->
                <div class="from-page-code">
                    <span v-for="i in pageCode_arr" @click="switch_page(i)">{{ i }}</span>
                    <!-- <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span> -->
                </div>
            </div>
        </div>
        <div class="preview">
            <div class="pre-title">
                <label>問卷：</label>
                <p>
                    {{ pre_Title_Text }}
                </p>
            </div>
            <div class="pre-instruction">
                <label>問卷說明：</label>
                <p>
                    {{ pre_Instruction }}
                </p>
            </div>
        </div>
    </div>
    <UserB :props="write_List" v-if="write_page == true" @cancal="switch_write_page"></UserB>
</template>

<style lang="scss" scoped>
.Aarea {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .search {
        width: 15%;
        height: 100%;
        border: 1px solid black;
        font-size: 14pt;
        display: flex;
        flex-direction: column;
        align-items: center;
        // padding: 40px 0px;

        input {
            height: 4%;
            margin-bottom: 50px;
        }
    }

    .from {
        width: 65%;
        height: 100%;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .from-A {
            width: 90%;
            height: 90%;


            .span {
                width: 15%;
                border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .num {
                width: 10%;
            }

            .name {
                width: 50%;
            }

            .anon {
                width: 10%;
            }

            .stat {
                width: 10%;
            }

            .start {
                width: 15%;
            }

            .end {
                width: 15%;
            }

            .data {
                width: 10%;
            }

            .from-title {
                height: 5%;
                border: 1px solid black;
                font-size: 16pt;
                display: flex;
                justify-content: space-between;


            }

            .from-area {
                height: 70%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                // border: 1px solid black;
                margin-top: 40px;
                // border: 1px solid black;
                // box-shadow: inset 2px 2px 5px black;


                .from-data {
                    width: 100%;
                    height: 10%;

                    .from-data1 {
                        width: 100%;
                        height: 100%;
                        border: 1px solid black;
                        display: flex;

                        &:hover {
                            background-color: rgba(0, 0, 0, 0.075);
                        }

                        a{
                            font-size: 20pt;
                            margin-right: 20px;
                        }
                    }

                }
            }

            .from-page-code {

                height: 5%;
                border: 1px solid black;
                margin-top: 40px;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    margin: 0 10px;
                    font-size: 20pt;
                    cursor: pointer;

                    &:hover {
                        color: red;
                    }
                }
            }
        }
    }

    .preview {
        width: 20%;
        height: 100%;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .pre-title {
            width: 90%;
            height: auto;
            // border: 1px solid black;
        }

        .pre-instruction {
            width: 90%;
            height: 70%;
            // border: 1px solid black;
        }

        label {
            font-size: 20pt;
        }

        p {
            font-size: 14pt;
        }
    }
}
</style>
