<template>
    <div class="container">
        <div class="row">
            <div v-for="comment in comments" :key="comment.id" class="col-md-3">
                <b-card :title="comment.name">
                    <b-card-text>
                        <strong>Email:</strong>
                        <br />
                        {{ comment.email }}
                        <br />
                        <strong>Comment:
                        </strong>
                        <br />
                        {{ comment.body }}
                    </b-card-text>
                </b-card>
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
    },
};
</script>

<style>
.comments {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>