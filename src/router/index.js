import { createRouter, createWebHistory } from "vue-router";
import Recommend from "@/views/recommend";
import Search from "@/views/search";
import Singer from "@/views/singer";
import TopList from "@/views/singer";

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/singer",
    component: Singer,
  },
  {
    path: "/top-list",
    component: TopList,
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
