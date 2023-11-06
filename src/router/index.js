/*
 * @Description:
 * @Version: 2.0
 * @Author: Seven
 * @Date: 2023-11-06 21:49:04
 * @LastEditors: Seven
 * @LastEditTime: 2023-11-06 21:49:38
 */
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
