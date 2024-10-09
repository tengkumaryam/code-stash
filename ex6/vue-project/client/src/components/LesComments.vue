<template>
    <div class="container">
        <div class="row">
            <div v-for="comment in comments" :key="comment.id" class="col-md-4">
                <b-card-group columns>
                <b-card class="card">
                    <h5 class="card-title">{{ comment.name }}</h5>
                    <b-button variant="primary" @click="viewDetails(comment.id)" class="button">View details</b-button>
                </b-card></b-card-group>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LesComments',
    data() {
        return {
            comments: [],
        };
    },
    created() {
        this.fetchComments();
    },
    methods: {
        async fetchComments() {
            try {
                // const responses = await axios.get('https://jsonplaceholder.typicode.com/comments');
                const responses = await axios.get('http://192.168.107.121:3000/comments');
                this.comments = responses.data;
            } catch (err) {
                console.error('Error!', err);
            }
        },

        loadComments() {
            this.fetchComments();
        },

        // changes current route to the one defined in router/index.js
        viewDetails(id) {
            this.$router.push({name:'DetailsView', params:{id}});
        }
    },
};
</script>

<style scoped>
.comments {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

.card {
    margin: 10px 0;
    padding: 5px;
    background-color: rgb(247, 244, 248);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0.5, 0.5);
    transition: transform 0.4s;
}

.card-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #544a63;
    text-align: center;
    padding: 10px;
}

.button {
    background-color: rgb(111, 87, 121);
    border: 0;
}

.button:hover {
    background-color: pink;
}

</style>