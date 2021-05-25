import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin",
      name: "ADMIN_HOME",
      component: () => import("@/pages/admin/home.vue"),
      children: [
        {
          path: "question",
          name: "ADMIN_QUESTION",
          component: () => import("@/pages/admin/question/question_list.vue"),
        },
        {
          path: "question/add",
          name: "ADMIN_QUESTION_ADD",
          component: () => import("@/pages/admin/question/question_add.vue"),
        },
        {
          path: "question/:id",
          name: "ADMIN_QUESTION_DETAIL",
          component: () => import("@/pages/admin/question/question_detail.vue"),
        },
        {
          path: "testpaper",
          name: "ADMIN_testpaper",
          component: () => import("@/pages/admin/testpaper/testpaper_list.vue"),
        },
        {
          path: "testpaper/add",
          name: "ADMIN_TESTPAPER_ADD",
          component: () => import("@/pages/admin/testpaper/testpaper_add.vue"),
        },
        {
          path: "testpaper/:id",
          name: "ADMIN_TESTPAPER_DETAIL",
          component: () => import("@/pages/admin/testpaper/testpaper_detail.vue"),
        },
        {
          path: "competition",
          name: "ADMIN_COMPETITION",
          component: () => import("@/pages/admin/competition/competition_list.vue"),
        },
        {
          path: "competition/add",
          name: "ADMIN_COMPETITION_ADD",
          component: () => import("@/pages/admin/competition/competition_add.vue"),
        },
        {
          path: "competition/:id",
          name: "ADMIN_COMPETITION_DETAIL",
          component: () => import("@/pages/admin/competition/competition_detail.vue"),
        },
        {
          path: "setting",
          name: "ADMIN_SETTING",
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

export default router;
