import { createStore, storeKey } from "vuex";

import router from "../router";

export default createStore({
    state: {
        preloader: false,

        prefix: "http://pumab.neuron.com.co/public",
        // prefix: "http://127.0.0.1:8000",
        // prefix: "http://192.168.0.106:8000",

        /* DATOS PARA EL HOME */
        dataResultados: null,
        dataSorteos: null,
        dataUbicanos: null,
        dataTestimonios: null,
        socialMedia: [
            {
                titulo: "Instagram",
                url: "https://www.instagram.com/",
                img: "/img/instagram-brands.e75317fa.svg",
            },
            {
                titulo: "Facebook",
                url: "https://www.facebook.com/",
                img: "/img/facebook-square-brands.34e73505.svg",
            },
            {
                titulo: "Whatsapp",
                url: "https://wa.me/584247469327",
                img: "/img/whatsapp-brands.a8812701.svg",
            },
        ],

        /* DATOS PARA EL LOGIN */
        token: null,
        rol: null,
        loginRoutes: null,

        pass: null,
        message: null,
    },
    mutations: {
        setPreloader(state, show) {
            state.preloader = show;
        },

        setDataHome(state, dataHome) {
            state.dataResultados = dataHome["Datos tipo 1: Resultados"];
            state.dataSorteos = dataHome["Datos tipo 2: Sorteos"];
            state.dataUbicanos = dataHome["Datos tipo 3: Ubicanos"];
            state.dataTestimonios = dataHome["Datos tipo 4: Testimonios"];
        },

        setToken(state, token) {
            state.token = token;
        },
        setRol(state, rol) {
            state.rol = rol;
        },
        setLoginRoutes(state, rol) {
            if (rol === "administrador") {
                state.loginRoutes = {
                    rutas: [
                        "perfil",
                        "reportar-gastos",
                        "resumen-de-ventas",
                        "promotores-y-vendedores",
                        "solicitudes",
                        "galerias",
                        "estado-de-cuenta",
                        "metricas",
                    ],
                    userRol: rol,
                };
            } else if (rol === "promotor") {
                state.loginRoutes = {
                    rutas: [
                        "perfil",
                        "reportar-ventas",
                        "resumen-de-ventas",
                        "vendedores",
                        "solicitudes",
                        "estado-de-cuenta",
                    ],
                    userRol: rol,
                };
            } else if (rol === "vendedor") {
                state.loginRoutes = {
                    rutas: [
                        "perfil",
                        "reportar-ventas",
                        "solicitudes",
                        "estado-de-cuenta",
                    ],
                    userRol: rol,
                };
            } else {
                state.loginRoutes = {
                    rutas: [],
                    userRol: null,
                };
            }
        },

        setPass(state, pass) {
            state.pass = pass;
        },
        setMessage(state, message) {
            state.message = message;
        },
    },
    actions: {
        showPreloader({ commit }, show) {
            commit("setPreloader", show);
        },
        async getDataHome({ commit }) {
            commit("setPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/HomeCustomize`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                commit("setDataHome", resData);
                commit("setPreloader", false);
            } catch (error) {
                console.log(error);
                commit("setPreloader", false);
            }
        },
        // FIXME aun no se ha probado
        async contactanos({ commit }, contacto) {
            commit("setPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/contactanos`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contacto),
                    }
                );
                const resData = await res.json();
                commit("setMessage", resData);
                commit("setPreloader", false);
            } catch (error) {
                console.log(error);
                commit("setPreloader", false);
            }
        },
        // FIXME aun no se ha probado
        async recoveryPass({ commit }, forgetPass) {
            commit("setPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/recoveryPass`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(forgetPass),
                    }
                );
                const resData = await res.json();
                commit("setPass", resData);
                commit("setPreloader", false);
            } catch (error) {
                console.log(error);
                commit("setPreloader", false);
            }
        },
        async login({ commit }, usuario) {
            commit("setPreloader", true);
            try {
                const res = await fetch(`${this.state.prefix}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(usuario),
                });
                const resData = await res.json();
                const token = resData.token;
                const rol = resData.usuario.roles[0].name.toLowerCase();

                localStorage.setItem("token", token);
                localStorage.setItem("rol", rol);

                commit("setToken", token);
                commit("setRol", rol);
                commit("setLoginRoutes", rol);
                router.push("/login");
                commit("setPreloader", false);
            } catch (error) {
                console.log(error);
                commit("setPreloader", false);
            }
        },
        readToken({ commit }) {
            const token = localStorage.getItem("token");
            const rol = localStorage.getItem("rol");
            if (token && rol) {
                commit("setToken", token);
                commit("setRol", rol);
                commit("setLoginRoutes", rol);
                router.push("/login");
            } else {
                commit("setToken", null);
                commit("setRol", null);
                commit("setLoginRoutes", null);
            }
        },
        logout({ commit }) {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");

            commit("setToken", null);
            commit("setRol", null);
            commit("setLoginRoutes", null);

            router.push("/");
        },
    },
    modules: {},
});
