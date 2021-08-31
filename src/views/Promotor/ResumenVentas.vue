<template>
    <div class="ResumenVentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <div class="d-flex justify-content-center py-2">
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
                                <td class="px-2">
                                    {{ EstadoCuenta.premios }} cop
                                </td>
                            </tr>
                            <tr>
                                <td>Gastos</td>
                                <td class="px-2">
                                    {{ EstadoCuenta.gastos }} cop
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="ResumenVentas__options rounded-3 py-2">
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
                                <th><div>Nombre</div></th>
                            </thead>
                            <tbody
                                v-for="(venta, index) in EstadoCuentaVentas"
                                :key="index"
                            >
                                <tr v-if="generalSearch(venta)">
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
                                        <div>
                                            {{ venta.Valorapuesta }}
                                            COP
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

export default {
    name: "ResumenVentas",
    data() {
        return {
            EstadoCuenta: [],
            EstadoCuentaVentas: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getEstadoCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/resumenDeVentas`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.EstadoCuenta = resData;
                    resData["Datos y ventas del promotor"].ventas.map(
                        (venta) => {
                            if (venta) {
                                venta.name =
                                    resData["Datos y ventas del promotor"].name;
                                this.EstadoCuentaVentas.push(venta);
                            }
                        }
                    );
                    resData["Datos de los vendedores"].map((vendedor) => {
                        vendedor.ventas.map((venta) => {
                            if (venta) {
                                venta.name = vendedor.name;
                                this.EstadoCuentaVentas.push(venta);
                            }
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        arreglarCadena(cadena) {
            let newCadena = cadena.split("T");
            return newCadena[0].replace(/-/g, "/");
        },
        generalSearch(venta) {
            const Created_at = this.arreglarCadena(venta.created_at);
            const Monto = venta.Valorapuesta
                ? venta.Valorapuesta.toString().includes(this.toSearch)
                : false;

            if (
                Created_at.toLowerCase().includes(this.toSearch) ||
                venta.name.toLowerCase().includes(this.toSearch) ||
                venta.Numero.toString().includes(this.toSearch) ||
                venta.Numero.toString()
                    .split("")
                    .sort()
                    .join("")
                    .includes(
                        this.toSearch
                            .split("")
                            .sort()
                            .join("")
                    ) ||
                Monto ||
                venta.Loteria.toLowerCase().includes(this.toSearch) ||
                venta.Tipo.toLowerCase().includes(this.toSearch)
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
.ResumenVentas__options {
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
