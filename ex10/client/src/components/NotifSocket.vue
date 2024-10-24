<template>
    <div class="container">
        <h1> Notifications </h1>
        <div v-if="!isConnected">
            <p style="color: red;">Connection is lost! Trying to reconnect...</p>
        </div>
        <div v-if="isConnected">
            <p style="color: green;">Connection established!</p>
        </div>
        <div v-for="(message, index) in messages" :key="index" class="noti">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
    data() {
        return {
            messages: [],
            socket: null,
            isConnected: false,
        };
    },

    mounted() {
        this.connectSocket();
    },

    methods: {
        addMessage(message) { // add new notification received in current list
            this.messages.push(message);
            console.log(message);
        },

        connectSocket() {
            this.socket = io('http://192.168.107.121:3000', {
                reconnection: true,
                timeout: 60000,
            });

            this.socket.on('connect', () => {
                console.log('WebSocket connected');
                this.isConnected = true;
            });

            this.socket.on('disconnect', () => {
                console.log('WebSocket disconnected');
            });

            this.socket.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            this.socket.on('commentDeleted', (message) => {
                this.addMessage(message);
            });

            this.socket.on('commentAdded', (message) => {
                this.addMessage(message);
            });

            this.socket.on('commentEdited', (message) => {
                this.addMessage(message);
            });
        }
    },
};
</script>

<style scoped>
.container {
    margin: 0 auto;
    padding: 20px;
}

.noti {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.noti:hover {
    background-color: beige;
    transition: 1s;
}

.noti p {
    margin: 0;
}
</style>