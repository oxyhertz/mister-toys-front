<template>
        <section class="toy-filter">
        <el-input
        v-model="filterBy.name"
        @input="setFilter"
        type="text"
        placeholder="Search toy.."
        />
        <div style="display: inline-block; margin-left: 20px">
          <p style="margin-left: 10px">Stock</p>

            <el-select @change="setFilter" v-model="filterBy.inStock" clearable placeholder="Select">
              <el-option
                v-for="item in stockOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
      
        <div style="display: inline-block; margin-left: 20px">
          <p style="margin-left: 10px">Labels</p>
          <el-select
            @change="setFilter"
            v-model="filterBy.labels"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

          <div style="display: inline-block; margin-left: 20px">
          <p style="margin-left: 10px">Sort by</p>

            <el-select @change="setFilter" v-model="filterBy.sortBy" clearable placeholder="Select">
              <el-option
                v-for="item in sortByOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

     </section>
</template>

<script>
import selecetVue from "./selecet.vue";
export default {
    name: 'toy-filter',
    components:{
      selecetVue
    },
    data() {
      return {
        filterBy: {
          name: '',
          inStock: '',
          labels: [],
          sortBy: '',
        },
        stockOptions:[
          {
            value: '',
            label: 'All',
          },
          {
            value: 'true',
            label: 'In stock',
          },
          {
            value: 'false',
            label: 'Out of stock',
          }
        ],
        sortByOptions:[
          {
            value: 'time',
            label: 'Time',
          },
          {
            value: 'name',
            label: 'Name',
          },
          {
            value: 'price',
            label: 'Price',
          },
        ],
        options: [
        {
          value: 'On wheels',
          label: 'On wheels',
        },
        {
          value: 'Box game',
          label: 'Box game',
        },
        {
          value: 'Art',
          label: 'Art',
        },
        {
          value: 'Baby',
          label: 'Baby',
        },
        {
          value: 'Doll',
          label: 'Doll',
        },
        {
          value: 'Puzzle',
          label: 'Puzzle',
        },
        {
          value: 'Outdoor',
          label: 'Outdoor',
        },
      ]
      };
    },
    methods: {
      setFilter() {
        this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)));
      },
    },
  };
</script>