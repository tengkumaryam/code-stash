<template>
    <div class="container">
        <div class="searchinput-container">
            <input class="searchinput" type="text" placeholder="Search for a comment here..." v-model="keyword"
                @input="handleInputChange" />
            <button class="clear-button" @click="clearSearch">x</button>
            <button class="search-button" @click="filterComments">Search</button>
        </div>

        <b-pagination class="pageNumbers" v-model="currentPage" align="center" :total-rows="rows" :per-page="perPage" aria-controls="my-data" first-number last-number pills />
        <p class="mt-3">Current Page: {{ currentPage }}</p>

        <div class="row">
            <div v-for="comment in paginatedComments" :key="comment.id" class="col-md-4">
                <b-card-group columns id="my-data" :items="items" :per-page="perPage" :current-page="currentPage" small>
                    <b-card class="card">
                        <h5 class="card-title">{{ comment.name }}</h5>
                        <b-button variant="primary" @click="viewDetails(comment.id)" class="view-button">View
                            details</b-button>
                        <b-button variant="danger" @click="deleteComment(comment.id)"
                            class="delete-button">Delete</b-button>
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
            keyword: '',
            perPage: 30,
            currentPage: 1,
        };
    },
    created() {
        this.fetchComments();
        this.loadSearch();
    },
    computed: {
        rows() {
            return this.filteredComments.length;
        },
        paginatedComments() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            const result = [];

            for (let i = start; i < end && i < this.filteredComments.length; i++) {
                result.push(this.filteredComments[i]);
            }

            return result;
        }
    },
    methods: {
        async fetchComments() {
            try {
                const responses = await axios.get('http://192.168.107.121:4000/comments');
                this.comments = responses.data;
                this.filteredComments = this.comments;
            } catch (err) {
                console.error("Can't display comments :(", err);
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
            setTimeout(localStorage.removeItem('searchKeyword'), 10000);
        },

        loadSearch() {
            const lastSearch = localStorage.getItem('searchKeyword');
            localStorage.getItem('searchKeyword')
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

        async deleteComment(id) {
            try {
                const confirmDelete = confirm('Are you sure you want to delete the comment?');
                if (!confirmDelete) {
                    return;
                }
                const responses = await axios.delete(`http://192.168.107.121:4000/comments/${id}`);
                if (responses.status == 200) {
                    alert('Comment deleted successfully!');
                    await this.fetchComments();
                }
            } catch (error) {
                console.error("Can't delete comment :(", error);
            }

        }
    }

};
</script>

<style scoped>
.pageNumbers {
    font-weight: bold;
}

.comments {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

.searchinput-container {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
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

.view-button {
    background-color: rgb(111, 87, 121);
    border: 0;
}

.view-button:hover {
    background-color: pink;
}

.delete-button {
    display: none;
}

.card:hover .delete-button {
    display: inline-block;
    margin: 0.5%;
}
</style>