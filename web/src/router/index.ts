import { createRouter, createWebHistory } from "vue-router";
import http from "../libs/http";
import store from "../vuex";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "LOGIN",
      meta: {
        title: "登录",
      },
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/admin",
      name: "ADMIN_HOME",
      meta: {
        needLogin: true,
        title: "主页",
      },
      redirect: {
        name: 'ADMIN_QUESTION'
      },
      component: () => import("@/pages/admin/home.vue"),
      children: [
        {
          path: "question",
          name: "ADMIN_QUESTION",
          meta: {
            needLogin: true,
            title: "题目管理",
          },
          component: () => import("@/pages/admin/question/question_list.vue"),
        },
        {
          path: "question/add",
          name: "ADMIN_QUESTION_ADD",
          meta: {
            needLogin: true,
            title: "添加题目",
          },
          component: () => import("@/pages/admin/question/question_add.vue"),
        },
        {
          path: "question/edit",
          name: "ADMIN_QUESTION_EDIT",
          meta: {
            needLogin: true,
            title: "编辑题目",
          },
          component: () => import("@/pages/admin/question/question_add.vue"),
        },
        {
          path: "question/:id",
          name: "ADMIN_QUESTION_DETAIL",
          meta: {
            needLogin: true,
            title: "题目详情",
          },
          component: () => import("@/pages/admin/question/question_detail.vue"),
        },
        {
          path: "testpaper",
          name: "ADMIN_TESTPAPER",
          meta: {
            needLogin: true,
            title: "试卷管理",
          },
          component: () => import("@/pages/admin/testpaper/testpaper_list.vue"),
        },
        {
          path: "testpaper/add",
          name: "ADMIN_TESTPAPER_ADD",
          meta: {
            needLogin: true,
            title: "添加试卷",
          },
          component: () => import("@/pages/admin/testpaper/testpaper_add.vue"),
        },
        {
          path: "testpaper/edit",
          name: "ADMIN_TESTPAPER_EDIT",
          meta: {
            needLogin: true,
            title: "编辑试卷",
          },
          component: () => import("@/pages/admin/testpaper/testpaper_add.vue"),
        },
        {
          path: "testpaper/:id",
          name: "ADMIN_TESTPAPER_DETAIL",
          meta: {
            needLogin: true,
            title: "试卷详情",
          },
          component: () => import("@/pages/admin/testpaper/testpaper_detail.vue"),
        },
        {
          path: "exam",
          name: "ADMIN_EXAM",
          meta: {
            needLogin: true,
            title: "考试管理",
          },
          component: () => import("@/pages/admin/exam/exam_list.vue"),
        },
        {
          path: "exam/add",
          name: "ADMIN_EXAM_ADD",
          meta: {
            needLogin: true,
            title: "添加考试",
          },
          component: () => import("@/pages/admin/exam/exam_add.vue"),
        },
        {
          path: "exam/:id",
          name: "ADMIN_EXAM_DETAIL",
          meta: {
            needLogin: true,
            title: "考试详情",
          },
          component: () => import("@/pages/admin/exam/exam_detail.vue"),
        },
        {
          path: "user/auth",
          name: "ADMIN_USER_AUTH",
          meta: {
            needLogin: true,
            title: "权限管理",
          },
          component: () => import("@/pages/admin/user/auth.vue"),
        },
        {
          path: "user/manager",
          name: "ADMIN_USER_MANAGER",
          meta: {
            needLogin: true,
            title: "人员管理",
          },
          component: () => import("@/pages/admin/user/manager.vue"),
        },
        {
          path: "statistics/question",
          name: "ADMIN_STATISTICS_QUESTION",
          meta: {
            needLogin: true,
            title: "题目统计",
          },
          component: () => import("@/pages/admin/statistics/question.vue"),
        },
        {
          path: "statistics/add",
          name: "ADMIN_STATISTICS_EXAM",
          meta: {
            needLogin: true,
            title: "考试统计",
          },
          component: () => import("@/pages/admin/statistics/competition.vue"),
        },
        {
          path: "statistics/:id",
          name: "ADMIN_STATISTICS_TESTPAPER",
          meta: {
            needLogin: true,
            title: "试卷统计",
          },
          component: () => import("@/pages/admin/statistics/testpaper.vue"),
        },
        {
          path: "setting",
          name: "ADMIN_SETTING",
          meta: {
            needLogin: true,
            title: "个人中心",
          },
          component: () => import("@/pages/admin/setting/setting.vue"),
          children: [
            {
              path: "base",
              name: "ADMIN_SETTING_BASE",
              meta: {
                needLogin: true,
                title: "基本设置",
                tab: 1,
              },
              component: () => import("@/components/admin/setting/base.vue"),
            },
            {
              path: "password",
              name: "ADMIN_SETTING_PASSWORD",
              meta: {
                needLogin: true,
                title: "修改密码",
                tab: 2,
              },
              component: () => import("@/components/admin/setting/password.vue"),
            },
            {
              path: "message",
              name: "ADMIN_SETTING_MESSAGE",
              meta: {
                needLogin: true,
                title: "消息中心",
                tab: 3,
              },
              component: () => import("@/components/admin/setting/message.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/",
      name: "HOME",
      component: () => import("@/pages/home.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit("setRoute", {
    name: to.name,
    path: to.path,
  });
  if (store.state.user == null && to.meta.needLogin) {
    http.get("/profile", {}).then((res) => {
      store.commit("setUser", res.data);
      return next();
    });
  } else {
    return next();
  }
});

export default router;
