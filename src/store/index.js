import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'http://img.timeoutbeijing.com/201702/20170214122812289.jpg',
                id: 'xxxbj',
                title: 'Meetup in Beijing',
                date: '2017-09-20'
            },
            {
                imageUrl: 'http://www.themoneycommando.com/wp-content/uploads/2017/04/Shanghai_780x520.jpg',
                id: 'xxxsh',
                title: 'Meetup in Shanghai',
                date: '2017-09-21'
            }
        ],
        user: {
            id: 'afafdsadsda12',
            registeredMeetups: ['xxxbj']
        }
    },
    // 
    mutations: {
        createMeetup(state,payload){
            state.loadedMeetups.push(payload)
        }
    },
    actions: {
        createMeetup({commit},payload){
            const meetup={
                title:payload.title,
                location:payload.location,
                imageUrl:payload.imageUrl,
                description:payload.description,
                date:payload.date,
                id:'xxdfafdsafdsa'
            }
            //use firebase to save it
            commit('createMeetup',meetup)
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
        }
    }
})
