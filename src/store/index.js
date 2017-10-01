import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'http://img.timeoutbeijing.com/201702/20170214122812289.jpg',
                id: 'xxxbj',
                title: 'Meetup in Beijing',
                date: new Date(),
                location: 'Beijing',
                description: 'Meetup in Beijing'
            },
            {
                imageUrl: 'http://www.themoneycommando.com/wp-content/uploads/2017/04/Shanghai_780x520.jpg',
                id: 'xxxsh',
                title: 'Meetup in Shanghai',
                date: new Date(),
                location: 'Shanghai',
                description: 'Meetup in Shanghai'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    // 
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'xxdfafdsafdsa'
            }
            //use firebase to save it
            commit('createMeetup', meetup)
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                    }
                    //using mutation
                    commit('setUser', newUser)
                }).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError',error)
                    console.log(error)
                })
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError',error)
                    console.log(error)
                })
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user(state) {
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }
    }
})
