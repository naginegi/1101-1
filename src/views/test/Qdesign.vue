<script>
import { RouterLink, RouterView } from "vue-router";
export default {
    data() {
        return {
            //綁定輸入資料
            radioinput: "",
            checkboxinput: "",
            //表示添加頁面的開關
            isaddarea: false,
            //主頁面問題的數量
            k: 0,
            //主頁面問題陣列
            mainarr: [

            ],
            //添加畫面問題陣列
            containadd: {
                type: '',
                name: '',
                radioarr: [
                    "",
                ],
                checkboxarr: [
                    "",
                ],
                text: '',
            },
            //下拉選單選項
            options: ["單選", "複選", "簡答"],
            //////////
            stardate:"",
            enddate:"",
        }
    },

    methods: {
        //按下完成按鈕，將添加畫面的資料儲存到主畫面陣列中
        compelet() {
            this.saveData();
            this.clear();
            // console.log(this.mainarr);
            this.isaddarea = !this.isaddarea;
        },
        //添加畫面，單選及複選時，添加option
        addoptions() {
            if (this.containadd.type == "單選") {
                this.containadd.radioarr.push(this.radioinput);
            } else {
                this.containadd.checkboxarr.push(this.checkboxinput);
            }

        },
        //添加畫面，刪除option
        spliceoption(id) {
            if (this.containadd.type == "單選") {
                this.containadd.radioarr.splice(id, 1);
            } else {
                this.containadd.checkboxarr.splice(id, 1);
            }
        },
        //主頁面add按鈕，開啟添加頁面
        quesadd() {
            this.isaddarea = !this.isaddarea;
        },
        //儲存資料
        saveData() {

            if (this.containadd.type == "單選") {
                this.mainarr.push({
                    type: '',
                    name: '',
                    radioarr: [
                        "",
                    ],
                });
                this.mainarr[this.k].type = this.containadd.type;
                this.mainarr[this.k].name = this.containadd.name;
                this.mainarr[this.k].radioarr = this.containadd.radioarr;
            } else if (this.containadd.type == "複選") {
                this.mainarr.push({
                    type: '',
                    name: '',
                    checkboxarr: [
                        "",
                    ],
                });
                this.mainarr[this.k].type = this.containadd.type;
                this.mainarr[this.k].name = this.containadd.name;
                this.mainarr[this.k].checkboxarr = this.containadd.checkboxarr;
            } else {
                this.mainarr.push({
                    type: '',
                    name: '',
                    text: '',
                });
                this.mainarr[this.k].type = this.containadd.type;
                this.mainarr[this.k].name = this.containadd.name;
            }
            this.k++;
        },
        //清除添加頁面輸入的字
        clear() {
            this.containadd.type = "";
            this.containadd.name = "";
            this.containadd.radioarr = [];
            this.containadd.checkboxarr = [];
        },
        test() {
            console.log(this.mainarr)
            console.log(this.stardate)
        }
    },

};
</script>
<!-- 按下add之後，出現添加畫面，選問題類型，填問卷名稱，完成後添加到陣列裡，v-for印出來 -->
<!-- 
    主畫面 contain
    主畫面陣列 mainarr
            類型 contain-arr-type
    添加畫面 contain-add
        添加畫面陣列 contain-add-arr
            類型 contain-add-arr-type
            名稱 contain-add-arr-name
            內容 contain-add-arr
            單選 contain-add-arr-radio
                選項 contain-add-arr-radio-option
                新增選項 contain-add-arr-radio-newoptions
            複選 contain-add-arr-checkbox
                選項 contain-add-arr-checkbox-option
                新增選項 contain-add-arr-checkbox-newoptions
            簡答 contain-add-arr-text
            完成按鈕 contain-add-compbtn
