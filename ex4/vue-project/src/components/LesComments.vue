<template>
    <div class="comments">
        <h2>Les commentaires</h2>
        <p>{{comments}}</p>


    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'LesComments',
    data() {
        return {
            comments: [],
            //error: null,
        };
    },
    created() {
        this.fetchComments();
    },
    methods: {
        async fetchComments() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
                this.comments = response.data;
            } catch (err) {
                console.error('Error!', err);
            }
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