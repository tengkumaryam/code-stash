<template>
    <div>
        <b-form class="form" @submit="onSubmit" @reset="onReset">

            <b-form-group id="input-group-1" label="Choose the ID:" label-for="input-1">
                <b-form-select id="input-1" v-model="form.id" :options="listId" @change="onIdChange" required />
            </b-form-group>

            <br>

            <b-form-group id="input-group-2" label="Your name:" label-for="input-2">
                <b-form-input id="input-2" v-model="form.name" placeholder="Enter name" required />
            </b-form-group>

            <br>

            <b-form-group id="input-group-3" label="Email address:" label-for="input-3">
                <b-form-input id="input-3" v-model="form.email" type="email" placeholder="Enter email" required />
            </b-form-group>

            <br>

            <b-form-group id="input-group-4" label="Your comment:" label-for="input-4">
                <b-form-input id="input-4" v-model="form.body" placeholder="Enter comment" required />
            </b-form-group>

            <br>

            <b-button pill type="submit" variant="primary">Submit</b-button>
            <b-button pill type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from '../../../api/services/axios';
import { io } from 'socket.io-client';

export default {
    data() {
        return {
            form: {
                id: null,
                name: '',
                email: '',
                body: ''
            },
            listId: [],
            comments: [],
            socket: null,
            show: true,
            submitted: false
        };
    },

    created() {
        this.fetchComments();
        this.socket = io('http://192.168.107.121:3000');
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    },

    methods: {
        async fetchComments() {
            try {
                const responses = await axios.get('comments');
                this.comments = responses.data;
                this.listId = responses.data.map(comment => ({
                    value: comment.id,
                    text: comment.id
                }));
            } catch (err) {
                console.error('Error!', err);
            }
        },

        async onIdChange(id) {
            const comment = this.comments.find(comment => comment.id === id); // finds id match
            if (comment) {
                this.form.name = comment.name;
                this.form.email = comment.email;
                this.form.body = comment.body;
            }
        },

        async onSubmit(event) {
            event.preventDefault();
            const comment = {
                id: this.form.id,
                name: String(this.form.name),
                email: String(this.form.email),
                body: String(this.form.body),
                date_created: new Date()
            };
            try {
                await axios.put(`comments/${this.form.id}`, comment);
                this.socket.emit('editComment', `Comment (ID:${this.form.id}) was edited`);
                alert('Comment updated!');
            } catch (error) {
                console.error('Comment can\'t be updated', error);
            } finally {
                this.onReset();
            }
        },

        onReset(event) {
            if (event) {
                event.preventDefault();
            }

            // Reset the form
            this.form.id = null;
            this.form.name = '';
            this.form.email = '';
            this.form.body = '';

            this.submitted = false;
            this.show = true;

            // Return to form once submitted
            this.$nextTick(() => {
                this.show = true;
            });
        }
    }
}
</script>

<style scoped>
.form {
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>