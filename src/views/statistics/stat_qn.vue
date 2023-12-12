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
        };
    },
    methods: {
        spiltOp() {
            this.quizvo.quList.forEach(qu => {
                let opt = [];
                opt = qu.options.split(";");
                this.op.push(opt);
            });
            console.log(this.op);
        },

        getData(id) {
            axios.get(`http://localhost:8082/api/quiz/searchId?qnid=${id}`)
                .then(response => {
                    this.quizvo.qn = response.data.quizVoList[0].questionnaire;
                    console.log(this.quizvo.qn);
                    this.quizvo.quList = response.data.quizVoList[0].questionList;
                    console.log(this.quizvo.quList);

                    this.spiltOp();
                })
                .catch(error => {
                    console.error("error", error);
                });
        },
        cancal(){
            this.$router.push('/managerA');
        },
        gotoBar(qnid,quid){
            this.$router.push({ name: 'stat_bar', params: { qnid,quid } });
        },
        gotoPie(qnid,quid){
            this.$router.push({ name: 'stat_pie', params: { qnid,quid } });
        },
        gotoList(qnid,quid){
            this.$router.push({ name: 'stat_list', params: { qnid,quid } });
        }

    },
    created() {
        console.log(this.$route.params.id);
        this.id = this.$route.params.id;
        this.getData(this.id);
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
                                <input :type="qu.options_type" v-if="qu.options_type != 'text'">
                                <input :type="qu.options_type" v-if="qu.options_type == 'text'">
                                <span>{{ i }}</span>
                            </li>
                            <button class="bar" @click="gotoBar(qu.qnid,qu.quid)">bar</button>
                            <button class="pie" @click="gotoPie(qu.qnid,qu.quid)">pie</button>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>
        <div class="area btn">
            <button class="list" @click="gotoList( this.quizvo.quList[0].qnid, this.quizvo.quList[0].quid)">list</button>
            <button type="button" @click="cancal">返回</button>
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