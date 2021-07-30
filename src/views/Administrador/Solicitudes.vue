<template>
    <div class="Solicitudes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Profile />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div
                    class="Solicitudes__data d-flex flex-column rounded-3 py-2"
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
                                v-for="(solicitud, index) in Solicitudes"
                                :key="index"
                            >
                                <tr v-if="generalSearch(solicitud)">
                                    <td>
                                        <div>
                                            {{ solicitud.name }}
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
                                                        index
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
                                                        index
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
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

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

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    resData["Solicitudes de promotores"].map((empleado) =>
                        empleado.solicitudes.map((solicitud) => {
                            solicitud.name = empleado.name;
                            this.Solicitudes.push(solicitud);
                        })
                    );
                    resData["Solicitudes de vendedores"].map((empleado) =>
                        empleado.solicitudes.map((solicitud) => {
                            solicitud.name = empleado.name;
                            this.Solicitudes.push(solicitud);
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
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

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes[indexEmp].Tipo = 2;
                    alert("Solicitud aprobada");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
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

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Solicitudes[indexEmp].Tipo = 0;
                    alert("Solicitud negada");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(solicitud) {
            const CantidadSolicitada = solicitud.CantidadSolicitada
                ? solicitud.CantidadSolicitada.toString().includes(
                      this.toSearch
                  )
                : false;
            const MobiliarioSolicitado = solicitud.MobiliarioSolicitado
                ? solicitud.MobiliarioSolicitado.toLowerCase().includes(
                      this.toSearch
                  )
                : false;
            const Solicitud = solicitud.Solicitud
                ? solicitud.Solicitud.toLowerCase().includes(this.toSearch)
                : false;
            if (
                solicitud.name.toLowerCase().includes(this.toSearch) ||
                // TODO habilita la busqueda para solicitudes por categoria
                // solicitud.Categoria.toLowerCase().includes(this.toSearch) ||
                CantidadSolicitada ||
                MobiliarioSolicitado ||
                Solicitud
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix", "toSearch"]),
    },
    created() {
        this.getSolicitudes();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Solicitudes__data {
    background: var(--bs-dark);
    .table-responsive {
        max-height: var(--max-height);
        overflow: auto;
    }
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
}
</style>
