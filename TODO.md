
- What is persistent and activator 

...
    <v-dialog width="350px" persistent v-model="editedDialog">
        <v-btn fab accent slot="activator">
...         

- Will state be lost when refresh page, if state in store/index.js is not stored in localStorage

...

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
        ],
        user: null,
        loading: false,
        error: null
    },
...