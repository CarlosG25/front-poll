<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <drawer class="app--drawer"></drawer>
        <toolbar class="app--toolbar"></toolbar>
        <v-content>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <v-app class="primary split-bg">
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <router-view></router-view>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </template>
        <v-snackbar
      :timeout="3000"
      top
      :color="snackbar.color"
      v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar> 
  </div>
</template>
<script>
import Drawer from '@/components/core/Drawer';
import Toolbar from '@/components/core/Toolbar';
export default {
  components: {
    Drawer,
    Toolbar
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),
  created () {
    window.getApp = this;
  }
};
</script>
<style lang="stylus" scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}

.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>

