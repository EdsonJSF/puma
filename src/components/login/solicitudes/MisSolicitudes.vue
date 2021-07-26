<template>
    <div class="MisSolicitudes">
        <div class="MisSolicitudes__options rounded-3 py-2">
            <div class="table-responsive">
                <table class="table table-borderless table-hover align-middle">
                    <thead>
                        <th><div>Fecha</div></th>
                        <th><div>Solicitud</div></th>
                        <th><div>Estado</div></th>
                    </thead>
                    <tbody
                        v-for="(solicitud, index) in MisSolicitudes"
                        :key="index"
                    >
                        <tr v-if="generalSearch(solicitud)">
                            <td>
                                <div>
                                    {{ arreglarCadena(solicitud.created_at) }}
                                </div>
                            </td>
                            <td>
                                <div v-if="solicitud.CantidadSolicitada">
                                    {{ solicitud.CantidadSolicitada }} COP
                                </div>
                                <div v-if="solicitud.MobiliarioSolicitado">
                                    {{ solicitud.MobiliarioSolicitado }}
                                </div>
                                <div v-if="solicitud.Solicitud">
                                    {{ solicitud.Solicitud }}
                                </div>
                            </td>
                            <td>
                                <div v-if="solicitud.Tipo === 1">
                                    En espera
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
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "MisSolicitudes",
    data() {
        return {
            MisSolicitudes: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),
        async getMisSolicitudes() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/mostrarsolicitud`,
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
                    this.MisSolicitudes =
                        resData.solicitudes ||
                        resData["Solicitudes del promotor"];
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        arreglarCadena(cadena) {
            let newCadena = cadena.split("T");
            return newCadena[0].replace(/-/g, "/");
        },
        generalSearch(solicitud) {
            const Created_at = this.arreglarCadena(solicitud.created_at);
            const CantidadSolicitada = solicitud.CantidadSolicitada
                ? solicitud.CantidadSolicitada.toString().includes(
                      this.toSearch
                  )
                : false;
            const Cop = solicitud.CantidadSolicitada ? "cop" : false;
            const MobiliarioSolicitado = solicitud.MobiliarioSolicitado
                ? solicitud.MobiliarioSolicitado.toLowerCase().includes(
                      this.toSearch
                  )
                : false;
            const Solicitud = solicitud.Solicitud
                ? solicitud.Solicitud.toLowerCase().includes(this.toSearch)
                : false;
            if (
                Created_at.toLowerCase().includes(this.toSearch) ||
                // solicitud.Categoria.toLowerCase().includes(this.toSearch) ||
                CantidadSolicitada ||
                MobiliarioSolicitado ||
                Solicitud ||
                Cop === this.toSearch
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
        this.getMisSolicitudes();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.MisSolicitudes__options {
    background: var(--bs-dark);
    .table-responsive {
        max-height: 65vh;
        overflow: auto;
    }
    table {
        th,
        td {
            border: 0.5rem solid transparent !important;
            padding: 0;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 5px;
                min-height: 2rem;
                background: var(--bs-light);
                select {
                    background: transparent;
                    appearance: none;
                    outline: none;
                }
            }
        }
        th:first-child,
        td:first-child {
            border-left: none !important;
        }
        th:last-child,
        td:last-child {
            border-right: none !important;
        }
    }
}
</style>
