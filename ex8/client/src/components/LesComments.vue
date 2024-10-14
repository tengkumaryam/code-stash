<template>
    <div class="container">
        <!-- <button @click="newComment()" class="button-30" role="button">Add a new comment here</button> -->
        <div class="searchinput-container">
            <input class="searchinput" type="text" placeholder="Search for a comment here..." v-model="keyword"
                @input="handleInputChange" />
            <button class="clear-button" @click="clearSearch">x</button>
            <button class="search-button" @click="filterComments">Search</button>
        </div>
        <br><br>
        <div class="row">
            <div v-for="comment in filteredComments" :key="comment.id" class="col-md-4">
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
const Fuse = require('fuse.js');

export default {
    name: 'LesComments',
    data() {
        return {
            comments: [],
            filteredComments: [],
            keyword: ''
        };
    },
    created() {
        this.fetchComments();
        this.loadSearch();
    },
    methods: {
        async fetchComments() {
            try {
                const responses = await axios.get('http://192.168.107.121:4000/comments');
                this.comments = responses.data;
                this.filteredComments = this.comments;
            } catch (err) {
                console.error('Error!', err);
            }
        },

        filterComments() {
            if (this.keyword == '') {
                this.filteredComments = this.comments;
                return;
            }
            const options = {
                keys: ['name'],
                threshold: 0.0,
                findAllMatches: false,
                ignoreLocation: true,
            }
            const fuse = new Fuse(this.comments, options);
            const result = fuse.search(this.keyword);
            if (result.length == 0) {
                alert(`Sorry, comment containing "${this.keyword}" not found`);
            }
            this.filteredComments = result.map(item => item.item);
        },

        clearSearch() {
            this.keyword = '';
            this.filteredComments = this.comments;
        },

        handleInputChange(e) {
            if (e.target.value) {
                e.target.classList.add("searchinput--touched");
            } else {
                e.target.classList.remove("searchinput--touched");
            }
        },

        saveKeyword() {
            // const timer = 600000;
            localStorage.setItem('searchKeyword', this.keyword);

            setTimeout(() => { // not yet working
                localStorage.removeItem('searchKeyword');
                console.log("Memory removed")
            }, 10000);
        },

        loadSearch() {
            const lastSearch = localStorage.getItem('searchKeyword');
            if (lastSearch) {
                this.keyword = lastSearch;
                this.filterComments();
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

.searchinput-container {
    position: relative;
    display: inline-block;
}

.searchinput {
    width: 250px;
}

.clear-button {
    position: absolute;
    right: 20%;
    top: 25%;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    appearance: none;
    border: none;
    border-radius: 50%;
    background: gray;
    margin: 0;
    padding: 2px;
    color: white;
    font-size: 13px;
    cursor: pointer;
    display: none;
}

.clear-button:hover {
    background: darkgray;
}

.searchinput--touched:focus+.clear-button,
.searchinput--touched:hover+.clear-button,
.searchinput--touched+.clear-button:hover {
    display: inline-flex;
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
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
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
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
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