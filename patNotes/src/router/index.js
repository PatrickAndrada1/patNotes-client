import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    { path: "/:pathMatch(.*)*", name: "PageNotFound", component: PageNotFound },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

router.beforeEach(async (to, from) => {
  if (!localStorage.access_token && to.name === "Home") {
    return { name: "Login" };
  } else if (
    (localStorage.access_token && to.name === "Login") ||
    (localStorage.access_token && to.name === "Register")
  ) {
    return { name: "Home" };
  }
});

export default router;
