<template>
    <!-- <div class="comments">
        <h2>Les commentaires</h2>
        <p>{{ comments }}</p>
        <h1>names</h1>
        <p>{{ names }}</p>
        <h1>emails</h1>
        <p>{{ emails }}</p>
        <h1>bodies</h1>
        <p>{{ bodies }}</p>
    </div> -->
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
            // names: [],
            // emails: [],
            // bodies: [],
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
                // this.names = this.comments.map(comment => comment.name)
                // this.emails = this.comments.map(comment => comment.email)
                // this.bodies = this.comments.map(comment => comment.body)
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