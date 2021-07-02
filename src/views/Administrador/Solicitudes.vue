<template>
    <div class="Solicitudes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Profile />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div
                    class="Solicitudes__data d-flex flex-column rounded-3 my-2 py-2"
                >
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th>Nombre Apellido</th>
                                <th>Solicita</th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(solicitud, index) in Solicitudes"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            {{ solicitud.Nombre }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ solicitud.MobiliarioSolicitado }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                @click="
                                                    aprobSolicitudes(solicitud)
                                                "
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/check-square-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                @click="
                                                    negarSolicitudes(solicitud)
                                                "
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/trash-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn text-light  align-self-end mx-5">
                        Agregar +
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Profile from "@/components/login/Profile.vue";

export default {
    name: "Solicitudes",
    components: { Profile },
    data() {
        return {
            Solicitudes: [],
            SolicitudesAceptadas: [],
            SolicitudesRechazadas: [],
        };
    },
    methods: {
        ...mapActions(["logout"]),

        async getSolicitudes() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/SolicitudesAdministrador?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes = resData;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getSolicitudesAceptadas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/solicitudesAceptadas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.SolicitudesAceptadas =
                        resData["Solicitudes Aceptadas"];
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getSolicitudesRechazadas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/solicitudesRechazadas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.SolicitudesRechazadas =
                        resData["Solicitudes Rechazadas"];
                }
            } catch (error) {
                console.log(error);
            }
        },
        async aprobSolicitudes(data) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modificarsolicitud/${data.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.SolicitudesAceptadas.unshift(data);
                    this.Solicitudes.splice(this.Solicitudes.indexOf(data), 1);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async negarSolicitudes(data) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/eliminarsolicitud/${data.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.SolicitudesRechazadas.unshift(data);
                    this.Solicitudes.splice(this.Solicitudes.indexOf(data), 1);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getSolicitudes();
        this.getSolicitudesAceptadas();
        this.getSolicitudesRechazadas();
    },
};
</script>

<style lang="scss" scoped>
.Solicitudes__data {
    background: var(--bs-dark);
    table {
        td {
            border-top: 0.5rem solid transparent;
            border-bottom: 0.5rem solid transparent;
            padding: 0;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 5px;
                min-height: 2rem;
                background: var(--bs-light);
                white-space: nowrap;
            }
        }
    }
    .text-light {
        text-shadow: 2px 2px 1.5px #222;
    }
}
</style>
