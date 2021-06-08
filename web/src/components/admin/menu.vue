<template>
  <div class="admin-menu">
    <div class="logo">
      <img
        class="img"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
        alt=""
      />
      <img src="@/assets/logo_fff.png" alt="" />
    </div>
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="ADMIN_QUESTION">
        <BarsOutlined />
        <span>题目管理</span>
        <router-link to="/admin/question">题目管理</router-link>
      </a-menu-item>
      <a-menu-item key="ADMIN_TESTPAPER">
        <FileTextOutlined />
        <span>套题管理</span>
        <router-link to="/admin/testpaper">套题管理</router-link>
      </a-menu-item>
      <a-menu-item key="ADMIN_EXAM">
        <TableOutlined />
        <span>考试管理</span>
        <router-link to="/admin/exam">竞赛管理</router-link>
      </a-menu-item>
      <a-sub-menu key="ADMIN_USER">
        <template #title>
          <span>
            <UsergroupDeleteOutlined />
            <span>人员管理</span>
          </span>
        </template>
        <a-menu-item key="ADMIN_USER_AUTH">
          <span>权限管理</span>
          <router-link to="/admin/user/auth">权限管理</router-link>
        </a-menu-item>
        <a-menu-item key="ADMIN_USER_MANAGER">
          <span>人员管理</span>
          <router-link to="/admin/user/manager">人员管理</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="ADMIN_STATISTICS">
        <template #title>
          <span>
            <AreaChartOutlined />
            <span>统计</span>
          </span>
        </template>
        <a-menu-item key="ADMIN_STATISTICS_QUESTION">
          <span>题目统计</span>
          <router-link to="/admin/statistics/question">题目统计</router-link>
        </a-menu-item>
        <a-menu-item key="ADMIN_STATISTICS_TESTPAPER">
          <span>套题统计</span>
          <router-link to="/admin/statistics/testpaper">套题统计</router-link>
        </a-menu-item>
        <a-menu-item key="ADMIN_STATISTICS_EXAM">
          <span>竞赛统计</span>
          <router-link to="/admin/statistics/exam">竞赛统计</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="ADMIN_SETTING">
        <SettingOutlined />
        <span>设置</span>
        <router-link to="/admin/setting/base">设置</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { BarsOutlined, SettingOutlined, ContainerOutlined, TableOutlined, UsergroupDeleteOutlined, AreaChartOutlined, FileTextOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import store from "../../vuex";
export default defineComponent({
  components: {
    BarsOutlined,
    SettingOutlined,
    ContainerOutlined,
    TableOutlined,
    UsergroupDeleteOutlined,
    AreaChartOutlined,
    FileTextOutlined
  },
  setup() {
    const selectedKeys = ref<string[]>(["ADMIN_QUESTION"]);
    const allKeys = ref<String[]>(["ADMIN_QUESTION", "ADMIN_TESTPAPER", "ADMIN_EXAM", "ADMIN_USER_AUTH", "ADMIN_USER_MANAGER", "ADMIN_STATISTICS_QUESTION", "ADMIN_STATISTICS_TESTPAPER", "ADMIN_STATISTICS_EXAM", "ADMIN_SETTING"]);
    onMounted(() => {
      if (store.state.route) {
        const route = store.state.route.name;
        if (allKeys.value.includes(route)) {
          selectedKeys.value = [route];
        } else {
          const nameArr = route.split("_");
          selectedKeys.value = [`${nameArr[0]}_${nameArr[1]}`];
        }
      }
    });
    const route = useRoute();
    watch(
      () => route.name,
      (key) => {
        if (allKeys.value.includes(String(key))) {
          selectedKeys.value = [String(key)];
        } else {
          const nameArr = String(key).split("_");
          selectedKeys.value = [`${nameArr[0]}_${nameArr[1]}`];
        }
      }
    );
    return {
      selectedKeys,
    };
  },
});
</script>

<style scoped>
.admin-menu .logo {
  height: 60px;
  width: 200px;
  background-color: #001529;
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.logo .img {
  display: block;
  width: 40px;
  height: 40px;
  animation: rotate 10s;
  animation-timing-function: linear;
  animation-direction: alternate;
}
</style>
