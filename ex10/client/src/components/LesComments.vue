<template>
    <div class="container">
        <div class="searchinput-container">
            <div class="filter">
                <select v-model="selectedFilter">
                    <option value="id">Id</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="body">Body</option>
                    <option value="date">Date</option>
                </select>
            </div>
            <input v-if="selectedFilter !== 'date'" class="searchinput" type="text"
                :placeholder="`Search for a comment's ${selectedFilter} here..`" v-model="keyword"
                @input="handleInputChange" />
            <div v-if="selectedFilter === 'date'" class="date-filter">
                <input type="date" v-model="startDate" placeholder="Start date" class="calendar" />
                <input type="date" v-model="endDate" placeholder="End date" class="calendar" />
            </div>
            <button class="clear-button" @click="clearSearch">x</button>
            <button class="search-button" @click="filterComments">Search</button>
        </div>

        <b-pagination class="pageNumbers" v-model="currentPage" align="center" :total-rows="rows" :per-page="perPage"
            aria-controls="my-data" first-number last-number pills />
        <p class="mt-3">Current Page: {{ currentPage }}</p>

        <div class="row">
            <div v-for="comment in paginatedComments" :key="comment.id" class="col-md-4">
                <b-card class="card">
                    <h5 class="card-title">{{ comment.name }}</h5>
                    <b-button variant="primary" @click="viewDetails(comment.id)" class="view-button">View
                        details</b-button>
                    <b-button variant="danger" @click="deleteComment(comment.id)"
                        class="delete-button">Delete</b-button>
                </b-card>
            </div>
        </div>
        <br><br>

        <div>
            <a href="http://192.168.107.121:4000/comments/download/csv" download class="download">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512"
                    fill="currentColor">
                    <path
                        d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                </svg>Click here to download all comments in CSV
            </a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
const Fuse = require('fuse.js');

export default {
    name: 'LesComments',
    data() {
        return {
            filteredComments: [],
            keyword: '',
            perPage: 18,
            currentPage: 1,
            selectedFilter: 'id',
            startDate: '',
            endDate: '',
            message: '',
            messages: []
        };
    },
    sockets: {
        connect() {
            console.log('Connected to server');
        },
        disconnect() {
            console.log('Disconnected from server');
        },
    },
    created() {
        this.loadComments();
        this.loadSearch();
    },
    computed: {
        ...mapGetters('comments', ['getAllComments']), // makes the getAllComments getter from vuex store's (from "comments" module) accessible as a property
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
        ...mapActions('comments', ['fetchComments']),
        async loadComments() {
            await this.fetchComments();
            this.filteredComments = this.getAllComments;
        },

        handleInputChange(e) {
            if (e.target.value) {
                e.target.classList.add("searchinput--touched");
            } else {
                e.target.classList.remove("searchinput--touched");
            }
        },

        clearSearch() {
            this.keyword = '';
        },

        filterComments() {
            this.filteredComments = [...this.getAllComments]; // copy all comments
            if (this.selectedFilter === 'date') {
                const start = new Date(this.startDate).getTime();
                const end = new Date(this.endDate).getTime();
                this.filteredComments = this.filteredComments.filter(comment => {
                    const date = new Date(comment.date_created).getTime();
                    return date >= start && date <= end;
                });
                if (this.filteredComments.length === 0) {
                    alert(`Sorry, no comments dated from ${this.startDate} to ${this.endDate} found`);
                }
            } else {
                const options = {
                    keys: [this.selectedFilter],
                    threshold: 0.0,
                    findAllMatches: false,
                    ignoreLocation: true,
                };
                const fuse = new Fuse(this.getAllComments, options);
                const result = fuse.search(this.keyword);
                if (this.filteredComments.length === 0) {
                    alert(`Sorry, no comments with ${this.selectedFilter} = "${this.keyword}" were found`);
                }
                this.filteredComments = result.map(item => item.item);
            }

        },

        saveKeyword() {
            localStorage.setItem('searchKeyword', this.keyword);
        },

        loadSearch() {
            const lastSearch = localStorage.getItem('searchKeyword');
            if (lastSearch) {
                this.keyword = lastSearch;
                this.filterComments();
            }
        },

        viewDetails(id) {
            this.$router.push({ name: 'DetailsView', params: { id } });
        },

        async deleteComment(id) {
            const confirmDeletion = confirm('Are you sure you want to delete this comment?');
            if (!confirmDeletion) {
                return;
            }
            try {
                await this.$store.dispatch('comments/deleteComment', id);
                this.filteredComments = this.filteredComments.filter(comment => comment.id !== id);
                alert('Comment deleted successfully!');
            } catch (error) {
                console.error("Can't delete comment :(", error);
            }
        },
        
        sendMessage() {
            if (this.message.trim() !== '') {
                this.$socket.emit('addComment', this.message);
                this.message = '';
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
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 1em auto;
    border: 1px solid #D8D8D8;
    border-radius: 5px;
    padding: 0.5em;
    background: #3E4651;
}

.filter {
    position: relative;
    width: 100px;
}

.searchinput {
    flex: 1;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    margin-right: 0.3em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

select {
    width: 100%;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    color: #5f635f;
    appearance: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.filter::after {
    content: '▼';
    color: #5f635f;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

select:hover {
    background: #E1E9DD;
    color: black;
}

.searchinput {
    width: 350px;
}

.calendar {
    padding: 6px;
    margin-left: 8px;
    margin-right: 8px;
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
    background: #B0BEA9;
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

.search-button {
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    background: #607e70;
    color: #FFF;
    cursor: pointer;
}

.search-button:hover {
    color: #E1E9DD;
    transform: translateY(-3px);
    transition: 0.3s;
}

.searchinput--touched:focus+.clear-button,
.searchinput--touched:hover+.clear-button,
.searchinput--touched+.clear-button:hover {
    display: inline-flex;
}

.card {
    margin: 10px 0;
    padding: 5px;
    background-color: #E0EDC5;
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
    color: #454e3f;
    text-align: center;
    padding: 10px;
}

.view-button {
    background-color: #92AA83;
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

.download {
    color: #544a63;
    margin-top: 100px;
}

.download:hover {
    text-decoration: underline;
    transition-duration: 1s;
    color: cadetblue;
}
</style>