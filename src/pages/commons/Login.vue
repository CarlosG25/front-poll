<template>
 <v-container>
      <v-layout row>
          <v-flex xs12 sm6 m4 offset-xs0 offset-sm3 offset-m4>
            <v-card :elevation="12" py-5>
           <v-card-text>
                <h3 align-center>Login Encuestalandia</h3>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  name="login"
                  outline
                  label="Usuario"
                  :rules="[rules.required]"
                  type="text"
                  v-model="model.username_j"
                ></v-text-field>
                <v-text-field
                  name="password"
                  outline
                  :rules="[rules.required]"
                  label="Contraseña"
                  id="password"
                  :type="viewPassword ? 'text' : 'password'"
                  v-model="model.password_j"
                >
                </v-text-field>
                <v-checkbox v-model="viewPassword" label="Mostrar Contrasena"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="primary"
                @click="loginAndRedirection"
                :disabled="!valid"
                ripple
              >Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    loading: false,
    valid: true,
    viewPassword: false,
    isMobile: false,
    model: {
      username_j: 'admin',
      password_j: 'Admin'
    },
    rules: {
      required: (value) => !!value || 'Campo requerido.'
    }  
  }),
  methods: {
    ...mapActions([
      'login'
    ]),
    onResize () {
      if (window.innerWidth < 991) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    loginAndRedirection () {
      if (this.$refs.form.validate()) {
        this.login(this.model);
      }   
    }, 
    mounted: function () {
      this.onResize();
      window.addEventListener('resize', this.onResize);
    },
    beforeDestroy () {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize);
      }
    },
  }
};
</script>
<style scoped lang="css">
</style>
