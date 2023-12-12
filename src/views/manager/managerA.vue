<script>
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router";
import Managerb1 from './managerb1.vue';
import ManagerB from './managerB.vue';
import QdesignCopy from '../test/Qdesign copy.vue';
// import C from '../C.vue';
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
            edit_page: false,
            edit_arr: [],
            dele_state: false,
            dele_List: [],
            C_page:false,
            C_arr:[]
        };
    },
    mounted() {
        this.getDate();
        this.getCheckOpened();
        console.log(this.total_arr);
        // this.edit_page = false
    },
    methods: {
        getCheckOpened(){
            axios.get("http://localhost:8082/api/quiz/checkOpened")
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error("error", error);
                });
        },
        getDate() {
            axios.get("http://localhost:8082/api/quiz/getAll")
                .then(response => {
                    this.data = response.data;
                    this.total_arr = this.data.quizVoList;
                    this.addDisplayArr(1);
                    this.page = Math.ceil(this.total_arr.length / 10);
                    this.pageCode_arr = [];
                    for (let i = 1; i <= this.page; i++) {
                        this.pageCode_arr.push(i);
                    }
                    console.log(this.data.quizVoList);
                    console.log(this.total_arr);
                    console.log(this.page)
                    console.log(this.pageCode_arr)
                    
                })
                .catch(error => {
                    console.error("error", error);
                });
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
            console.log(this.display_arr);
        },
        getindex(index) {
            // console.log(index)
            this.pre_Title_Text = this.display_arr[index].questionnaire.title;
            this.pre_Instruction = this.display_arr[index].questionnaire.description;
            // this.edit_test(index);
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
        edit_test(index) {

            console.log(this.display_arr[index]);
            if(this.display_arr[index].questionnaire.published == true){
                alert("此問卷目前狀態無法編輯")
                return;
            }
            this.edit_arr = this.display_arr[index];
            this.switch_edit_page();
        },
        switch_edit_page() {
            this.edit_page = !this.edit_page;
            // console("11")
        },
        switch_dele_state() {
            if (this.dele_List.length == 0) {
                this.dele_state = !this.dele_state
            } else {
                this.dele();
                this.dele_state = !this.dele_state
            }
        },
        get_dele_id() {

            console.log(this.dele_List)
        },
        dele() {
            axios.post("http://localhost:8082/api/quiz/deleQuestionnaire", {
                idList: this.dele_List
            })
                .then(response => {
                    this.data = response.data;
                    // console.log(this.data.quizVoList)
                    // console.log(this.data.rtnCode)
                    if(this.data.rtnCode != 'SUCCESSFUL'){
                        alert("有問卷無法刪除")
                    }else{
                        alert("已刪除問卷")
                        location.reload();
                    }

                })
                .catch(error => {
                    console.error("error", error);
                })

            this.dele_List = [];
            this.getDate();

        },
        create(){
            this.edit_arr=[]
            this.switch_edit_page();
        },
        switch_c_page(){
            this.C_page = !this.C_page
        },
        gotoC(id){
            this.$router.push({ name: 'stat_qn', params: { id } });
            // this.C_arr=this.display_arr[id];
            // this.switch_c_page()
        }
    },
    components: { Managerb1, ManagerB, QdesignCopy, }
};
</script>

