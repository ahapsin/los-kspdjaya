import { createRouter, createWebHistory } from "vue-router";
// slice

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import("../views/pages/LoginPage.vue"),
  },
  {
    path: "/test-view",
    name: "testview",
    component: () => import("../views/pages/TestView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/pages/DashboardPage.vue"),
  },
  {
    path: "/transaction",
    name: "transaction",
    component: () => import("../views/pages/DashboardPage.vue"),
    children: [
      {
        path: "cash-in",
        name: "penerimaan uang",
        component: () => import("../views/pages/transaction/cashInPage.vue"),
      },
    ],
  },
  {
    path: "/task",
    name: "task",
    component: () => import("../views/pages/DashboardPage.vue"),
    children: [
      {
        path: "apply-credit",
        name: "Pengajuan Kredit",
        component: () => import("../views/pages/task/FpkPage.vue"),
      },
      {
        path: "apply-credit/:idapplication",
        name: "Form Pengajuan Kredit",
        component: () => import("../views/pages/task/AddFpkPage.vue"),
      },
      {
        path: "approve-fpk/:idapplication",
        name: "Konfirmasi Pengajuan Kredit",
        component: () => import("../views/pages/task/ConfFpkPage.vue"),
      },
      {
        path: "nego-fpk/:idapplication",
        name: "Nego Pengajuan Kredit",
        component: () => import("../views/pages/task/NegoFpkPage.vue"),
      },
      {
        path: "approve-fpk/:idapplication",
        name: "Konfirmasi HO Pengajuan Kredit",
        component: () => import("../views/pages/task/ConfHOFpkPage.vue"),
      },
      {
        path: "detail-fpk/:idapplication",
        name: "Detail Pengajuan Kredit",
        component: () => import("../views/pages/task/DetailFpkPage.vue"),
      },
      {
        path: "preprint-pk/:idapplication",
        name: "pre print pk",
        component: () => import("../views/pages/task/PrePrintPKPage.vue"),
      },
      {
        path: "survey",
        name: "survey",
        component: () => import("../views/pages/task/SurveyPage.vue"),
      },
      {
        path: "edit-survey/:idsurvey",
        name: "detail survey",
        component: () => import("../views/pages/task/DetailSurveyPage.vue"),
      },
      {
        path: "survey/:idsurvey",
        name: "edit survey",
        component: () => import("../views/pages/task/EditSurveyPage.vue"),
      },
      {
        path: "Approval",
        name: "Approval",
        component: () => import("../views/pages/task/ApprovalPage.vue"),
      },
      {
        path: "approval_ho",
        name: "Approval HO",
        component: () => import("../views/pages/task/ApprovalHOPage.vue"),
      },
      {
        path: "new-survey",
        name: "tambah survey",
        component: () => import("../views/pages/task/AddSurveyPage.vue"),
      },
    ],
  },
  {
    path: "/master",
    name: "master",
    component: () => import("../views/pages/DashboardPage.vue"),
    children: [
      {
        path: "admin_fee",
        name: "Biaya Admin",
        component: () => import("../views/pages/master/CalculatorPage.vue"),
      },
      {
        path: "taksasi",
        name: "Taksasi",
        component: () => import("../views/pages/master/TaksasiPage.vue"),
      },
      {
        path: "taksasi-action",
        name: "Taksasi baru",
        component: () => import("../views/pages/master/ActionTaksasiPage.vue"),
      },
      {
        path: "employees",
        name: "karyawan",
        component: () => import("../views/pages/master/EmployeesPage.vue"),
      },
      {
        path: "employee-action",
        name: "karyawan baru",
        component: () => import("../views/pages/master/ActionEmployeePage.vue"),
      },
      {
        path: "users",
        name: "pengguna",
        component: () => import("../views/pages/master/UsersPage.vue"),
      },
      {
        path: "users-action",
        name: "pengguna baru",
        component: () => import("../views/pages/master/ActionUsersPage.vue"),
      },
      {
        path: "users-action/:iduser",
        name: "update pengguna",
        component: () => import("../views/pages/master/ActionUsersPage.vue"),
      },
      {
        path: "users-action/:iduser/detail",
        name: "detail pengguna",
        component: () => import("../views/pages/master/ActionUsersPage.vue"),
      },
      {
        path: "users-menu/:iduser",
        name: "menu pengguna",
        component: () => import("../views/pages/master/MenuUserPage.vue"),
      },
      {
        path: "employee-action/:idemployee",
        name: "update karyawan",
        component: () => import("../views/pages/master/ActionEmployeePage.vue"),
      },
      {
        path: "employee-action/:idemployee/detail",
        name: "detail karyawan",
        component: () => import("../views/pages/master/ActionEmployeePage.vue"),
      },
      {
        path: "branch",
        name: "cabang",
        component: () => import("../views/pages/master/BranchPage.vue"),
      },
      {
        path: "branch-action",
        name: "cabang baru",
        component: () => import("../views/pages/master/ActionBranchPage.vue"),
      },
      {
        path: "branch-action/:idbranch",
        name: "update cabang",
        component: () => import("../views/pages/master/ActionBranchPage.vue"),
      },
      {
        path: "branch-action/:idbranch/detail",
        name: "detail cabang",
        component: () => import("../views/pages/master/ActionBranchPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
