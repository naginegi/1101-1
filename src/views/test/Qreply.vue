<script>
import axios from 'axios';
export default {
    data() {
        return {
            data: null,
            qnid: 0,
            search: {
                title: " ",
                startDate: " ",
                endDate: " "
            }
        }
    },
    methods: {
        //取全部
        getData() {
            axios.get("http://localhost:8082/api/quiz/getAll")
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)

                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        //增加
        postData() {
            axios.post("http://localhost:8082/api/quiz/create", {

                questionnaire: {
                    title: "est",
                    description: "TEST",
                    opened: false,
                    published: true,
                    anonymous: true,
                    startDate: "2023-12-20",
                    endDate: "2024-05-05"
                },

                questionList: [
                    {
                        qnid: 6,
                        quid: 1,
                        title: "CCC",
                        options_type: "CCTEST",
                        options: "A;B;C",
                        necessary: false
                    }
                ]
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)

                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        //
        deleQn() {
            axios.post("http://localhost:8082/api/quiz/deleQuestionnaire", {
                idList: [8]
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)

                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        //
        deleQu() {
            axios.post("http://localhost:8082/api/quiz/deleQuestion", {
                id: 5,
                idList: [
                    1
                ]
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)

                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        searchData() {
            axios.get(`http://localhost:8082/api/quiz/search?title=${this.search.title}&startDate=${this.search.startDate}&endDate=${this.search.endDate}`)
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.quizVoList)
                    console.log(this.data.rtnCode)
                })
                .catch(error => {
                    console.error("error", error);
                })
        },

        setAns() {
            console.log(new Date().toLocaleString())
            axios.post("http://localhost:8082/api/quiz/setAns", {
                ansList: [
                    {
                        qnid: 0,
                        quid: 0,
                        userPhone: "phone",
                        userName: "Name",
                        userEmail: "Email",
                        userAge: 18,
                        ans: "ansansans",
                        // dateTime: "2023-12-20 12:34:56"
                    }
                ]
            })
                .then(response => {
                    this.data = response.data;
                    console.log(this.data.rtnCode)
                })
                .catch(error => {
                    console.error("error", error);
                })
        },
        test() {

            // fetch('http://localhost:8080/api/HwQuestionnaire/search', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error(`HTTP error! Status: ${response.status}`);
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         console.log(data); //第一次 全部的數據
            //     })
            //     .catch(error => {
            //         console.error("error", error);
            //     })

            // fetch('http://localhost:8080/api/HwQuestionnaire/create', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify()
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error(`HTTP error! Status: ${response.status}`);
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         console.log(data);
            //     })
            //     .catch(error => console.error('Error:', error));

        }
    }
}
</script>

<template>
    <h1>reply</h1>
    <input type="date" >
    <div>
        <!-- <h1>Vue 結合 Axios 範例</h1> -->
        <button @click="getData">get</button>
        <button @click="postData">create</button>
        <button @click="deleQn">deleQn</button>
        <button @click="deleQu">deleQu</button>
        <button @click="searchData">search</button>
        <button @click="setAns">setAns</button>
        <div v-if="data">
            <!-- <h2>獲取的數據：</h2> -->
            <pre>{{ data }}</pre>
            <!-- <p>{{ date }}</p> -->
        </div>
    </div>
</template>

<style lang="scss" scoped></style>