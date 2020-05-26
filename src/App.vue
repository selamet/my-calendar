<template>
  <div id="app">
    <app-navigation></app-navigation>

    <appCalender></appCalender>

    <app-footer></app-footer>
  </div>
</template>

<script>


  import Footer from "./components/shared/Footer";
  import Navigation from "./components/shared/Navigation";
  import Calender from './components/calender/Calender'


  export default {
    components: {
      appNavigation: Navigation,
      appFooter: Footer,
      appCalender: Calender
    },
    name: 'app',
    data() {
      return {
        msg: '',
      }
    },
    methods: {}
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
