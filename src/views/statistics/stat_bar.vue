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
                type: 'bar',
                data: {
                    labels: Xaxis,//['一月', '二月', '三月'],
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
                        label: title,
                        data: Yaxis,//[60, 49, 72]
                    }]
                }
            });
        
        },
        canc() {
            let id = this.qnid
            this.$router.push({ name: 'stat_qn', params: { id } });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // test() {
        //     //裁切X軸
        //     let Xstr_split = this.quList[this.select_quid - 1].options.split(";")
        //     console.log(Xstr_split) //得X軸

        //     /////////////////////////////////////////////////////////////////
        //     //裁切Y軸
        //     //取select選的題目的ans
        //     this.Y_display_List = [];
        //     // let k = 0;
        //     this.ans_List.forEach(element => {
        //         if (element.quid == this.select_quid) {
        //             this.Y_display_List.push(element)
        //         }
        //         // k++
        //     });
        //     console.log(this.Y_display_List)
        //     //
        //     let str_arr = []
        //     this.Y_display_List.forEach(element => {
        //         str_arr.push(element.ans)
        //     });
        //     console.log(str_arr)
        //     let str = str_arr.join(";")
        //     console.log(str)
        //     let str_split = str.split(";")
        //     console.log(str_split)
        //     ////////////////////////////////////////////////////////////////////////
        //     //計數
        //     const array = str_split;

        //     const countOccurrences = (arr) => {
        //         const occurrences = {};

        //         arr.forEach((item) => {
        //             occurrences[item] = (occurrences[item] || 0) + 1;
        //         });

        //         return Object.values(occurrences);
        //     };

        //     const occurrences = countOccurrences(array);
        //     console.log(occurrences);
        //     ////////////////////////////////////////////////////////////////////////
        //     if (this.myChart) {
        //         this.myChart.destroy();
        //         // 等待一小段时间，然后创建新的 Chart 实例
        //         setTimeout(() => {
        //             this.canvas_test(Xstr_split, occurrences)
        //         }, 100);
        //     }
        //     else {
        //         // 如果没有现有的 myChart 实例，直接创建新的 Chart 实例
        //         this.canvas_test(Xstr_split, occurrences)
        //     }

        //     // this.canvas_test(Xstr_split, occurrences)
        // },

        // canvas_test(Xstr_split, occurrences) {
        //     var ctx = document.getElementById('myChart');
        //     var myChart = new Chart(ctx, {
        //         type: 'bar',
        //         data: {
        //             labels: Xstr_split,//['一月', '二月', '三月'],
        //             datasets: [{
        //                 backgroundColor: [
        //                     'rgba(255, 99, 132, 0.2)',
        //                     'rgba(54, 162, 235, 0.2)',
        //                     'rgba(255, 206, 86, 0.2)'
        //                 ],
        //                 borderColor: [
        //                     'rgba(255,99,132,1)',
        //                     'rgba(54, 162, 235, 1)',
        //                     'rgba(255, 206, 86, 1)',
        //                     'rgba(75, 192, 192, 1)'
        //                 ],
        //                 borderWidth: 1,
        //                 label: '銷售業績(百萬)',
        //                 data: occurrences,//[60, 49, 72]
        //             }]
        //         }
        //     });
        // }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    mounted() {
        const qnid = this.$route.params.qnid;
        const quid = this.$route.params.quid;
        this.qnid = qnid;
        this.getAns(qnid, quid);
        console.log(qnid)
        console.log(quid)
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