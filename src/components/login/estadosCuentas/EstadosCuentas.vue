<template>
    <div class="EstadosCuentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8 p-0 py-2">
                <div
                    class="EstadosCuentas__options table-responsive rounded-3 m-1 py-2"
                >
                    <table
                        class="table table-borderless table-hover align-middle"
                    >
                        <thead>
                            <th><div>Fecha</div></th>
                            <th><div>Transacción</div></th>
                            <th><div>Monto</div></th>
                            <th><div>Referencia</div></th>
                            <th><div>Salida</div></th>
                            <th><div>Encargado</div></th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(estadoCuenta,
                                index) in EstadoCuentasReporte"
                                :key="index"
                            >
                                <td>
                                    <div>
                                        {{
                                            arreglarCadena(
                                                estadoCuenta.created_at
                                            )
                                        }}
                                    </div>
                                </td>
                                <td>
                                    <div>{{ estadoCuenta.Transaccion }}</div>
                                </td>
                                <td>
                                    <div>{{ estadoCuenta.Monto }} COP</div>
                                </td>
                                <td>
                                    <div>{{ estadoCuenta.Referencia }}</div>
                                </td>
                                <td>
                                    <div>{{ estadoCuenta.Tipo }}</div>
                                </td>
                                <td>
                                    <div>
                                        {{
                                            EstadoCuentasVentas[index]
                                                .Nombrepromotor
                                        }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            EstadoCuentasReporte: [],
            EstadoCuentasVentas: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getEstadoCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/estadoDeCuenta`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Autorization: `bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.text();
                console.log(resData);
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.EstadoCuentasReporte = resData["Modelo Reporte"];
                    this.EstadoCuentasVentas = resData["Modelo Ventas"];
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
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getEstadoCuentas();
    },
};
</script>

<style lang="scss" scoped>
.EstadosCuentas__options {
    background: var(--bs-dark);
    table {
        th,
        td {
            border: 0.5rem solid transparent;
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
            border-left: none;
        }
        th:last-child,
        td:last-child {
            border-right: none;
        }
    }
}
</style>
