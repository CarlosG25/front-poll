<template>
  <v-toolbar ma-0 fixed app class="primary" dark> 
    <v-toolbar-title>
      <v-btn ma-0 icon @click="handleDrawerToggle()">
          <v-icon>menu</v-icon>
     </v-btn> 
    </v-toolbar-title>
     <v-toolbar-title>{{ getNamePage }}</v-toolbar-title>
    <v-spacer></v-spacer>
     <v-btn flat @click="singIn()" v-if="!isAuth">
      Iniciar sesion
    </v-btn>
    <v-btn flat @click="loguotSystem()" v-if="isAuth">
      Cerrar sesion
    </v-btn>
  </v-toolbar>
</template>
<script>
import Util from '@/util';
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters([
      'getNamePage',
      'isAuth',
      'getCurrentUser',
    ]) 
  },
  methods: {
    ...mapActions(['logout']),
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
      this.drawer = (!this.drawer);
    },
    loguotSystem () {
      this.logout(this.getCurrentUser.idUser);
      this.$router.push('/');
    },
    singIn () {
      this.$router.push('/');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
