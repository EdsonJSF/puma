import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },

    /***************************
     *** RUTAS ADMINISTRADOR ***
     **************************/
    {
        path: "/administrador/perfil",
        name: "PerfilAdmin",
        component: () => import("../views/Administrador/Perfil.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/estado-de-cuenta",
        name: "EstadoCuentaAdmin",
        component: () => import("../views/Administrador/EstadoCuenta.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/galerias",
        name: "GaleriasAdmin",
        component: () => import("../views/Administrador/Galerias.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/metricas",
        name: "MetricasAdmin",
        component: () => import("../views/Administrador/Metricas.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/promotores-y-vendedores",
        name: "PromotoresVendedoresAdmin",
        component: () =>
            import("../views/Administrador/PromotoresVendedores.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/reportar-gastos",
        name: "ReportarGastosAdmin",
        component: () => import("../views/Administrador/ReportarGastos.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/resumen-de-ventas",
        name: "ResumenVentasAdmin",
        component: () => import("../views/Administrador/ResumenVentas.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/solicitudes",
        name: "SolicitudesAdmin",
        component: () => import("../views/Administrador/Solicitudes.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/crear-sorteos",
        name: "SorteosAdmin",
        component: () => import("../views/Administrador/Sorteos.vue"),
        meta: { rutaProtegida: true },
    },

    /**********************
     *** RUTAS PROMOTOR ***
     *********************/
    {
        path: "/promotor/perfil",
        name: "PerfilProm",
        component: () => import("../views/Promotor/Perfil.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/estado-de-cuenta",
        name: "EstadoCuentaProm",
        component: () => import("../views/Promotor/EstadoCuenta.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/reportar-ventas",
        name: "ReportarVentasProm",
        component: () => import("../views/Promotor/ReportarVentas.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/resumen-de-ventas",
        name: "ResumenVentasProm",
        component: () => import("../views/Promotor/ResumenVentas.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/solicitudes",
        name: "SolicitudesProm",
        component: () => import("../views/Promotor/Solicitudes.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/vendedores",
        name: "VendedoresProm",
        component: () => import("../views/Promotor/Vendedores.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/mis-solicitudes",
        name: "MisSolicitudesProm",
        component: () => import("../views/Promotor/MisSolicitudes.vue"),
        meta: { rutaProtegida: true },
    },

    /**********************
     *** RUTAS VENDEDOR ***
     *********************/
    {
        path: "/vendedor/perfil",
        name: "PerfilVend",
        component: () => import("../views/Vendedor/Perfil.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/estado-de-cuenta",
        name: "EstadoCuentaVend",
        component: () => import("../views/Vendedor/EstadoCuenta.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/reportar-ventas",
        name: "ReportarVentasVend",
        component: () => import("../views/Vendedor/ReportarVentas.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/solicitudes",
        name: "SolicitudesVend",
        component: () => import("../views/Vendedor/Solicitudes.vue"),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/mis-solicitudes",
        name: "MisSolicitudesVend",
        component: () => import("../views/Vendedor/MisSolicitudes.vue"),
        meta: { rutaProtegida: true },
    },

    /*********************
     *** NOT FOUND 404 ***
     ********************/
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound404",
        component: () => import("../views/NotFound404.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const exitsProtec = to.matched.some((item) => item.meta.rutaProtegida);

    if (exitsProtec && !store.state.token && !store.state.rol) {
        next("/");
    } else {
        next();
    }
});

export default router;
