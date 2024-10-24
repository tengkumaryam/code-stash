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
import axios from '../../../api/services/axios';

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
            alert('Please log in!');
        }
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                const response = await axios.post('/login', { userId: this.userId, password: this.password });
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                this.$router.push('/comments');
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