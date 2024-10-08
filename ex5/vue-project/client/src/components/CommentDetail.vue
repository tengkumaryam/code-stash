<template>
    <div>
        <b-card class="detailed-card">
            <strong>Id : </strong>
            {{ comment.id }}
            <br />
            <strong>Name : </strong>
            {{ comment.name }}
            <br />
            <strong>Email : </strong>
            <span class="email">{{ comment.email }}</span>
            <br />
            <strong>Comment : </strong>
            {{ comment.body }}
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            comment: null,
        };
    },
    created() {
        this.fetchDetails();
    },
    methods: {
        async fetchDetails() {
            const id = this.$route.params.id;
            try {
                // const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
                const response = await axios.get(`http://192.168.107.121:3000/comments/${id}`);
                this.comment = response.data;
            } catch (err) {
                console.error('Error!', err);
            }
        }
    },
};
</script>


<style>
.detailed-card {
    margin: 10px 0;
    padding: 5px;
    align-items: normal;
    background-color: rgb(247, 244, 248);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.email {
    color: #007bff;
}

.email:hover {
    font-weight: bolder;
}
</style>