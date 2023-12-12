<script>
import axios from 'axios';
export default {
    /*
    deta() {
        return {
            qnid: 0,
            dataList:[],
            ans_List: [],
        }
    },
    */
    data() {
        return {
            qnid: 0,
            quid:0,
            data_List: [],
            ans_List: [],
        };
    },
    methods: {
        getAns(qnid, quid) {
            axios.get(`http://localhost:8082/api/quiz/getAns?qnid=${qnid}&quid=${quid}`)
                .then(response => {
                    this.ans_List = response.data.ansList;
                    console.log(this.ans_List)

                    for(let i = this.ans_List.length-1 ; i>=0 ; i--){
                        let name ='';
                        if(this.ans_List[i].userName != ''){
                            name = this.ans_List[i].userName
                        }else{
                            name = `ans${i+1}`;
                        }
                        const data ={
                            id:i+1,
                            name:name,
                            time:this.ans_List[i].dateTime.replace("T", " "),
                        }
                        this.data_List.push(data)
                    }
                    console.log(this.data_List) 

                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        goReview(time){
            let qnid = this.qnid
            // let quid = this.quid
            this.$router.push({ name: 'stat_detail', params: { qnid,time } });
        },
        canc() {
            let id = this.qnid
            this.$router.push({ name: 'stat_qn', params: { id } });
        }
    },
    mounted() {
        const qnid = this.$route.params.qnid;
        const quid = this.$route.params.quid;
        this.qnid = qnid;
        this.quid = quid;
        console.log(qnid);
        console.log(quid);
        this.getAns(qnid, quid);
    }
}

</script>

<template>
    <div class="area">
        <div class="title">
            <div class="text num">編號</div>
            <div class="text name">姓名</div>
            <div class="text dateTime">填寫時間</div>
            <div class="text review">觀看回復</div>
        </div>
        <div class="userData" v-for="(ans,index) in data_List" :key="index">
            <div class="text num">{{ ans.id }}</div>
            <div class="text name">{{ ans.name }}</div>
            <div class="text dateTime">{{ ans.time }}</div>
            <div class="text review" @click="goReview(ans.time)">前往</div>
        </div>
        <button @click="canc">返回</button>
    </div>
</template>

<style lang="scss" scoped>
.area {
    width: 99.9%;
    height: 99.9%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 60%;
        height: 5%;
        border: 1px solid black;
        display: flex;
        margin-top: 10%;
    }

    .text {
        height: 100%;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16pt;
        &:hover{
                    // color:red;
                    background-color: rgba(0, 0, 0, 0.075);
                }
    }

    .num {
        width: 10%;

    }

    .name {
        width: 30%;
    }

    .dateTime {
        width: 40%;
    }

    .review {
        width: 20%;
        &:hover{
                    color:red;
                    cursor: pointer;
                }
    }

    .userData {
        width: 60%;
        height: 5%;
        border: 1px solid black;
        display: flex;
    }
}
</style>