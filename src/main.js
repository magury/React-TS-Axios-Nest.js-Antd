/*
 * @Description:
 * @Version: 2.0
 * @Author: Seven
 * @Date: 2023-11-06 21:49:04
 * @LastEditors: Seven
 * @LastEditTime: 2023-11-06 21:54:25
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

// 引入初始化样式文件
import "@/styles/common.scss";
// 引入全局组件插件

const app = createApp(App);
const pinia = createPinia();
// 注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.mount("#app");
