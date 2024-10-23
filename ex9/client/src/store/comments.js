import axios from '../../../api/services/axios'

const state = {
    comments: [],
};

const getters = {
    getAllComments: (state) => state.comments,
    getCommentById: (state) => (id) => state.comments.find(comment => comment.id === id),
};

const mutations = {
    setComments(state, comments) {
        state.comments = comments;
    },
    addComment(state, comment) {
        state.comments.push(comment);
    },
};

const actions = {
    async fetchComments({ commit }) {
        try {
            const response = await axios.get('comments');
            commit('setComments', response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    },
    async createComment({ commit }, commentData) {
        try {
            const response = await axios.post('comments', commentData);
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