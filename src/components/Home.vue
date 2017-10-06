<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <!--v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout-->
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


export default {
   computed: {
      meetups () {

          const initMeetups = [
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
                        },
                         {
                            imageUrl: 'http://blog.kudoybook.com/wp-content/uploads/images/Frankfurt_am_Main.jpg',
                            id: 'xxxffm',
                            title: 'Meetup in Frankfurt',
                            date: new Date(),
                            location: 'Frankfurt',
                            description: 'Meetup in Frankfurt'
                        }
                        // http://blog.kudoybook.com/wp-content/uploads/images/Frankfurt_am_Main.jpg
                    ]
        return initMeetups
        //return this.$store.getters.featuredMeetups
      },

      loading () {
        //return this.$store.getters.loading
        return false
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }

}
</script>


<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>