<template>
  <div>
    <filter-table @load="loadData"
                  :data="users"
                  :columns="tableColumns"
                  :loading="loading"
                  :search="search">
    </filter-table>
  </div>
</template>

<script>
import FilterTable from "./FilterTable";

const userStatus = {
  0: {
    value: 0,
    name: "全部"
  },
  1: {
    value: 1,
    name: "已锁定",
    color: "#c31820"
  },
  2: {
    value: 2,
    name: "正常",
    color: "green"
  }
};

const users = [
  {
    username: "sunway1",
    phone: "17760172601",
    email: "miaokey@126.com",
    money: "50",
    status: "1"
  },
  {
    username: "sunway2",
    phone: "17760172602",
    email: "miaokey@126.com",
    money: "50",
    status: "2"
  },
  {
    username: "sunway3",
    phone: "17761232603",
    email: "miaokey@126.com",
    money: "20",
    status: "2"
  },
  {
    username: "sunway4",
    phone: "17722226014",
    email: "miaokey@126.com",
    money: "20",
    status: "1"
  },
  {
    username: "sunway5",
    phone: "17760202605",
    email: "miaokey@126.com",
    money: "20",
    status: "1"
  },
  {
    username: "sunway7",
    phone: "17760172607",
    email: "miaokey@126.com",
    money: "50",
    status: "1"
  },
  {
    username: "sunway8",
    phone: "17760172608",
    email: "miaokey@126.com",
    money: "20",
    status: "1"
  },
  {
    username: "sunway9",
    phone: "17760172609",
    email: "miaokey@126.com",
    money: "50",
    status: "1"
  }
];

export default {
  name: "HelloWorld",
  components: { FilterTable },

  data() {
    return {
      search: {},
      users: [],
      loading: false,
      tableColumns: [
        {
          title: "用户名",
          key: "username",
          filter: {
            type: "Input"
          }
        },
        {
          title: "手机号",
          sortable: true,
          key: "phone",
          filter: {
            type: "Input"
          }
        },
        {
          title: "邮箱",
          key: "email",
          filter: {
            type: "Input"
          }
        },
        {
          title: "账户余额 (元)",
          key: "money",
          filter: {
            type: "Input"
          }
        },
        {
          title: "状态",
          key: "status",
          filter: {
            type: "Select",
            option: userStatus
          },
          render: (h, params) => {
            return h(
              "Tag",
              {
                slot: "context",
                props: {
                  color: this.formatStatus(params.row.status, userStatus).color
                }
              },
              this.formatStatus(params.row.status, userStatus).name
            );
          }
        }
      ]
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    formatStatus(value, status) {
      return status[value] || { value: "", name: "" };
    },
    loadData() {
      this.loading = true;
      this.users = users;
      if (this.search != undefined) {
        for (let k in this.search) {
          this.users = this.users.filter((v, i) => {
            return this.users[i][k] == this.search[k];
          });
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
</style>
