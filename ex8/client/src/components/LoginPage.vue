<template>
    <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="username" placeholder="username" />
            <br />
            <br />
            <input v-model="password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import api from '../api';

export default {
    data() {
        return {
            userId: "",
            password: "",
        };
    },
    methods: {
        async login(e) {
            e.preventDefault();
            try {
                const response = await api.post('/login', { userId: this.userId, password: this.password }); // authentication
                localStorage.setItem('token', response.data.token); // store JWT in LocalStorage
                alert('Login successful!');
                this.$router.push('/comments');
            } catch (error) {
                alert('Login failed!');
                console.error(error);
            }
        }
    }
};
</script>