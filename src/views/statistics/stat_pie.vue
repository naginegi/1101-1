<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
export default {
    deta() {
        return {
            ans_List: [],
            qnid:0
        }
    },
    methods: {
        getAns(qnid, quid) {
            axios.get(`http://localhost:8082/api/quiz/getAns?qnid=${qnid}&quid=${quid}`)
                .then(response => {
                    this.ans_List = response.data.ansList;
                    console.log(this.ans_List)
                    if (this.ans_List.length == 0) {
                        alert("無作答紀錄")
                        this.canc()
                    }
                })
                .catch(error => {
                    console.error("error", error);
                })
            ///////////////////////////
            axios.get(`http://localhost:8082/api/quiz/searchId?qnid=${qnid}`)
                .then(response => {
                    // console.log(response.data.quizVoList[0].questionList[quid-1])
                    // this.ans_List = this.data.ansList;
                    // console.log(this.data.ansList)
                    this.question = response.data.quizVoList[0].questionList[quid - 1];
                    console.log(this.question)
                    this.get_bar(this.question, this.ans_List)
                })
                .catch(error => {
                    console.error("error", error);
                })


        },
        get_bar(qu,ans_List) {
            console.log(ans_List)
            //切X軸
            let Xaxis = qu.options.split(";")
            console.log(Xaxis)
            //切Y軸 先變字串
            let Ystr = "";
            ans_List.forEach(ans => {
                Ystr = Ystr + ans.ans + ";";
            });
            console.log(Ystr);

            //Y軸計數 計字串裡重複的    
            const charMap = {};
            const chars = Ystr.split(';');
            // console.log(chars)
            chars.forEach(char => {
                if(char != ''){
                    char = char.trim();
                    if (charMap[char]) {
                        charMap[char]++;
                    } else {
                        charMap[char] = 1;
                    }
                    // console.log(charMap)
                }
            });

            let result = Object.entries(charMap).map(([char, count]) => ({ char, count }));
            let Yaxis = [];
            result.forEach(res => {
                Yaxis.push(res.count)
            });
            console.log(Yaxis)

            //匯給圖表
            this.create_bar(Xaxis,Yaxis,qu.title)

        },
        create_bar(Xaxis,Yaxis,title){
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Xaxis,
                    datasets: [{
                        label: title,
                        data: Yaxis,
                    }]
                }
            });
        
        },
        canc() {
            let id = this.qnid
            this.$router.push({ name: 'stat_qn', params: { id } });
        },
    },
    mounted() {
        const qnid = this.$route.params.qnid;
        const quid = this.$route.params.quid;
        this.qnid = qnid;
        this.getAns(qnid, quid);
        console.log(qnid)
        console.log(quid)
        // const qu = this.$route.params.qu;
        // console.log(qu.title);
    }
}

</script>

<template>
    <div class="bar">
        <canvas id="myChart"></canvas>
    </div>
    <button class="btn" @click="canc()">返回</button>
</template>

<style lang="scss" scoped>
.bar{
    width: 99vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn{
    width: 70px;
    height: 30px;
    position: fixed;
    right: 80px;
    bottom: 70px;
}
</style>