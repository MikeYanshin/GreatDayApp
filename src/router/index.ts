import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CalendarPage from "@/pages/CalendarPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { transition: "slide-left" },
    component: CalendarPage,
  },
  {
    path: "/auth",
    name: "auth",
    meta: { transition: "slide-left" },
    component: LoginPage,
  },
  {
    path: "/create-task/:type",
    name: "create-task",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/CreateTaskPage.vue"),
  },
  {
    path: "/task/:type/:id",
    name: "task-page",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/TaskPage.vue"),
  },
  {
    path: "/reminders",
    name: "reminders",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/RemindersPage.vue"),
  },
  {
    path: "/reminders/:type",
    name: "remind-list",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/RemindersListPage.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/SettingsPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { transition: "slide-left" },
    component: () => import("@/pages/ProfilePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// children: [
// {
//   path: ":id",
//   name: "new-employees:lpage",
//   component: () => import("@pages/employees/page/EmployeesPage.vue"),
//   meta: {
//     checkAccess: () => read(Rules.General.Employees),
//   },
// },
// ],