-->
<template>
    <div class="Barea">
        <!-- 標題 -->
        <div class="B title">
            <label for="">問卷：</label>
            <p></p>
            <input type="text" class="title-input" />
        </div>
        <!-- 說明 -->
        <div class="B instruction">
            <label for="">問卷說明：</label>
            <p></p>
            <input type="text" class="instruction-input" />
        </div>
        <!-- 設定時間(還沒) -->
        <div class="B setTime">
            <label for="">問卷時間：</label>
            <p></p>
            <div class="setTime-Area">
                <p>開始時間：</p>
                <input type="date" v-model="stardate">
                <p>結束時間：</p>
                <input type="date" v-model="enddate">
            </div>
        </div>
        <!-- 題目設計 -->
        <div class="B contain">
            <label for="">題目：</label>
            <button type="button" class="contain-addbtn" @click="quesadd">add</button>

            <!-- 主頁面contain-area -->
            <div class="contain-area">
                <ol>
                    <div class="contain-area-mainarr" v-for="(main, index) in mainarr" :key="index">
                        <li>
                            <div class="contain-area-mainarr-type" v-if="main.type == '單選'">
                                <p>{{ main.name }}</p>
                                <div class="contain-area-mainarr-radio" v-for="(radio, index) in main.radioarr"
                                    :key="index">
                                    <input type="radio">
                                    <label>{{ main.radioarr[index] }}</label>
                                </div>
                            </div>
                            <div class="contain-area-mainarr-type" v-if="main.type == '複選'">
                                <p>{{ main.name }}</p>
                                <div class="contain-area-mainarr-checkbox" v-for="(checkbox, index) in main.checkboxarr"
                                    :key="index">
                                    <input type="checkbox">
                                    <label>{{ main.checkboxarr[index] }}</label>
                                </div>
                            </div>
                            <div class="contain-area-mainarr-type" v-if="main.type == '簡答'">
                                <p>{{ main.name }}</p>
                                <input type="text">
                            </div>
                        </li>
                    </div>
                </ol>
            </div>

            <!-- 添加頁面contain-add -->
            <div class="bgc" v-if="isaddarea == true">
                <div class="contain-add">
                    <div class="contain-add-type">
                        <p>問題類型：</p>
                        <select class="contain-add-type-select" v-model="containadd.type">
                            <option class="contain-add-type-option" v-for="options in options" :key="options">{{ options }}
                            </option>
                        </select>
                    </div>
                    <div class="contain-add-name">
                        <p>問題名稱：</p>
                        <input class="contain-add-name-input" type="text" v-model="containadd.name">
                    </div>
                    <div class="contain-add-addarea">

                        <!-- <div class="contain-add-addarea-radio" v-for="(radio, index) in containadd.containaddarr.radioarr"
                            :key="index" v-if="containadd.type === '單選'">
                            <input class="contain-add-addarea-radioinput" type="radio" :name="'radio_' + index"
                                :id="'radio_' + index">
                            <input type="text" placeholder="選項名稱" v-model="containadd.containaddarr.radioarr.radioinput">
                            <i class="fa-solid fa-x" @click="spliceoption(index, 'radioarr')"
                                style="font-size: 16pt; margin-left: 20px;"></i>
                        </div>

                        <div class="contain-add-addarea-checkbox"
                            v-for="(checkbox, index) in containadd.containaddarr.checkboxarr" :key="index"
                            v-if="containadd.type === '複選'">
                            <input class="contain-add-addarea-checkboxinput" type="checkbox" :name="'checkbox_' + index"
                                :id="'checkbox_' + index">
                            <input type="text" placeholder="選項名稱" v-model="containadd.containaddarr.checkboxarr.checkboxinput">
                            <i class="fa-solid fa-x" @click="spliceoption(index, 'checkboxarr')"
                                style="font-size: 16pt; margin-left: 20px;"></i>
                        </div> -->

                        <!--                         
                        <div class="contain-add-addarea-radio" v-for="radio in containadd.containaddarr.radioarr" :key="radio" v-if="containadd.type=='單選'">
                            <input class="contain-add-addarea-radioinput" type="radio" name="" id="">
                            <input type="text" placeholder="選項名稱" v-model="containadd.containaddarr.radioarr.radioinput">
                            <i class="fa-solid fa-x" @click="spliceoption(radio)" style="font-size: 16pt;margin-left: 20px;"></i>
                        </div>

                        <div class="contain-add-addarea-checkbox" v-for="checkbox in containadd.containaddarr.checkboxarr" :key="checkbox" v-if="containadd.type=='複選'">
                            <input class="contain-add-addarea-checkboxinput" type="checkbox" name="" id="">
                            <input type="text" placeholder="選項名稱" v-model="containadd.containaddarr.checkboxarr.checkboxinput">
                            <i class="fa-solid fa-x" @click="spliceoption(checkbox)" style="font-size: 16pt;margin-left: 20px;"></i>
                        </div>  
