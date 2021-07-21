<template>
    <div class="EstadosCuentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="EstadosCuentas__options row rounded-3 py-2">
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5 border-start-0"
                    >
                        Fecha
                    </div>
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5"
                    >
                        Transacción
                    </div>
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5"
                    >
                        Monto
                    </div>
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5"
                    >
                        Referencia
                    </div>
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5"
                    >
                        Salida
                    </div>
                    <div
                        class="EstadosCuentas__options-title col-2 border border-5 border-end-0"
                    >
                        Encargado
                    </div>
                    <div
                        v-for="(empleado, indexEmp) in EstadoCuentas"
                        :key="indexEmp"
                        class="col-12"
                    >
                        <div
                            v-for="(venta, indexVenta) in empleado.ventas"
                            :key="indexVenta"
                        >
                            <div
                                v-if="generalSearch(venta, empleado)"
                                class="row align-items-center"
                            >
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5 border-start-0"
                                >
                                    {{ venta.Fecha }}
                                </div>
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5"
                                >
                                    {{ venta.Tipo }}
                                </div>
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5"
                                >
                                    {{ venta.Valorapuesta }}
                                </div>
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5"
                                >
                                    {{ venta.Referencia }}
                                </div>
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5"
                                >
                                    {{ venta.Tipo }}
                                </div>
                                <div
                                    class="EstadosCuentas__options-item col-2 h-100 border border-5 border-end-0"
                                >
                                    {{ empleado.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-borderless align-middle">
                            <tbody>
                                <tr
                                    v-for="(empleado,
                                    indexEmp) in EstadoCuentas"
                                    :key="indexEmp"
                                >
                                    <td>
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
                                                <th><div>Transacción</div></th>
                                                <th><div>Monto</div></th>
                                                <th><div>Referencia</div></th>
                                                <th><div>Salida</div></th>
                                                <th><div>Encargado</div></th>
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
                                                            {{ venta.Tipo }}
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
                                                            {{
                                                                venta.Referencia
                                                            }}
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
    name: "EstadosCuentas",
    components: { Finanzas },
    data() {
        return {
            EstadoCuentas: [],
        };
    },
    methods: {
        ...mapActions([
            "logout",
            "showPreloader",
            "sendSearch",
            "generalSearch",
        ]),

        async getEstadoCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/resumenventas`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                console.log(resData);
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.EstadoCuentas = [
                        ...resData.resumenventasProm,
                        ...resData.resumenventasVend,
                    ];
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
        generalSearch(element, empleado) {
            if (
                empleado.name.toLowerCase().includes(this.toSearch) ||
                element.Fecha.includes(this.toSearch) ||
                element.Tipo.toLowerCase().includes(this.toSearch) ||
                element.Valorapuesta.toString().includes(this.toSearch) ||
                element.Referencia.toLowerCase().includes(this.toSearch)
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
        this.getEstadoCuentas();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.EstadosCuentas__options {
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
