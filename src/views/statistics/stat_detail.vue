<script>
import axios from 'axios';
export default {
    data() {
        return {
            quizvo:{
                qn:{},
                quList:[],
            },
            op:[],
            ans:[],
        };
    },
    methods: {
        push_ans(ans_List){
            ans_List.forEach((ans,index) => {
                let type = this.quizvo.quList[index].options_type;
                let res = []     
                res = ans.ans.split(';');
                if(type == 'radio'){
                    res = res.join("")
                    console.log(res);
                }
                    this.ans.push(res);
                
                });
            console.log(this.ans);
        },
        spiltOp() {
            this.quizvo.quList.forEach(qu => {
                let opt = [];
                opt = qu.options.split(";");
                this.op.push(opt);
            });
            console.log(this.op);
        },

        getData(qnid,time) {
            axios.get(`http://localhost:8082/api/quiz/searchId?qnid=${qnid}`)
                .then(response => {
                    this.quizvo.qn = response.data.quizVoList[0].questionnaire;
                    console.log(this.quizvo.qn);
                    this.quizvo.quList = response.data.quizVoList[0].questionList;
                    console.log(this.quizvo.quList);
                    this.spiltOp();
                    this.getAns(qnid,time)
                })
                .catch(error => {
                    console.error("error", error);
                });
            
        },
        getAns(qnid,time){
            axios.get(`http://localhost:8082/api/quiz/getAllAns?qnid=${qnid}&time=${time}`)
            .then(response => {
                    console.log(response.data)
                    this.ans_List = response.data.ansList;
                    console.log(this.ans_List)
                    this.push_ans(this.ans_List);
                    if (this.ans_List.length == 0) {
                        alert("無作答紀錄")
                        this.canc()
                    }
                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        canc(){
            let qnid = this.$route.params.qnid;
            let quid = 1;
            console.log(this.ans)

            this.$router.push({ name: 'stat_list', params: { qnid,quid } });
        },

    },
    created() {
        console.log(this.$route.params.time);
        console.log(typeof(this.$route.params.time));
        this.id = this.$route.params.qnid;
        this.getData(this.id,this.$route.params.time);
        
    },


}

</script>

<template>

    <div class="all">
        <div class="area title">
            <label>問卷：</label>
            <p>{{ this.quizvo.qn.title }}</p>
        </div>
        <div class="area instruction">
            <label>問卷說明：</label>
            <p>{{ this.quizvo.qn.description }}</p>
        </div>
        <div class="area date">
            <label>開始時間：</label>
            <span>{{ this.quizvo.qn.startDate }}</span>
            <label>結束時間：</label>
            <span>{{ this.quizvo.qn.endDate }}</span>
        </div>
        <div class="area contain">
            <label>題目：</label>
            <div>
                <ol>
                    <li v-for="(qu, index) in  quizvo.quList" :key="index"  :style="{ marginBottom: '50px' }">
                        <span>{{ qu.title }}</span>
                        <span v-if="qu.necessary == true">(必填)</span>
                        <ol>
                            <li v-for="(i, option) in op[index]" :key="option">
                                <!-- <input :type="qu.options_type" v-if="qu.options_type != 'text'" v-model="ans[index]" > -->
                                <input :type="qu.options_type" v-if="qu.options_type == 'radio'" v-model="ans[index]" :value="i" disabled>
                                <input :type="qu.options_type" v-if="qu.options_type == 'checkbox'" v-model="ans[index]" :value="i" disabled>
                                <input :type="qu.options_type"  v-if="qu.options_type == 'text'" v-model="ans[index]" readonly>
                                <span>{{ i }}</span>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>
        <div class="area btn">
            <button type="button" @click="canc">返回</button>
            <!-- <button type="button" @click="set_ans">提交</button> -->
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
        min-height: 700px;
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