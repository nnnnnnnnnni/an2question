<template>
  <div class="menu">
    <div class="logo" />
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="ADMIN_QUESTION">
        <BarsOutlined />
        <span>题目管理</span>
        <router-link to="/admin/question">题目管理</router-link>
      </a-menu-item>
      <a-menu-item key="ADMIN_PAPER">
        <ContainerOutlined />
        <span>套题管理</span>
        <router-link to="/admin/testpaper">套题管理</router-link>
      </a-menu-item>
      <a-menu-item key="ADMIN_COMPETITION">
        <TableOutlined />
        <span>竞赛管理</span>
        <router-link to="/admin/competition">竞赛管理</router-link>
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
        <a-menu-item key="ADMIN_USER_manager">
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
        <a-menu-item key="ADMIN_CHART_PAPER">
          <span>套题统计</span>
          <router-link to="/admin/statistics/paper">套题统计</router-link>
        </a-menu-item>
        <a-menu-item key="ADMIN_CHART_COMPETITION">
          <span>竞赛统计</span>
          <router-link to="/admin/statistics/competition">竞赛统计</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="ADMIN_SETTING">
        <SettingOutlined />
        <span>设置</span>
        <router-link to="/admin/setting">设置</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { BarsOutlined, SettingOutlined, ContainerOutlined, TableOutlined, UsergroupDeleteOutlined, AreaChartOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    BarsOutlined,
    SettingOutlined,
    ContainerOutlined,
    TableOutlined,
    UsergroupDeleteOutlined,
    AreaChartOutlined,
  },
  setup() {
    const selectedKeys = ref<string[]>(["ADMIN_SETTING"]);
    return { selectedKeys };
  },
});
</script>

<style scoped>
.menu .logo {
  height: 60px;
  width: 200px;
  background-color: #001529;
}
</style>
