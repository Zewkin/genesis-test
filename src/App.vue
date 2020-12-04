<template>
  <div id="app">
    <grid 
      :columns='columns'
      :rows='rows'
      :rowsPerPage='20'
      @edit='editCell'
    />
  </div>
</template>

<script>

import Grid from './components/Grid/Grid.vue'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Grid
  },
  computed: mapState('grid', {
    columns: state => state.columns,
    rows: state => state.rows,
  }),
  mounted () {
    this.$store.dispatch('grid/getData')
  },
  methods: {
    editCell ({ id, column, value }) {
      this.$store.dispatch('grid/editCell', { id, column, value })
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 15px;
  }
</style>
