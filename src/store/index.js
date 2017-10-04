import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as firebase from 'firebase'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

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
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
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
        loadMeetups({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            location: obj[key].location,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                })
                .catch(
                (error) => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        updateMeetupData({ commit, getters }, payload) {
            console.log("xxxxx" + payload)
            console.log("xxxxx  getters " + getters.user.email)
            console.log("xxxxx  getters" + getters.user.password)
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }

            firebase.database().ref('meetups').
                child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateMeetup', payload)
                }).catch(
                error => {
                    commit('setLoading', false)
                    console.log('xxxx error' + error)
                })
        },
        createMeetup({ commit, getters }, payload) {
            commit('setLoading', true)
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
                }).then(() => {
                    commit('setLoading', false)
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    commit('setLoading', false)
                    console.log(error)
                })
            // Reach out to firebase and store it
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
                    commit('setError', error)
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
                    commit('setError', error)
                    console.log(error)
                })
        },
        clearError({ commit }) {
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
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    },

    plugins: [vuexLocal.plugin]


})
