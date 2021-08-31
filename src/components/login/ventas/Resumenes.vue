<template>
    <div class="Resumenes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="Resumenes__data rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Fecha</div></th>
                                <th><div>Número</div></th>
                                <th>
                                    <div>Valor a apostar</div>
                                </th>
                                <th><div>Lotería</div></th>
                                <th><div>Tipo</div></th>
                                <th><div>Vendedor</div></th>
                            </thead>
                            <tbody
                                v-for="(venta, index) in ResumenVentas"
                                :key="index"
                            >
                                <tr v-if="generalSearch(venta)">
                                    <td>
                                        <div>
                                            {{ venta.Fecha }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.Numero }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>{{ venta.Valorapuesta }} COP</div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.Loteria }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.Tipo }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.name }}
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

import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "Resumenes",
    components: { Finanzas },
    data() {
        return {
            ResumenVentas: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getResumenVentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/resumenventas`,
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
                    resData.resumenventasProm.map((promotor) => {
                        promotor.ventas.map((venta) => {
                            venta.name = promotor.name;
                            this.ResumenVentas.push(venta);
                        });
                    });
                    resData.resumenventasVend.map((vendedor) => {
                        vendedor.ventas.map((venta) => {
                            venta.name = vendedor.name;
                            this.ResumenVentas.push(venta);
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(element) {
            const Loteria = element.Loteria
                ? element.Loteria.toLowerCase().includes(this.toSearch)
                : false;

            if (
                element.name.toLowerCase().includes(this.toSearch) ||
                element.Fecha.includes(this.toSearch) ||
                element.Tipo.toLowerCase().includes(this.toSearch) ||
                element.Numero.toString().includes(this.toSearch) ||
                element.Numero.toString()
                    .split("")
                    .sort()
                    .join("")
                    .includes(
                        this.toSearch
                            .split("")
                            .sort()
                            .join("")
                    ) ||
                element.Valorapuesta.toString().includes(this.toSearch) ||
                Loteria
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
        this.getResumenVentas();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Resumenes__data {
    background: var(--bs-dark);
    .table-responsive {
        max-height: var(--max-height);
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
                white-space: nowrap;
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
