<template>
  <div class="table-wrapper">
    <Columns
      :enabledColumns='enabledColumns'
      :columns='columns'
    />
    <table class="table">
      <thead>
        <tr>
          <th v-for="(column, index) in visibleColumns" :key="index" @click='setSorting(column)'>
            <div :class="[(sorting.key == column ? 'blue' : '')]">
              <span>{{ columns[column] }}</span>
              <i :class="['sorting', 'fa', (sorting.key == column ? sorting.direction == 'desc' ? 'fa-sort-up' : 'fa-sort-down' : 'fa-sort')]" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in orderedRows" :key="index">
          <td v-for="(column, index) in visibleColumns" :key="index" @dblclick="editCell($event, { id: row._id, column })">
            <span>{{ row[column] ? row[column] : ''  }}</span>
            <input type="text" :value='row[column] ? row[column] : ""' />
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalRows='rows.length'
      :rowsPerPage='rowsPerPage'
      @setPage='setPage'
    />
  </div>
</template>

<script>
import Columns from './Columns'
import Pagination from './Pagination'
import _ from 'lodash'
export default {
  name: 'Grid',
  components: {
    Columns,
    Pagination
  },
  props: {
    columns: Object,
    rows: Array,
    rowsPerPage: Number
  },
  computed: {
    visibleColumns: function () {
      const visibleColumns = []
      for (const column in this.enabledColumns) {
        if (this.enabledColumns[column]) {
          visibleColumns.push(column)
        }
      }
      return visibleColumns
    },
    orderedRows: function () {
      return _.orderBy(this.rows, this.sorting.key, this.sorting.direction).slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
    }
  },
  data () {
    return {
      enabledColumns: {},
      editMode: false,
      sorting: {
        key: null,
        direction: null,
      },
      page: 1
    }
  },
  methods: {
    setSorting (column) {
      if (!this.editMode) {
        this.sorting = {
          key: column,
          direction: this.sorting.key == column ? this.sorting.direction == 'asc' ? 'desc' : 'asc' : 'asc'
        }
      }
    },
    editCell ($event, { id, column }) {
      if (this.editMode) {
        return false
      } else {
        this.editMode = true

        const $input = $event.currentTarget.querySelector('input'),
              $cellContent = $event.currentTarget.querySelector('span')

        $event.currentTarget.style.backgroundColor = '#eee'
        $cellContent.style.display = 'none'
        $input.style.display = 'inline'
        $input.focus()

        $input.addEventListener('keypress', e => {
          if (e.keyCode == 13) {
            this.$emit('edit', { id, column, value: e.target.value })
            $input.style.display = 'none'
            $cellContent.style.display = 'inline'
            this.editMode = false
            $input.parentNode.style.backgroundColor = null
          }
        })        
      }
    },
    setPage (page) {
      this.page = page
    }
  },
  watch: {
    columns: function (columns) {
      const enabledColumns = {}
      for (const column of Object.keys(columns)) {
        enabledColumns[column] = true
      }
      this.enabledColumns = enabledColumns
    }
  }
}
</script>

<style lang="scss">
  .table {
    width: 100%;
    border-collapse: collapse; 
    table-layout: fixed;
    &-wrapper {
      width: 100%;
    }
    .blue {
      color: blue;
    }
    thead {
      line-height: 50px;
    }
    tr {
      border-bottom: 1px solid #eee;
      &:nth-child(even) {
        background-color: aliceblue;
      }
    }
    td, th {
      text-align: left;
      input {
        display: none;
      }
    }
    th div {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-evenly;
      cursor: pointer;
    }
    td {
      padding: 5px;
      border-right: 1px solid #eee;
      &:first-of-type {
        border-left: 1px solid #eee;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        background-color: transparent;
        border: 0;
        &:focus {
          border: 0;
          outline: 0;
        }
      }
    }
  }
</style>
