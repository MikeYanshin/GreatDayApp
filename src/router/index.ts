import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CalendarView from "../views/CalendarView.vue";
import LoginView from "@/views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: CalendarView,
  },
  {
    path: "/auth",
    name: "auth",
    component: LoginView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/create-tast/:type",
    name: "create-task",
    meta: { transition: "slide-left" }, // TODO Добавить анимацию роута
    component: () => import("../views/AddTaskView.vue"),
    children: [
      // {
      //   path: ":id",
      //   name: "new-employees:lpage",
      //   component: () => import("@pages/employees/page/EmployeesPage.vue"),
      //   meta: {
      //     checkAccess: () => read(Rules.General.Employees),
      //   },
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
