import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/mainpage/mainpage.vue";
import Img2Pdf from "../views/reversion/img2pdf.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/img2pdf",
    name: "Img2Pdf",
    component: Img2Pdf,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
