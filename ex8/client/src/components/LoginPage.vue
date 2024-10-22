<template>
    <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="userId" placeholder="username" />
            <br />
            <br />
            <input v-model="password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit" :disabled="loading">
                <span v-if="loading">Logging in...</span>
                <span v-else>Login</span>
            </button>
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
            loading: false,
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first!');
            if (this.$route.path !== '/login') {
                this.$router.push('/login'); 
            }
        }
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                const response = await api.post('/login', { userId: this.userId, password: this.password });
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                this.$router.push('/modify-comment');
            } catch (error) {
                alert('Login failed!');
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>