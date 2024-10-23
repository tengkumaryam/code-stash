import axios from '../../../api/services/axios'

const state = { // initialise
    comments: [],
};

const getters = { // to retrieve data from store
    getAllComments: (state) => state.comments,
    getCommentById: (state) => (id) => state.comments.find(comment => comment.id === id),
};

const mutations = { // change state (data)
    setComments(state, comments) {
        state.comments = comments;
    },
    addComment(state, comment) {
        state.comments.push(comment);
    },
};

const actions = { // async operations
    async fetchComments({ commit }) {
        try {
            const response = await axios.get('comments');
            commit('setComments', response.data); // call mutation to change state
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    },
    async createComment({ commit }, newComment) {
        try {
            const response = await axios.post('comments', newComment);
            commit('addComment', response.data);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};