<script>
import axios from 'axios';
// import { ref, onMounted } from 'vue';
import { ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
    emits: [
        "canc"
    ],
    data() {
        return {
            page: 3,
            ans_List: [],
            quidList: [],
            ans_display_List: [],
            Y_display_List: [],
            select_quid: 0,
            chartRef: null
        }
    },
    props: [
        "props"
    ],
    created() {
        if (this.props.length != 0) {
            this.quizVoList = this.props;
            this.qn = this.quizVoList.questionnaire;
            this.quList = this.quizVoList.questionList;
            //問卷資料
            console.log(this.qn)
            console.log(this.quList)
        }
        this.get_ans_data();
        this.push_quid();
        this.push_ans_dis_List();
    },
    /////////////////////////

    //////////////////////////
    methods: {
        push_quid() {
            this.quList.forEach(element => {
                this.quidList.push(element.quid)
            });
            console.log(this.quidList)
        },
        pageadd() {
            this.page += 1;
            if (this.page > 3) { this.page = 1 }
            this.canvas_test(this.page);
        },
        canc() {
            this.$emit("canc")
        },
        get_ans_data() {
            axios.get(`http://localhost:8082/api/quiz/getAns?qnid=${this.qn.id}`)
                .then(response => {
                    this.data = response.data;
                    this.ans_List = this.data.ansList;
                    console.log(this.data.ansList)
                    console.log(this.ans_List)
                    if (this.ans_List.length == 0) {
                        alert("無作答紀錄")
                        this.canc()
                    }
                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        push_ans_dis_List() {
            this.ans_display_List = [];
            // let k = 0;
            this.ans_List.forEach(element => {
                if (element.quid == this.select_quid) {
                    this.ans_display_List.push(element)
                }
                // k++
            });
            console.log(this.ans_display_List)
        },

        test() {
            //裁切X軸
            let Xstr_split = this.quList[this.select_quid - 1].options.split(";")
            console.log(Xstr_split) //得X軸

            /////////////////////////////////////////////////////////////////
            //裁切Y軸
            //取select選的題目的ans
            this.Y_display_List = [];
            // let k = 0;
            this.ans_List.forEach(element => {
                if (element.quid == this.select_quid) {
                    this.Y_display_List.push(element)
                }
                // k++
            });
            console.log(this.Y_display_List)
            //
            let str_arr = []
            this.Y_display_List.forEach(element => {
                str_arr.push(element.ans)
            });
            console.log(str_arr)
            let str = str_arr.join(";")
            console.log(str)
            let str_split = str.split(";")
            console.log(str_split)
            ////////////////////////////////////////////////////////////////////////
            //計數
            const array = str_split;

            const countOccurrences = (arr) => {
                const occurrences = {};

                arr.forEach((item) => {
                    occurrences[item] = (occurrences[item] || 0) + 1;
                });

                return Object.values(occurrences);
            };

            const occurrences = countOccurrences(array);
            console.log(occurrences);
            ////////////////////////////////////////////////////////////////////////
            if (this.myChart) {
                this.myChart.destroy();
                // 等待一小段时间，然后创建新的 Chart 实例
                setTimeout(() => {
                    this.canvas_test(Xstr_split, occurrences)
                }, 100);
            }
            else {
                // 如果没有现有的 myChart 实例，直接创建新的 Chart 实例
                this.canvas_test(Xstr_split, occurrences)
            }

            // this.canvas_test(Xstr_split, occurrences)
        },
/*
        canvas_test(x, y) {
            console.log(x);
            console.log(y);

            // 如果已經存在 myChart 實例，銷毀它
            if (this.myChart) {
                this.myChart.destroy();
            }

            // 長條圖
            this.$nextTick(() => {
                this.chartRef = this.$refs.myChart.getContext('2d');
                // X軸，帶入 quList.options，要切(";")
                const labels = x;
                const data = {
                    labels: labels,
                    datasets: [{
                        label: '隨機數據1', // 標題
                        data: y, // Y軸，該options次數
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                };

                // 創建新的 Chart 實例
                this.myChart = new Chart(this.chartRef, {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });

        },
*/

        canvas_test(Xstr_split,occurrences) {
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Xstr_split,//['一月', '二月', '三月'],
                    datasets: [{
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1,
                        label: '銷售業績(百萬)',
                        data: occurrences,//[60, 49, 72]
                    }]
                }
            });
        }
    },
}

</script>

<template>
    <div class="Carea">
        <div class="top">
            <div class="title">
                <span>title：</span>
                <span>{{ qn.title }}</span>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <span>問題</span>
                <span>{{ select_quid }}：</span>
                <span v-if="select_quid != 0">{{ quList[select_quid - 1].title }}</span>

            </div>
            <div class="select">
                <select v-model="select_quid" :style="{ width: '145px', height: '48px', fontSize: '25pt' }"
                    @change="push_ans_dis_List">
                    <option v-for="select in this.quidList" :key="select">{{ select }}
                    </option>
                </select>
            </div>
        </div>
        <div class="bottom Bar-chart" v-if="this.page == 1">
            <!-- <p>1</p> -->
            <canvas id="myChart" width="400" height="400"></canvas>
            <button @click="canvas_test">btn</button>
            <button @click="test">test</button>
        </div>
        <div class="bottom pie-chart" v-if="this.page == 2">
            <p>2</p>
        </div>
        <div class="bottom detall" v-if="this.page == 3">
            <!-- <p>3</p> -->
            <div class="diplay_ans" v-for="(i, index) in ans_display_List" :key="index">
                <span>ans</span>
                <span>{{ index + 1 }}：</span>
                <span>{{ i.ans }}</span>
                <div class="user" v-if="qn.anonymous == true">
                    <br>
                    <span>name:</span>
                    <span>{{ i.userName }}</span>
                    <span>email:</span>
                    <span>{{ i.userEmail }}</span>
                    <span>phone:</span>
                    <span>{{ i.userPhone }}</span>
                    <span>age:</span>
                    <span>{{ i.userAge }}</span>
                </div>
            </div>
        </div>
        <div class="btn">
            <button type="button" @click="pageadd">switch</button>
            <button type="button" @click="canc">cancal</button>
            <button type="button" @click="test">test</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Carea {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
        width: 80%;
        height: 50vh;
        border: 1px solid black;
        font-size: 26pt;
        display: flex;

        .title {
            width: 50%;
            // margin: 20px 13px;
            margin-top: 80px;
            margin-left: 80px;
        }

        .select {
            width: 30%;
            margin: 80px 135px;
        }
    }

    .bottom {
        width: 80%;
        height: 80%;
        border: 1px solid black;

        .diplay_ans {
            width: 100%;
            height: 50px;
            // border: 1px solid black;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-size: 20pt;
            padding-left: 75px;
            margin-top: 25px;
        }

        .user {
            display: flex;
            align-items: center;
            margin-left: 30px;

            span {
                margin-left: 15px;
            }
        }
    }

    .btn {
        width: 80%;
        display: flex;
        justify-content: flex-end;

        button {
            font-size: 16pt;
        }
    }
}
</style>