-->


                        <!-- 單選 -->
                        <div class="contain-add-addarea-radio" v-for="(radio, index) in containadd.radioarr" :key="index"
                            v-if="containadd.type == '單選'">
                            <input class="contain-add-addarea-radioinput" type="radio" name="" id="">
                            <input type="text" placeholder="選項名稱" v-model="containadd.radioarr[index]">
                            <i class="fa-solid fa-x" @click="spliceoption(index)"
                                style="font-size: 16pt;margin-left: 20px;"></i>
                        </div>
                        <!-- 複選 -->
                        <div class="contain-add-addarea-checkbox" v-for="(checkbox, index) in containadd.checkboxarr"
                            :key="index" v-if="containadd.type == '複選'">
                            <input class="contain-add-addarea-checkboxinput" type="checkbox" name="" id="">
                            <input type="text" placeholder="選項名稱" v-model="containadd.checkboxarr[index]">
                            <i class="fa-solid fa-x" @click="spliceoption(index)"
                                style="font-size: 16pt;margin-left: 20px;"></i>
                        </div>

                        <!-- 簡答 -->
                        <div class="contain-add-addarea-text" contenteditable="true" v-if="containadd.type == '簡答'">
                        </div>

                        <button class="contain-add-newoptions" @click="addoptions" placeholder="新增選項"
                            v-if="containadd.type == '單選' || containadd.type == '複選'">add</button>

                    </div>

                    <button type="button" class="contain-add-compbtn" @click="compelet">compelet</button>
                </div>
            </div>


            <!-- 這可用，不用了 -->
            <!-- <div class="question" v-for="(i, index) in quesarr" :key="index">
            <select class="ques-sel" v-model="i.quessel">
                <option v-for="option in options" :key="option">{{ option }}</option>
            </select>
            <div class="radio-ques" v-if="i.quessel=='單選'">
                <span>問題：</span>
                <input type="text" placeholder="輸入問題">
                <br>
                <div class="radio" v-for="{i,radio} in radioarr" :key="radio">
                    <input type="radio">
                    <input type="text" placeholder="輸入選項">
                    <br>
                </div>
                <input @click="addradio" placeholder="按了新增選項">
            </div>

            <div class="checkbox-ques" v-if="i.quessel=='複選'">
                <span>問題：</span>
                <input type="text" placeholder="輸入問題">
                <p></p>
                <input type="checkbox">
                <input type="text" placeholder="輸入選項">
            </div>

            <div class="text-ques" v-if="i.quessel=='簡答'">
                <input type="text" placeholder="輸入問題">
                <p></p>
                <input type="text" placeholder="輸入回答">
            </div>
            </div> -->

            <!-- <div class="question" v-for="{i,index} in quesarr" :key="index">
                <label class="ques-label">第{{}}題</label>
                <select class="ques-sel" v-model="i.quessel">
                    <option value="0">選擇類型</option>
                    <option value="1">單選</option>
                    <option value="2">複選</option>
                    <option value="3">簡答</option>
                </select>
                <button class="ques-btn" type="button" @click="quescheck(index)">addOptions</button>
            </div> -->

            <!-- <div class= "options" v-if="qtype != 0">
                    <input :type="addOptions.inputtype" />
                    <input type="text" v-model="inputtext">
                </div> -->

            <!-- <div class="radio" v-if="qtype==1">
                    <div class="radio-options" >
                        <input type="radio" >
                        <input type="text" placeholder="輸入文字">
                    </div>
                </div>
                <div class="checkbox" v-if="qtype==2">
                    <div class="checkbox-options">
                        <input type="checkbox" >
                        <input type="text" placeholder="輸入文字">
                    </div>
                    
                </div>
                <div class="text" v-if="qtype==3">
                    <input type="text" placeholder="輸入文字">
                </div> -->

            <button type="button" class="btn" @click="test">btn</button>
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
    font-size: 18pt;

    .B {
        background-color: white;
        padding: 30px 30px;
    }

    .title {
        width: 70%;
        height: auto;
        border: 1px solid black;

        .title-input {
            width: 90%;
            height: 30px;
            margin-left: 35px;
        }
    }

    .instruction {
        width: 70%;
        height: auto;
        border: 1px solid black;

        .instruction-input {
            width: 90%;
            height: 100px;
            margin-left: 35px;
        }
    }

    .setTime{
        width: 70%;
        height: 30%;
        border: 1px solid black;
        .setTime-Area{
            width: 90%;
            font-size: 16pt;
            display: flex;
            justify-content: space-around;
            align-items: center;
            input{
                font-size: 14pt;
            }
        }
    }
    .contain-addbtn {
        font-size: 14pt;
    }

    .contain {
        width: 70%;
        height: 700px;
        border: 1px solid black;
        position: relative;

        //主要內容contain-area
        .contain-area {
            width: 100%;
            height: 90%;
            border: 1px solid black;
            margin-top: 30px;
            overflow-x: auto;

            .contain-area-mainarr {
                width: 99%;
                height: auto;
                border: 1px solid black;
            }
        }

        //添加頁面contain-add
        .bgc {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            position: fixed;
            top: 0px;
            left: 0px;
            display: flex;
            justify-content: center;
            align-items: center;

            .contain-add {
                width: 40%;
                height: 80%;
                border: 1px solid black;
                border-radius: 20px;
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;

                .contain-add-type {
                    width: 70%;
                    height: 10%;
                    border: 1px solid black;
                    margin-top: 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16pt;

                    .contain-add-type-select {
                        width: 150px;
                        font-size: 16pt;
                        margin-left: 25px;
                    }
                }

                .contain-add-name {
                    width: 70%;
                    height: 10%;
                    border: 1px solid black;
                    margin-top: 5%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16pt;

                    .contain-add-name-input {
                        font-size: 18px;
                        margin-left: 25px;
                    }
                }

                .contain-add-addarea {
                    width: 70%;
                    height: 45%;
                    border: 1px solid black;
                    margin-top: 5%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .contain-add-addarea-radio {
                        width: 100%;
                        height: 15%;
                        // border: 1px solid black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 20px;

                        .contain-add-addarea-radioinput {
                            width: 30px;
                            height: 20px;
                        }

                        input {
                            font-size: 16pt;
                        }
                    }

                    .contain-add-addarea-checkbox {
                        width: 100%;
                        height: 15%;
                        // border: 1px solid black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 20px;

                        .contain-add-addarea-checkboxinput {
                            width: 30px;
                            height: 20px;
                        }

                        input {
                            font-size: 16pt;
                        }
                    }

                    .contain-add-addarea-text {
                        width: 100%;
                        height: 100%;
                        border: 1px solid black;
                    }
                }

                .contain-add-compbtn {
                    width: 100px;
                    height: 40px;
                    margin-top: 5%;
                    margin-left: 55%;
                }

                .contain-add-newoptions {
                    width: 100px;
                    height: 40px;
                    font-size: 20px;

                }

            }
        }

        .btn {
            font-size: 14pt;
        }
    }

    /*
        .question{
            width: 90%;
            height: auto;
            border: 1px solid black;
            padding: 10px 50px;

            .radio-ques{
                font-size: 20pt;
                input{
                    font-size: 16pt;
                    margin: 10px 10px ;
                }
            }
            .ques-sel{
                font-size: 16pt;
                margin-right: 100px;
            }
        }
        .cancelbtn {
            width: 100px;
            height: 40px;
            position: absolute;
            right: 30px;
            bottom: 30px;
        }
    }

    label {
        font-size: 20pt;
    }

    p {
        font-size: 16pt;
    }
    */
}
</style>
