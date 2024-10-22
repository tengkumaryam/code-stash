import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../../../api/services/axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        comments: []
    },
    getters: {
        getAllComments: (state) => state.comments,
        getIdComment: (state) => (id) => state.comments.find(comment => comment.id === id),
    },
    mutations: {
        setComment: (state, comments) => {
            state.comments = comments;
        },
        addComment: (state, comment) => {
            state.comments.push(comment);
        }
    },
    actions: {
        async fetchComments({ commit }) {
            try {
                const responses = await axios.get('comments');
                commit('setComments', responses.data);
            } catch (error) {
                console.error('Unable to display comment :(', error);
            }
        },
        async addComment({ commit }, comment) {
            try {
                const responses = await axios.post('comments', comment);
                commit('addComment', responses.data);
            } catch (error) {
                console.error('Unable to add new comment :(', error);
            }
        }
    }
});

export default store;