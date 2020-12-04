<template>
  <div class="pagination">
    <ul>
      <li v-for='n in pages' :key='n'>
        <a href="#" @click='setPage($event, n)' :class="[(n == page ? 'strong' : '')]">{{ n }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    rowsPerPage: Number,
    totalRows: Number
  },
  computed: {
    pages: function () {
      return Math.ceil(this.totalRows / this.rowsPerPage)
    }
  },
  methods: {
    setPage ($event, page) {
      $event.preventDefault()
      this.page = page
      this.$emit('setPage', page)
    }
  },
  data () {
    return {
      page: 1
    }
  }
}
</script>

<style lang="scss">
  .pagination {
    ul {
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 10px;
      overflow: hidden;
      float: left;
      li {
        float: left;
        list-style-type: none;
        margin-right: 10px;
        color: gray;
        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
    .strong {
      color: black;
      font-weight: 700;
    }
  }
</style>
