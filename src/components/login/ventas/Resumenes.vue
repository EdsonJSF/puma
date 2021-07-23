<template>
    <div class="Resumenes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Resumenes__data rounded-3 py-2">
                    <div class="table-responsive">
                        <table class="table table-borderless align-middle">
                            <tbody>
                                <tr
                                    v-for="(empleado,
                                    indexEmp) in ResumenVentas"
                                    :key="indexEmp"
                                >
                                    <td colspan="">
                                        <table
                                            class="table table-borderless table-hover align-middle"
                                        >
                                            <thead>
                                                <th
                                                    v-if="empleado.rol_id === 3"
                                                >
                                                    Vendedor
                                                    {{ empleado.name }}
                                                </th>
                                                <th
                                                    v-else-if="
                                                        empleado.rol_id === 2
                                                    "
                                                >
                                                    Promotor
                                                    {{ empleado.name }}
                                                </th>
                                                <th v-else>
                                                    Administrador
                                                    {{ empleado.name }}
                                                </th>
                                            </thead>
                                            <thead>
                                                <th><div>Fecha</div></th>
                                                <th><div>Número</div></th>
                                                <th>
                                                    <div>Valor a aportar</div>
                                                </th>
                                                <th><div>Lotería</div></th>
                                                <th><div>Tipo</div></th>
                                                <th><div>Vendedor</div></th>
                                            </thead>
                                            <tbody
                                                v-for="(venta,
                                                indexVenta) in empleado.ventas"
                                                :key="indexVenta"
                                            >
                                                <tr
                                                    v-if="
                                                        generalSearch(
                                                            venta,
                                                            empleado
                                                        )
                                                    "
                                                >
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
                                                        <div>
                                                            {{
                                                                venta.Valorapuesta
                                                            }}
                                                        </div>
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
                                                            {{ empleado.name }}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.ResumenVentas = [
                        ...resData.resumenventasProm,
                        ...resData.resumenventasVend,
                    ];
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        generalSearch(element, empleado) {
            if (
                empleado.name.toLowerCase().includes(this.toSearch) ||
                element.Fecha.includes(this.toSearch) ||
                element.Tipo.toLowerCase().includes(this.toSearch) ||
                element.Numero.toString().includes(this.toSearch) ||
                element.Valorapuesta.toString().includes(this.toSearch) ||
                element.Loteria.toLowerCase().includes(this.toSearch)
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
