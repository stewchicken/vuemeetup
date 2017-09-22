<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large route to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large route to="/meetup/new" class="primary">Organzine Meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <!--cursor:pointer for hand symbol-->
      <v-carousel style="cursor:pointer;">
        <v-carousel-item v-for=" meetup in meetups" v-bind:src="meetup.imageUrl" :key="meetup.id" @click="onLoadMeetup(meetup.id)">
          <div class="title">
            {{meetup.title}}
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>


export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup(id) {
      //$ means gloabal
      this.$router.push('/meetups/' + id);
    }
  }

}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
}
</style>
