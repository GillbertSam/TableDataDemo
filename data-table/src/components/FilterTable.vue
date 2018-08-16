<template>
  <div>
    <Table
      border
      :data="filters"
      :columns="tableColumnsFilters"
      stripe>
    </Table>

    <Table
      :show-header=false
      border
      :data="data"
      :columns="columns"
      :loading="loading"
      stripe>
    </Table>
  </div>
</template>

<script>
export default {
  name: "FilterTable",
  props: [
    "columns", 
    "data", 
    "search", 
    "loading"
  ],
  data() {
    return {
      filters: [
        {
          title: ""
        }
      ],
      tableColumnsFilters: []
    };
  },
  created() {
    for (let index in this.columns) {
      let filter = {};
      /**
       * 因为是采用的两个表的形式,过滤表中显示查询的Input,Select条件输组件,表头显示的是数据表的表头,渲染的数据是传入的columns中的filter字段
       * 数据表隐藏表头,只显示数据,渲染的数据是传入的columns中的key值
       */

      //将传入的列描述数据对象(columns) 的title和width 复制给 过滤表的列描述数据对象(tableColumnsFilters)
      this.$set(filter, "title", this.columns[index].title);
      // this.$set(filter, "sortable", true);
      if (this.columns[index].width) {
        this.$set(filter, "width", this.columns[index].width);
      }

      let render = h => {};

      if (this.columns[index].filter) {
        if (
          this.columns[index].filter.type &&
          this.columns[index].filter.type === "Select"
        ) {
          render = h => {
            return h(
              this.columns[index].filter.type,
              {
                props: {
                  value: -1 //处理select切换为默认值是不触发change事件 无法正确load问题
                },
                on: {
                  "on-change": val => {
                    if (val === 0) {
                      //当选项是全部的时候删除 search中该字段的过滤条件
                      this.$delete(this.search, this.columns[index].key);
                    } else {
                      //添加字段过滤条件
                      this.$set(this.search, this.columns[index].key, val);
                    }
                    this.load(); //重载
                  }
                }
              },
              this.createOptionsRender(index, h)
            );
          };
        } else {
          //如果是输入框
          render = h => {
            let inputValue = {};
            return h(this.columns[index].filter.type, {
              props: {
                placeholder: "输入" + this.columns[index].title,
                icon: "ios-search-strong"
              },
              on: {
                input: val => {
                  inputValue = val;
                  if (!inputValue) {
                    this.validInputValue(index, inputValue);
                  }
                },
                "on-click": () => {
                  this.validInputValue(index, inputValue);
                },
                "on-enter": () => {
                  this.validInputValue(index, inputValue);
                }
              }
            });
          };
        }
      }
      this.$set(filter, "render", render);
      this.tableColumnsFilters.push(filter);
    }
  },
  methods: {
    createOptionsRender(index, h) {
      let optionRender = [];
      if (this.columns[index].filter.option) {
        let option = this.columns[index].filter.option;
        for (let i in option) {
          optionRender.push(
            h(
              "Option",
              {
                props: {
                  value: option[i].value
                }
              },
              option[i].name
            )
          );
        }
      }
      return optionRender;
    },
    //重新加载数据
    load() {
      this.$emit("load");
    },
    validInputValue(index, inputValue) {
      if (!inputValue) {
        this.$delete(this.search, this.columns[index].key);
        this.load();
        return;
      }
      this.$set(this.search, this.columns[index].key, inputValue);
      this.load();
    }
  }
};
</script>

<style scoped>
</style>
