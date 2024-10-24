<template>
    <div>
        <h1> Notifications </h1>
        <div v-for="(msg, index) in messages" :key="index" class="noti">
            <p>{{ msg }}</p>
        </div>
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
    data() {
        return {
            messages: [],
        };
    },

    mounted() {
        const socket = io('http://192.168.107.121:3000');
        socket.on('commentDeleted', (message) => {
            this.addMessage(message);
        });
        socket.on('commentAdded', (data) => {
            this.addMessage(data);
        });
    },

    methods: {
        addMessage(message) {
            this.messages.push(message);
            console.log(message);
        },
    },
};
</script>