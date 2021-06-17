import { createStore, storeKey } from "vuex";

export default createStore({
    state: {
        prefix: "http://192.168.0.111:8000",

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

        token: null,
        pass: null,
        message: null,
        loginRoutes: null,
        dataUsers: null,
    },
    mutations: {
        setDataHome(state, dataHome) {
            state.dataResultados = dataHome["Datos tipo 1: Resultados"];
            state.dataSorteos = dataHome["Datos tipo 2: Sorteos"];
            state.dataUbicanos = dataHome["Datos tipo 3: Ubicanos"];
            state.dataTestimonios = dataHome["Datos tipo 4: Testimonios"];
        },

        setToken(state, token) {
            state.token = token;
        },
        setPass(state, pass) {
            state.pass = pass;
        },
        setMessage(state, message) {
            state.message = message;
        },

        setDataUsers(state, dataUsers) {
            state.dataUsers = dataUsers;
        },
        setLoginRoutes(state, rol) {
            if (rol === "Administrador") {
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
            } else if (rol === "Promotor") {
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
            } else if (rol === "Vendedor") {
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
    },
    actions: {
        async getDataHome({ commit }) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async contactanos({ commit }, contacto) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async recoveryPass({ commit }, forgetPass) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async login({ commit }, usuario) {
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
                const rol = resData.usuario.roles[0].name;

                localStorage.setItem("token", token);
                localStorage.setItem("rol", rol);

                commit("setToken", token);
                commit("setLoginRoutes", rol);

                window.location += "login";
            } catch (error) {
                console.log(error);
            }
        },
        readToken({ commit }) {
            const token = localStorage.getItem("token");
            const rol = localStorage.getItem("rol");
            if (token && rol) {
                commit("setToken", token);
                commit("setLoginRoutes", rol);
            } else {
                commit("setToken", null);
                commit("setLoginRoutes", null);
            }
        },
        logout({ commit }) {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");

            commit("setToken", null);
            commit("setLoginRoutes", null);

            window.location = window.location.origin;
        },

        /* CONSULTAS ADMINISTRADOR */
        async sendReporte({ commit }, reporte) {
            console.log(reporte);
            // try {
            //     const res = await fetch(`${this.state.prefix}/api/customize`, {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     });
            //     const resData = await res.json();
            //     commit("setDataHome", resData);
            // } catch (error) {
            //     console.log(error);
            // }
        },
        async sendGaleria({ commit }, galeria) {
            console.log(galeria);
            // try {
            //     const res = await fetch(`${this.state.prefix}/api/customize`, {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     });
            //     const resData = await res.json();
            //     commit("setDataHome", resData);
            // } catch (error) {
            //     console.log(error);
            // }
        },
    },
    modules: {},
});
