import getApi from "@/axios-api";

export const postModule = {
    state: () => ({
        posts: [],
        sortOptions: [
          { value: "title", name: "По названию" },
          { value: "text", name: "По описанию" },
        ],
        isPostsLoading: false,
        selectedSort: '',
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localCompare(post2[state.selectedSort])
            })
        }
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setSelectedSort(state, payload) {
            state.selectedSort = payload;
        },
        setLoading(state, payload) {
            state.isPostLoading = payload;
        },
    },
    actions: {
        //вывод всех постов
        refreshPostsData({ commit }) {
            commit('setLoading', true)
            getApi
              .get("")
              .then((response) => {
                commit('setPosts', response.data)
              })
              .catch((error) => console.log(error))
              .finally(commit('setLoading', false));
        },
        //добавление поста
        addPost({ state, commit }) {
            getApi
              .post("", {
                _title: state.title,
                _text: state.text,
                author: 1,
                created_date: "",
                published_date: "",
              })
              .then((response) => {
                commit('setPosts', response.data)
              })
              .catch((error) => console.log(error));
        },
    },
    namespaced: true
}