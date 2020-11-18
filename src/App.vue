<template>
  <div id="app">
    <app-navigation></app-navigation>

    <transition appear
                mode="out-in"
                name="custom-classes-transition"
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <router-view></router-view>
    </transition>


    <app-footer></app-footer>
  </div>
</template>

<script>


  import Footer from "./components/shared/Footer";
  import Navigation from "./components/shared/Navigation";
  import Calender from './components/calender/Calender';
  import Register from "./components/auths/Register";


  export default {
    components: {
      appNavigation: Navigation,
      appFooter: Footer,
      appCalender: Calender,
    },
    name: 'app',
    data() {
      return {
        msg: '',
      }
    },
    methods: {},
    created() {
      this.$store.dispatch("initAuth")
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #FFCE00;
    font-family: 'Saira', Arial, Helvetica, sans-serif;
  }


</style>
