<template>
  <v-container>
    <template>
      <div v-if="getPollsForUserData">
        <v-toolbar flat color="white">
          <v-toolbar-title>Encuestas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Encuesta</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout wrap>
                    <v-flex xs12>
                       <v-text-field 
                          :rules="[rules.required]" 
                           outline v-model="editedItem.name" 
                           label="Nombre">
                       </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                       <v-textarea
                          :rules="[rules.required]"
                          outline
                          v-model="editedItem.description" 
                          name="input-7-4"
                          label="Descripcion"
                          ></v-textarea>
                    </v-flex>
                     <v-flex xs12>
                       <v-text-field 
                          :rules="[rules.required]" 
                           outline v-model="editedItem.option1" 
                           label="Opcion #1">
                       </v-text-field>
                    </v-flex>
                     <v-flex xs12>
                       <v-text-field 
                          :rules="[rules.required]" 
                           outline v-model="editedItem.option2" 
                           label="Opcion #2">
                       </v-text-field>
                    </v-flex>
                     <v-flex xs12>
                       <v-text-field 
                          :rules="[rules.required]" 
                           outline v-model="editedItem.option3" 
                           label="Opcion #3">
                       </v-text-field>
                    </v-flex>
                  </v-layout>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="getPollsForUserData" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-left">{{ props.item.status }}</td>
          </template>
          <template v-slot:no-data>
             <h4>No se encontraron encuestas</h4>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        <h3>Cargando tabla de encuestas</h3>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  data: () => ({
    dialog: false,
    options: [],
    valid: true,
    rules: {
      required: (value) => !!value || 'Campo requerido.'
    }, 
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Descripcion', align: 'left', value: 'description' },
      { text: 'Estatus', align: 'left', value: 'status' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      answers: [],
      option1: null,
      option2: null,
      option3: null
    }
  }),

  computed: {
    ...mapGetters([
      'getPollsForUserData',
      'getCurrentUser'
    ]),
    ...mapState({
      error: state => state.errors.error,
      messageError: state => state.errors.errorMessage
    }), 
    formTitle () {
      return 'Agregar Encuesta';
    },
    itemsData () {
      return this.getPollsForUserData;
    }
  },
  watch: {
    dialog (val) {
      val || this.close();
    },
    dialogDelete (val) {
      val || this.close();
    }
  },
  mounted: function () {
    this.getPollsForUser(this.getCurrentUser.idUser);
  },
  methods: {
    ...mapActions([
      'updateNamePage',
      'getCurrentUser',
      'getPollsForUser',
      'savePoll'
    ]),
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close () {
      this.dialog = false;
    },
    save () {
      if (this.$refs.form.validate()) {
        let option1 = {
          value: this.editedItem.option1
        };

        let option2 = {
          value: this.editedItem.option2
        };

        let option3 = {
          value: this.editedItem.option3
        };

        this.editedItem.answers.push(option1);
        this.editedItem.answers.push(option2);
        this.editedItem.answers.push(option3);
        this.editedItem.isUser = this.getCurrentUser.idUser;
        console.log(JSON.stringify(this.editedItem));
        this.savePoll(this.editedItem);
      } else {
        return;
      }
      setTimeout(() => {
        this.getPollsForUser();
      }, 2000);
      this.close();
    }
  }
};
</script>