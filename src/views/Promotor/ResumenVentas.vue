<template>
    <div class="ResumenVentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div class="d-flex justify-content-center m-1 py-1">
                    <table>
                        <tbody class="text-start">
                            <tr>
                                <td>Ventas del día</td>
                                <td class="px-2">
                                    {{ EstadoCuenta["Ventas del dia"] }} cop
                                </td>
                            </tr>
                            <tr>
                                <td>Ventas del mes</td>
                                <td class="px-2">
                                    {{ EstadoCuenta["Ventas del mes"] }} cop
                                </td>
                            </tr>
                            <tr>
                                <td>Acumulado</td>
                                <td class="px-2">
                                    {{ EstadoCuenta["Ventas totales"] }} cop
                                </td>
                            </tr>
                            <tr>
                                <td>Premios</td>
                                <td class="px-2">cop</td>
                            </tr>
                            <tr>
                                <td>Gastos</td>
                                <td class="px-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="ResumenVentas__options rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Fecha</div></th>
                                <th><div>Número</div></th>
                                <th><div>Valor a aportar</div></th>
                                <th><div>Lotería</div></th>
                                <th><div>Tipo</div></th>
                                <th><div>Vendedor</div></th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(venta, index) in EstadoCuentaVentas"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            {{
                                                arreglarCadena(venta.created_at)
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.Numero }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>{{ venta.Monto }} COP</div>
                                    </td>
                                    <td>
                                        <div>{{ venta.Loteria }}</div>
                                    </td>
                                    <td>
                                        <div>{{ venta.Tipo }}</div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ venta.Nombrepromotor }}
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

export default {
    name: "ResumenVentas",
    data() {
        return {
            EstadoCuenta: [],
            EstadoCuentaVentas: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getEstadoCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/resumenDeVentas`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.EstadoCuenta = resData;
                    this.EstadoCuentaVentas =
                        resData["Datos y ventas del promotor"].ventas;
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
.ResumenVentas__options {
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
