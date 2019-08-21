<template>
  <v-container class="pa-2 pr-4" fluid>
    <v-dialog v-model="dialogResult" max-width="500px">
      <v-card>
        <v-toolbar class="pa-0 primary" dark>
          <span class="headline">Resultados:</span>
        </v-toolbar>
        <v-card-text>
          <div :key="index" v-for="(item, index) in poll.answers">
            <label> Respuesta: <strong> {{item.value}}</strong>  - Votos <strong> {{ item.numberVotes }}</strong> </label>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeResult">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card :elevation="4">
      <v-card-text>
        <div class="headline">{{ poll.name }}</div>
        {{ poll.description}}
      </v-card-text>
      <v-card-actions>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn text flat v-on="on">Votar</v-btn>
            <v-btn text flat @click="openResult" v-if="isAdmin">Resultados</v-btn>
          </template>
          <v-card>
            <v-toolbar class="pa-0 primary" dark>
              <span class="headline">Opciones</span>
              <span>-sola una opcion:</span>
            </v-toolbar>
            <v-card-text>
              <div :key="index" v-for="(item, index) in poll.answers">
                <label>
                  <input
                    type="checkbox"
                    :value="index"
                    class="label-answer"
                    v-bind:key="item._id"
                    v-on:click="setSelected(item._id)"
                    :id="item.value"
                    v-model="selected"
                    :disabled="selected.length == 1
                       && selected.indexOf(index) == -1"
                  />
                  {{item.value}}
                </label>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="close">Cancelar</v-btn>
              <v-btn flat @click="saveVoteForPoll">Votar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    poll: Object
  },
  data () {
    return {
      dialog: false,
      dialogResult: false,
      selected: [],
      idSelecteds: [],
      vote: {
        idUser: null,
        idAnswer: null
      }
    };
  },
  computed: {
    ...mapGetters([
      'getAllPollsData',
      'isAdmin',
      'getCurrentUserId'
    ]) 
  },
  watch: {
    dialog (val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions([
      'updateNamePage',
      'getAllPolls',
      'saveVote'
    ]),
    setSelected (value) {
      let index = this.idSelecteds.indexOf(value);
      if (index === -1) {
        this.idSelecteds.push(value);
      } else {
        this.idSelecteds.splice(index, 1);
      }
    },
    close () {
      this.selected = [];
      this.idSelecteds = [];
      this.dialog = false;
    },
    closeResult () {
      this.dialogResult = false;
    },
    openResult () {
      this.getAllPolls();
      this.dialogResult = true;
    },
    saveVoteForPoll () {
      this.vote.idUser = this.getCurrentUserId;
      this.vote.idAnswer = this.idSelecteds[0];

      if (this.vote.idAnswer === undefined) {
        window.getApp.snackbar = {
          show: true,
          color: 'error',
          text: 'Is necessary to select at least one option',
          position: 'top'
        };
        return;
      }

      this.saveVote(this.vote);
      this.getAllPolls();
      this.close();
    }
  }
};
</script>
<style scoped lang="css">
.nobull {
  list-style-type: none;
 }
 .label-question {
    font-weight: bold; 
    color: rgb(51, 51, 51);
}
.label-answer { 
   padding-top: 10px;
   padding-bottom: 10px;
   color: rgb(51, 51, 51);
}
</style>