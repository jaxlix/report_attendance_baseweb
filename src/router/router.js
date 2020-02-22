import Vue from "vue"
import Router from "vue-router"
import login from "@/views/Login"
import status from '@/views/status/status'
import statusSets from '@/views/statusSets/statusSets'
import deptStatusSets from '@/views/deptStatusSets/deptStatusSets'

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/status",
      name: "status",
      component: status
    },
    {
      path: "/statusSets",
      name: "statusSets",
      component: statusSets
    },{
      path: "/deptStatusSets",
      name: "deptStatusSets",
      component: deptStatusSets
    }
  ]
});
