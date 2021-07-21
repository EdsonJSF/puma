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
                            <tbody
                                v-for="(empleado, indexEmp) in Solicitudes"
                                :key="indexEmp"
                            >
                                <tr
                                    v-for="(solicitud,
                                    indexsolicitud) in empleado.solicitudes"
                                    :key="indexsolicitud"
                                >
                                    <td>
                                        <div>
                                            {{ empleado.name }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ solicitud.CantidadSolicitada }}
                                            {{ solicitud.MobiliarioSolicitado }}
                                            {{ solicitud.Solicitud }}
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="solicitud.Tipo === 1">
                                            <button
                                                @click="
                                                    aprobSolicitudes(
                                                        solicitud,
                                                        indexEmp
                                                    )
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
                                                    negarSolicitudes(
                                                        solicitud,
                                                        indexEmp
                                                    )
                                                "
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/trash-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                        <div
                                            v-else-if="solicitud.Tipo === 0"
                                            class="bg-danger text-white"
                                        >
                                            Rechazada
                                        </div>
                                        <div
                                            v-else-if="solicitud.Tipo === 2"
                                            class="bg-success text-white"
                                        >
                                            Aprobada
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        @click.prevent="clearInput"
                        class="btn text-light align-self-end mx-5"
                    >
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
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getSolicitudes() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/SolicitudesAdministrador`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes = [
                        ...resData["Solicitudes de promotores"],
                        ...resData["Solicitudes de vendedores"],
                    ];
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async aprobSolicitudes(solicitud, indexEmp) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/modificarsolicitud/${solicitud.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes[indexEmp].solicitudes[
                        this.Solicitudes[indexEmp].solicitudes.indexOf(
                            solicitud
                        )
                    ].Tipo = 2;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async negarSolicitudes(solicitud, indexEmp) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/eliminarsolicitud/${solicitud.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes[indexEmp].solicitudes[
                        this.Solicitudes[indexEmp].solicitudes.indexOf(
                            solicitud
                        )
                    ].Tipo = 0;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getSolicitudes();
    },
};
</script>

<style lang="scss" scoped>
.Solicitudes__data {
    background: var(--bs-dark);
    table {
        td {
            border-top: 0.5rem solid transparent !important;
            border-bottom: 0.5rem solid transparent !important;
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
