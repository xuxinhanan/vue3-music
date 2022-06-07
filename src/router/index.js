import { createRouter, createWebHistory } from "vue-router";
import Recommend from "@/views/recommend";
import Search from "@/views/search";
import Singer from "@/views/singer";
import TopList from "@/views/top-list";
import SingerDetail from "@/views/singer-detail";

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
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
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
