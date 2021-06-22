import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
        meta: { rutaProtegida: true },
    },

    /* RUTAS ADMINISTRADOR */
    {
        path: "/administrador/perfil",
        name: "PerfilAdmin",
        component: () =>
            import(
                /* webpackChunkName: "Perfil" */ "../views/Administrador/Perfil.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/estado-de-cuenta",
        name: "EstadoCuentaAdmin",
        component: () =>
            import(
                /* webpackChunkName: "EstadoCuenta" */ "../views/Administrador/EstadoCuenta.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/galerias",
        name: "GaleriasAdmin",
        component: () =>
            import(
                /* webpackChunkName: "Galerias" */ "../views/Administrador/Galerias.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/metricas",
        name: "MetricasAdmin",
        component: () =>
            import(
                /* webpackChunkName: "Metricas" */ "../views/Administrador/Metricas.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/promotores-y-vendedores",
        name: "PromotoresVendedoresAdmin",
        component: () =>
            import(
                /* webpackChunkName: "PromotoresVendedores" */ "../views/Administrador/PromotoresVendedores.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/reportar-gastos",
        name: "ReportarGastosAdmin",
        component: () =>
            import(
                /* webpackChunkName: "ReportarGastos" */ "../views/Administrador/ReportarGastos.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/resumen-de-ventas",
        name: "ResumenVentasAdmin",
        component: () =>
            import(
                /* webpackChunkName: "ResumenVentas" */ "../views/Administrador/ResumenVentas.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/administrador/solicitudes",
        name: "SolicitudesAdmin",
        component: () =>
            import(
                /* webpackChunkName: "Solicitudes" */ "../views/Administrador/Solicitudes.vue"
            ),
        meta: { rutaProtegida: true },
    },

    /* RUTAS PROMOTOR */
    {
        path: "/promotor/perfil",
        name: "PerfilProm",
        component: () =>
            import(
                /* webpackChunkName: "Perfil" */ "../views/Promotor/Perfil.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/estado-de-cuenta",
        name: "EstadoCuentaProm",
        component: () =>
            import(
                /* webpackChunkName: "EstadoCuenta" */ "../views/Promotor/EstadoCuenta.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/reportar-ventas",
        name: "ReportarVentasProm",
        component: () =>
            import(
                /* webpackChunkName: "ReportarVentas" */ "../views/Promotor/ReportarVentas.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/resumen-de-ventas",
        name: "ResumenVentasProm",
        component: () =>
            import(
                /* webpackChunkName: "ResumenVentas" */ "../views/Promotor/ResumenVentas.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/solicitudes",
        name: "SolicitudesProm",
        component: () =>
            import(
                /* webpackChunkName: "Solicitudes" */ "../views/Promotor/Solicitudes.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/promotor/vendedores",
        name: "VendedoresProm",
        component: () =>
            import(
                /* webpackChunkName: "Vendedores" */ "../views/Promotor/Vendedores.vue"
            ),
        meta: { rutaProtegida: true },
    },

    /* RUTAS VENDEDOR */
    {
        path: "/vendedor/perfil",
        name: "PerfilVend",
        component: () =>
            import(
                /* webpackChunkName: "Perfil" */ "../views/Vendedor/Perfil.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/estado-de-cuenta",
        name: "EstadoCuentaVend",
        component: () =>
            import(
                /* webpackChunkName: "EstadoCuenta" */ "../views/Vendedor/EstadoCuenta.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/reportar-ventas",
        name: "ReportarVentasVend",
        component: () =>
            import(
                /* webpackChunkName: "ReportarVentas" */ "../views/Vendedor/ReportarVentas.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/vendedor/solicitudes",
        name: "SolicitudesVend",
        component: () =>
            import(
                /* webpackChunkName: "Solicitudes" */ "../views/Vendedor/Solicitudes.vue"
            ),
        meta: { rutaProtegida: true },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound404",
        component: () =>
            import(
                /* webpackChunkName: "Solicitudes" */ "../views/NotFound404.vue"
            ),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const exitsProtec = to.matched.some((item) => item.meta.rutaProtegida);

    if (exitsProtec && store.state.token === null) {
        next("/");
    } else {
        next();
    }
});

export default router;