<template>
    <div class="Aarea" v-if="edit_page == false && C_page == false">
        <div class="search">
            <label style="margin-top: 35px;">名稱搜尋：</label>
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
                <div class="from-btn">
                    <button type="button" @click="switch_dele_state">dele</button>
                    <button type="button" @click="create">add</button>
                </div>
                <div class="from-title">
                    <span class="span num">編號</span>
                    <span class="span name">名稱</span>
                    <span class="span anon">開放</span>
                    <span class="span stat">狀態</span>
                    <span class="span start">開始</span>
                    <span class="span end">結束</span>
                    <span class="span data">統計</span>
                </div>
                <div class="from-area">
                    <div class="from-data" v-for="(i, index) in display_arr" :key="index">
                        <div class="from-data1" @click="getindex(index)">
                            <div class="span dele" v-if="dele_state == true">
                                <input type="checkbox" @change="get_dele_id" v-model="this.dele_List"
                                    :value="i.questionnaire.id">
                            </div>
                            <span class="span num">{{ index + 1 }}</span>
                            <div class="span name" @click="edit_test(index)" :style="{ cursor: 'pointer' }">{{
                                i.questionnaire.title }}<span :style="{ margin: '5px 5px' }" v-if="i.questionnaire.anonymous == true">(記名)</span>
                            </div>
                            <span class="span anon" v-if="i.questionnaire.published == true">已發佈</span>
                            <span class="span anon" v-if="i.questionnaire.published == false">未發佈</span>
                            <!-- <span class="span anon"></span> -->
                            <span class="span stat"  v-if="i.questionnaire.opened == true">開放中</span>
                            <span class="span stat"  v-if="i.questionnaire.opened == false && new Date() <= new Date(i.questionnaire.endDate)">未開放</span>
                            <span class="span stat"  v-if="i.questionnaire.opened == false && new Date() > new Date(i.questionnaire.endDate)">已過期</span>
                            <!-- <span class="span stat">狀態</span> -->
                            <span class="span start">{{ i.questionnaire.startDate }}</span>
                            <span class="span end">{{ i.questionnaire.endDate }}</span>
                            <span class="span data"  @click.stop="gotoC(i.questionnaire.id)" :style="{ cursor: 'pointer' }">統計</span>
                            <!-- <span :style="{ border: '0px' }" v-if="i.questionnaire.anonymous == true">*</span> -->
                        </div>
                        <!-- <RouterLink to="C">to C</RouterLink> -->
                    </div>
                </div>
                <!-- <RouterLink to="managerB">to B</RouterLink> -->
                <!-- <RouterLink to="managerB1">to B1</RouterLink> -->
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
    <!-- <Managerb1 :props="edit_arr"></Managerb1> -->
    <!-- <ManagerB :props="edit_arr" @cancal = "switch_edit_page" v-if="edit_page == true"></ManagerB> -->
    <QdesignCopy :props="edit_arr" @cancal="switch_edit_page" v-if="edit_page == true"></QdesignCopy>
    <!-- <C :props="C_arr" v-if="C_page == true" @canc="switch_c_page"></C> -->
</template>

<style lang="scss" scoped>
.Aarea {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-between;

    .search {
        width: 15%;
        height: 100%;
        border: 1px solid black;
        font-size: 14pt;
        display: flex;
        flex-direction: column;
        align-items: center;
        // margin: 40px 0px;
        transition: width 0.5s ease;
        input {
            height: 4%;
            margin-bottom: 50px;
        }
        &:hover{
            width: 25%;
            transition: width 1s ease;
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
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 5px 5px;
                &:hover{
                    // color:red;
                    background-color: rgba(0, 0, 0, 0.075);
                }
                // cursor: pointer;
            }

            .dele {
                width: 5%;
            }

            .num {
                width: 10%;
                
            }

            .name {
                width: 30%;
                &:hover{
                    color: red;
                }
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
                &:hover{
                    color: red;
                }
            }

            .from-title {
                height: 7%;
                // border: 1px solid black;
                font-size: 16pt;
                display: flex;
                justify-content: space-between;
                background-color: #fff;

            }

            .from-btn {
                height: 30px;
                display: flex;
                align-items: flex-end;
                padding: 15px 10px;
            }

            .from-area {
                height: 70%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                // border: 1px solid black;
                // margin-top: 40px;

                .from-data {
                    width: 100%;
                    height: 11%;
                    margin-bottom: 10px;
                    
                    .from-data1 {
                        width: 100%;
                        height: 100%;
                        // border: 2px solid black;
                        // border-radius: 30px;
                        display: flex;

                        &:hover {
                            // background-color: rgba(0, 0, 0, 0.075);
                        }

                        a {
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
        transition: width 0.5s ease;
        &:hover{
            width: 30%;
            transition: width 1s ease;
        }

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
}</style>
