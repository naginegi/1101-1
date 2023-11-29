<script>
import { RouterLink, RouterView } from "vue-router";
import Qcheck from "./Qcheck.vue";
export default {
    emits: [
        "cancal"
    ],
    data() {
        return {
            quizVoList: {},
            qn: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                opened: false,
                anonymous: false,
                published: false
            },
            quList: [],
            qu: {
                // id:0,
                qnid: 1,
                quid: 0,
                title: "",
                options_type: "",
                options: "",
                isnecessary: false,
            },
            select: ["radio", "checkbox", "text"],
            options: {
                radio_arr: [""],
                checkbox_arr: [""],
                text: ""
            },
            addPage: false,
            edit_status: false,
            check_page:false,
            edit_state:false,
            edit_page:false,
        };
    },
    props: [
        "props"
    ],
    created(){
        if(this.props){
            this.quizVoList = this.props;
            this.qn = this.quizVoList.questionnaire;
            this.quList = this.quizVoList.questionList;
            console.log(this.quList)
        }

    },
    methods: {
        addop(type) {
            if (type == "radio") {
                this.options.radio_arr.push("");
            }
            else {
                this.options.checkbox_arr.push("");
            }
        },
        op_dele(index, type) {
            if (type == "radio") {
                this.options.radio_arr.splice(index, 1);
            }
            else {
                this.options.checkbox_arr.splice(index, 1);
            }
        },
        switch_addPage() {
            this.addPage = !this.addPage;
            this.clear_qu();
        },
        add_addPageDate(type) {
            // this.qu.quid = this.qu.quid + 1;
            if (type == "radio") {
                this.qu.options = this.option_join(this.options.radio_arr);
            }
            else if (type == "checkbox") {
                this.qu.options = this.option_join(this.options.checkbox_arr);
            }
            // 使qu獨立
            const clonedQu = JSON.parse(JSON.stringify(this.qu));
            console.log(this.edit_state)
            if (this.edit_status == true) {
                // this.qu.id = this.quList.
                this.quList[this.qu.quid] = this.qu;
            }
            else {
                this.quList.push(clonedQu);
            }
            console.log(this.edit_status);
            console.log(this.quList);
            this.switch_addPage();
        },
        option_join(arr) {
            let output = arr.join(";");
            console.log(output);
            return output;
        },
        clear_qu() {
            if (this.edit_status == false) {
                this.qu = {
                    qnid: 1,
                    quid: this.qu.quid,
                    title: "",
                    options_type: "",
                    options: "",
                    isnecessary: false,
                };
                this.options = {
                    radio_arr: [""],
                    checkbox_arr: [""],
                    text: ""
                };
            }
            this.edit_status = false;
            // this.edit_page=false;
        },
        qu_dele(index) {
            console.log(this.quList[index]);
            console.log(index);
            this.quList.splice(index, 1);
        },
        sort_id() {
            let len = this.quList.length;
            // for (let i = 0; i < len; i++) {
            // console.log(this.quList[i].quid);
            // }
            // console.log("======================");
            for (let i = 0; i < len; i++) {
                this.quList[i].quid = i + 1;
                // console.log(this.quList[i].quid);
            }
        },
        edit_question(i, type) {
            this.switch_addPage();
            this.edit_status = true;
            this.qu = {
                id:this.quList[i].id,
                quid: i,
                title: this.quList[i].title,
                options_type: this.quList[i].options_type,
            };
            if (type == "radio") {
                this.options.radio_arr = this.quList[i].options.split(";");
            }else if(type == "checkbox"){
                this.options.checkbox_arr = this.quList[i].options.split(";");
            }
            console.log(this.options);
            // this.options = {
            //     radio_arr: [""],
            //     checkbox_arr: [""],
            // }
        },
        set() {
            this.sort_id();
            console.log(this.qn);
            console.log(this.quList);
            this.quizVoList = {
                qn: this.qn,
                quList: this.quList
            };
            this.switch_check();
        },
        switch_check(){
            this.check_page = !this.check_page
        },
        cancal() {
            this.$emit("cancal")
        }
    },
    components: { Qcheck }
};
</script>

