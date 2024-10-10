<template>
    <div class="container">
        <button @click="newComment()" class="button-30" role="button">Add a new comment here</button>
        <br><br>
        <div class="row">
            <div v-for="comment in comments" :key="comment.id" class="col-md-4">
                <b-card-group columns>
                    <b-card class="card">
                        <h5 class="card-title">{{ comment.name }}</h5>
                        <b-button variant="primary" @click="viewDetails(comment.id)" class="button">View
                            details</b-button>
                    </b-card></b-card-group>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LesComments',
    data() {
        return {
            comments: [],
        };
    },
    created() {
        this.fetchComments();
    },
    methods: {
        async fetchComments() {
            try {
                const responses = await axios.get('http://192.168.107.121:4000/comments');
                this.comments = responses.data;
            } catch (err) {
                console.error('Error!', err);
            }
        },

        loadComments() {
            this.fetchComments();
        },

        viewDetails(id) {
            this.$router.push({ name: 'DetailsView', params: { id } });
        },

        newComment() {
            this.$router.push('/add-comment');
        }
    },
};
</script>

<style scoped>
.comments {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

.card {
    margin: 10px 0;
    padding: 5px;
    background-color: rgb(247, 244, 248);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0.5, 0.5);
    transition: transform 0.4s;
}

.card-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #544a63;
    text-align: center;
    padding: 10px;
}

.button {
    background-color: rgb(111, 87, 121);
    border: 0;
}

.button:hover {
    background-color: pink;
}

.button-30 {
  align-items: center;
  appearance: none;
  background-color: #faf3fc;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  font-weight: bold;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

</style>

