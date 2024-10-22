<template>
    <div>
        <b-card class="detailed-card" v-if="comment">
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
            <br />
            <strong>Creation date : </strong>
            {{ comment.date_created }}
        </b-card>
    </div>
</template>

<script>
// import axios from 'axios';
import axios from '../../../api/services/axios';

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
                const response = await axios.get(`comments/${id}`);
                console.log('API Response:', response.data);

                this.comment = response.data[0];
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