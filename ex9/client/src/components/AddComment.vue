<template>
    <div>
        <b-form class="form" @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-1" label="Your name:" label-for="input-1">
                <b-form-input id="input-1" v-model="form.name" placeholder="Enter name" required />
            </b-form-group>

            <br>

            <b-form-group id="input-group-2" label="Email address:" label-for="input-1">
                <b-form-input id="input-2" v-model="form.email" type="email" placeholder="Enter email"
                    required />
            </b-form-group>

            <br>

            <b-form-group id="input-group-3" label="Your comment:" label-for="input-3">
                <b-form-input id="input-3" v-model="form.body" placeholder="Enter comment" required/>
            </b-form-group>

            <br>

            <b-button pill type="submit" variant="primary">Submit</b-button>
            <b-button pill type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from '../../../api/services/axios';

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                body: ''
            },
            show: true,
            submitted: false
        };
    },

    methods: {
        onSubmit(event) {
            event.preventDefault();

            const comment = {
                name: String(this.form.name),
                email: String(this.form.email),
                body: String(this.form.body)
            };

            // Send details to API
            try {
                axios.post('comments', comment);
                this.submitted = true;
                alert('Comment added!');
            } catch (error) {
                console.error('Comment can\'t be added', error);
            }
            this.onReset();
        },

        onReset(event) {
            if (event) {
                event.preventDefault();
            }

            // Reset the form
            this.form.name = '';
            this.form.email = '';
            this.form.body = '';

            // this.submitted = false;
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