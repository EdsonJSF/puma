import { createStore, storeKey } from "vuex";

import router from "../router";

export default createStore({
    state: {
        preloader: false,

        prefix: "https://neuron.com.co/pumab/public",

        /* DATOS PARA EL HOME */
        dataResultados: null,
        dataSorteos: null,
        dataUbicanos: null,
        dataTestimonios: null,
        dataSlider: null,
        dataVideo: null,

        pass: null,
        message: null,

        /* DATOS PARA EL LOGIN */
        token: null,
        rol: null,
        loginRoutes: null,
        toSearch: "",
        MisSolicitudes: [],
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
            state.dataSlider = dataHome["Datos tipo 5: Slider"];
            state.dataVideo = dataHome["Datos tipo 6: Video"];
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
                        "crear-sorteos",
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
                        "reportar-gastos",
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

        setSolicitud(state, solicitudes) {
            state.MisSolicitudes = [];
            solicitudes.map((solicitud) => {
                state.MisSolicitudes.push(solicitud);
            });
        },

        setSearch(state, search) {
            state.toSearch = search;
        },
    },
    actions: {
        showPreloader({ commit }, show) {
            commit("setPreloader", show);
        },
        async getDataHome({ dispatch, commit }) {
            dispatch("showPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/api/HomeCustomize`,
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
            dispatch("showPreloader", false);
        },
        async contactanos({ dispatch, commit }, contacto) {
            dispatch("showPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/api/contactanos`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contacto),
                    }
                );
                const resData = await res.text();

                commit("setMessage", resData);

                dispatch("showPreloader", false);

                return true;
            } catch (error) {
                console.log(error);
                dispatch("showPreloader", false);
            }
        },
        async recoveryPass({ dispatch, commit }, forgetPass) {
            const formData = new FormData();

            formData.append("correo_contacto", forgetPass.email);

            dispatch("showPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/api/mailRecovery`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const resData = await res.json();

                commit("setPass", resData);

                dispatch("showPreloader", false);

                return true;
            } catch (error) {
                console.log(error);
                dispatch("showPreloader", false);
            }
        },
        async login({ dispatch, commit }, usuario) {
            dispatch("showPreloader", true);
            try {
                const res = await fetch(`${this.state.prefix}/api/api/login`, {
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

                dispatch("showPreloader", false);

                router.push(`/${rol}/perfil`);

                return true;
            } catch (error) {
                console.log(error);
                dispatch("showPreloader", false);
            }
        },
        async getPerfil({ dispatch }) {
            dispatch("showPreloader", true);
            try {
                const res = await fetch(
                    `${this.state.prefix}/api/api/${this.state.rol}/perfil`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.state.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    dispatch("logout");
                } else {
                    dispatch("showPreloader", false);
                    return resData;
                }
            } catch (error) {
                console.log(error);
            }
            dispatch("showPreloader", false);
        },
        readToken({ commit }) {
            const token = localStorage.getItem("token");
            const rol = localStorage.getItem("rol");
            if (token && rol) {
                commit("setToken", token);
                commit("setRol", rol);
                commit("setLoginRoutes", rol);
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

        mutarSolicitud({ commit }, solicitud) {
            commit("setSolicitud", solicitud);
        },

        sendSearch({ commit }, search) {
            search = search.toLowerCase();
            commit("setSearch", search);
        },
    },
    modules: {},
});
