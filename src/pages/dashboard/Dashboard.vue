<template>
  <v-layout row wrap>
    <v-flex xs12 my-4>
      <div v-if="getAllPollsData">
        <ul>
          <li v-for="item in getAllPollsData" :key="item._id" class="nobull">
            <PollItem :poll="item" />
          </li>
        </ul>
      </div>
      <div v-else>
        <h3>CARGANDO ENCUESTAS...</h3>
      </div>
      <div v-if="getPollsEmpty">
        <v-card class="mx-auto" align-center max-width="500" :elevation="4">
          <v-card-text>
            <div v-if="isAdmin" >
              <p class="display-1 text--primary">No se encontraron encuestas</p>
            </div>
            <div v-else>
              <p class="display-1 text--primary">No se encontraron encuestas, comunicate con un usuario administrador para que te apoye dando de alta una nueva encuesta.</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="isAdmin" text @click="goToCreatePoll" flat color="primary">Crear encuesta</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import PollItem from './PollItem';
export default {
  components: {
    PollItem
  },
  data () {
    return {
      isMobile: false,
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapGetters([
      'getAllPollsData',
      'getPollsEmpty',
      'isAdmin'
    ]) 
  },
  mounted: function () {
    this.getAllPolls();
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  },
  methods: {
    ...mapActions([
      'updateNamePage',
      'getAllPolls'
    ]),
    onResize () {
      if (window.innerWidth < 991) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    goToCreatePoll () {
      this.$router.push('/list-polls');
    }
  }
};
</script>
<style scoped lang="css">
.nobull {
  list-style-type: none;
 }
</style>
