<template>
  <v-navigation-drawer
    id="appDrawer"
    fixed
    disable-resize-watcher
    floating
    app
    dark
    mobile-break-point="991"
    v-model="drawer"
    class="primary"
    width="260">
     <v-toolbar class="transparent">
    </v-toolbar>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> {{ getCurrentUserFullName || 'Anonimo' }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
       <v-divider></v-divider>
       <v-list>
        <template v-for="item in isAdmin ? itemsAdmin: items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            :prepend-icon="item.icon"
            no-action>
            <v-list-tile slot="activator" >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(child.path)">
              <v-list-tile-action v-if="child.icon">
                <v-icon :color="child.color">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="goTo(item.path)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list> 
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    isMobile: false,
    drawer: true,
    itemsAdmin: [
      { 
        icon: 'home', 
        text: 'Encuestas', 
        path: 'dashboard'
      },
      { 
        icon: 'contacts', 
        text: 'Administracion',
        path: 'list-users',
        'icon-alt': 'keyboard_arrow_down',
        children: [
          { text: 'Encuestas', path: 'list-polls' }
        ]
      }
    ],
    items: [
      { 
        icon: 'home', 
        text: 'Encuestas', 
        path: 'dashboard'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'getCurrentUserFullName',
      'isAdmin'
    ]),
    computeGroupActive () {
      return true;
    }   
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  mounted: function () {
    if (this.isMobile) {
      this.drawer = false;
    }
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }
  },
  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 779;
    },
    goTo (target) {
      this.$router.push(target);
    }
  }
};
</script>