<template>
    <div class="Barea">
        <div class="qn" v-if="check_page == false">
            <div class="qn title">
                <label>title:</label>
                <input class="input" type="text" v-model="qn.title">
            </div>
            <div class="qn desc">
                <label>desc:</label>
                <input class="input" type="text" v-model="qn.description">
            </div>
            <div class="qn date">
                <div class="date">
                    <label>start_date:</label>
                    <input type="date" v-model="qn.startDate">
                </div>
                <div class="date">
                    <label>end_date:</label>
                    <input type="date" v-model="qn.endDate">
                </div>
            </div>
            <div class="qn fu">
                <label>question:</label>
                <button type="button" @click="switch_addPage">add</button>
                <div class="anon">
                    <input type="checkbox" v-model="qn.anonymous">
                    <label>是否記名</label>
                </div>
            </div>
            <div class="qn qu">
                <div  v-for="(qu, quid) in quList" :key="quid">
                    <div class="question" @click="edit_question(quid,qu.options_type)">
                        <div class="sp">
                            <span >Q{{ quid+1 }}.</span>
                            <span>：</span>
                            <span>{{ qu.title }}</span>
                        </div>
                        <button type="button" @click.stop="qu_dele(quid)">X</button>
                    </div>
                </div>
            </div>     
            <div class="qn btn">
                <button @click=" cancal" >cancal</button>
                <button type="button" @click="set" :props="quizVoList">complete</button>
            </div> 
        </div>

        <!-- addPage -->
        <div class="addqu" v-if="addPage == true">
            <div class="bg"></div>
            <div class="addqu_area">
                <div class="add type">
                    <label>type:</label>
                    <select v-model="qu.options_type">
                        <option class="" v-for="select in select " :key="select">{{ select }}
                        </option>
                    </select>
                </div>
                <div class="add title">
                    <label>title:</label>
                    <input type="text" v-model="qu.title">
                </div>
                <div class="add nece">
                    <input type="checkbox" v-model="qu.isnecessary">
                    <label>必填</label>
                </div>
                <div class="add option">
                    <div class="op" v-for="(op, index) in options.radio_arr" :key="index" v-if="qu.options_type == 'radio'">
                        <span>{{ index + 1 }}.</span>
                        <input :type="qu.options_type">
                        <input type="text" v-model="options.radio_arr[index]">
                        <button @click="op_dele(index, qu.options_type)">X</button>
                    </div>
                    <div class="op" v-for="(op, index) in options.checkbox_arr" :key="index"
                        v-if="qu.options_type == 'checkbox'">
                        <span>{{ index + 1 }}.</span>
                        <input :type="qu.options_type">
                        <input type="text" v-model="options.checkbox_arr[index]">
                        <button @click="op_dele(index)">X</button>
                    </div>
                    <div class="op" v-if="qu.options_type == 'text'">
                        <div class="op_text" contenteditable="true"></div>
                    </div>
                </div>
                <button @click="addop(qu.options_type)" style="width: 50px;height: 30px;font-size: 14pt;">add</button>
                <div class="add btn">
                    <button @click="switch_addPage" >cancal</button>
                    <button @click="add_addPageDate(qu.options_type)">complete</button>
                </div>
            </div>
        </div>

        <Qcheck :props="quizVoList" @cancal = "switch_check" v-if="check_page == true"></Qcheck>
    </div>
</template>

<style lang="scss" scoped>
.Barea {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    padding-top: 40px;

    .qn {
        width: 60%;
        height: 100%;
        // border: 1px solid black;
        font-size: 30pt;
        padding-bottom: 35px;
        margin-bottom: 50px;

        .title {
            width: 100%;
            height: 10%;
            display: flex;
            flex-direction: column;

            .input {
                width: 99%;
                height: 40px;
                font-size: 20pt;
                border: 1px solid black;
            }
        }

        .desc {
            width: 100%;
            height: 10%;
            display: flex;
            flex-direction: column;

            .input {
                width: 99%;
                height: 120px;
                font-size: 20pt;
                border: 1px solid black;
            }
        }

        .date {
            width: 100%;
            height: 20%;
            font-size: 25pt;
            display: flex;
            justify-content: space-between;

            .date {
                width: 40%;
                // border: 1px solid black;
                display: flex;
                flex-direction: column;
                align-items: center;

                input {
                    width: 200px;
                    height: 35px;
                    font-size: 18pt;
                    margin-top: 20px;
                }
            }

        }

        .fu {
            width: 100%;
            // height: 20%;
            display: flex;
            align-items: flex-end;
            font-size: 20pt;

            button {
                width: 65px;
                height: 30px;
                margin-left: 20px;
            }

            .anon {
                width: 70%;
                // border: 1px solid black;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                font-size: 20pt;

                input {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }
        }

        .qu {
            width: 100%;
            .question{
                height: 50px;
                padding-left: 20px;
                border: 1px solid black;
                font-size: 20pt;
                display: flex;
                align-items: center;
                &:hover{
                    background-color: rgba(0, 0, 0, 0.058);
                }
                .sp{
                    width: 85%;
                }

            }
        }

        .btn {
            width: 100%;
            display: flex;
            justify-content: space-around;
            button{
                font-size: 14pt;

            }
        }
    }

    .addqu {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;

        .bg {
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
            position: fixed;
            top: 0px;
            left: 0px;
        }

        .addqu_area {
            width: 40%;
            height: auto;
            background-color: white;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .add {
                width: 100%;
                height: 120px;
                // border: 1px solid black;
                font-size: 20pt;
            }

            .type {
                display: flex;
                justify-content: center;
                align-items: center;

                select {
                    margin-left: 15px;
                    font-size: 14pt;
                }
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20pt;

                input {
                    margin-left: 15px;
                    font-size: 14pt;
                }
            }

            .nece {
                height: 40px;
                font-size: 18pt;
                display: flex;
                justify-content: center;
            }

            .option {
                height: auto;

                .op {
                    height: auto;
                    // border: 1px solid black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 20px 0px;
                }

                .op_text {
                    width: 80%;
                    height: 200px;
                    border: 1px solid black;
                }

            }

            .btn {
                display: flex;
                justify-content: space-around;
                align-items: center;

                button {
                    font-size: 14pt;
                }
            }
        }

    }
}
</style>
