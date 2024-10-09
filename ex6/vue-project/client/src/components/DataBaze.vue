<template>
    <div class="container">
        <div class="row">
            <div v-for="person in persons" :key="person.id">
                <b-card-group columns>
                <b-card class="card">
                    <h5 class="card-title">{{ person.name }}</h5>
                    <b-button variant="primary" @click="viewDetails(person.id)" class="button">View details</b-button>
                </b-card></b-card-group>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DataBaze',
    data() {
        return {
            persons: [],
        };
    },
    created() {
        this.fetchPersons();
    },
    methods: {
        async fetchPersons() {
            try {
                // const responses = await axios.get('https://jsonplaceholder.typicode.com/comments');
                const responses = await axios.get('http://192.168.107.121:4000/persons');
                this.comments = responses.data;
            } catch (err) {
                console.error('Error!', err);
            }
        },

        loadPersons() {
            this.fetchPersons();
        },
    },
};
</script>