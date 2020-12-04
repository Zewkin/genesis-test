<template>
  <div class="columns">
    <ul>
      <li v-for='(value, key) in enabledColumns' :key='key'>
        <label>
          <input
            type="checkbox"
            :checked='enabledColumns[key]'
            @change='toggleColumn($event, key)'
          />
          {{ columns[key] }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Columns',
  props: {
    enabledColumns: Object,
    columns: Object
  },
  methods: {
    toggleColumn (e, column) {
      this.enabledColumns[column] = e.target.checked
    }
  }
}
</script>

<style lang="scss">
  .columns {
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
      }
    }
  }
</style>
