import { createRouter, createWebHistory } from "vue-router";
import store from "../vuex";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "LOGIN",
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/admin",
      name: "ADMIN_HOME",
      meta: {
        needLogin: true,
      },
      component: () => import("@/pages/admin/home.vue"),
      children: [
        {
          path: "question",
          name: "ADMIN_QUESTION",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/question/question_list.vue"),
        },
        {
          path: "question/add",
          name: "ADMIN_QUESTION_ADD",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/question/question_add.vue"),
        },
        {
          path: "question/:id",
          name: "ADMIN_QUESTION_DETAIL",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/question/question_detail.vue"),
        },
        {
          path: "testpaper",
          name: "ADMIN_TESTPAPER",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/testpaper/testpaper_list.vue"),
        },
        {
          path: "testpaper/add",
          name: "ADMIN_TESTPAPER_ADD",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/testpaper/testpaper_add.vue"),
        },
        {
          path: "testpaper/:id",
          name: "ADMIN_TESTPAPER_DETAIL",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/testpaper/testpaper_detail.vue"),
        },
        {
          path: "competition",
          name: "ADMIN_COMPETITION",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/competition/competition_list.vue"),
        },
        {
          path: "competition/add",
          name: "ADMIN_COMPETITION_ADD",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/competition/competition_add.vue"),
        },
        {
          path: "competition/:id",
          name: "ADMIN_COMPETITION_DETAIL",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/competition/competition_detail.vue"),
        },
        {
          path: "user/auth",
          name: "ADMIN_USER_AUTH",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/user/auth.vue"),
        },
        {
          path: "user/manager",
          name: "ADMIN_USER_MANAGER",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/user/manager.vue"),
        },
        {
          path: "statistics/question",
          name: "ADMIN_STATISTICS_QUESTION",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/statistics/question.vue"),
        },
        {
          path: "statistics/add",
          name: "ADMIN_STATISTICS_COMPETITION",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/statistics/competition.vue"),
        },
        {
          path: "statistics/:id",
          name: "ADMIN_STATISTICS_TESTPAPER",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/statistics/testpaper.vue"),
        },
        {
          path: "setting",
          name: "ADMIN_SETTING",
          meta: {
            needLogin: true,
          },
          component: () => import("@/pages/admin/setting/setting.vue"),
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
  store.commit('setRoute', {
    name: to.name,
    path: to.path
  })
  if(store.state.user == null && to.meta.needLogin && to.name != 'ADMIN_HOME') {
    router.push({name: 'LOGIN', query: {from: encodeURIComponent(to.path)}})
    return next();
  }
  next();
})

export default router;
