<template>
    <div class="EstadosCuentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="EstadosCuentas__options rounded-3 py-2">
                    <div class="table-responsive">
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
                            <tbody
                                v-for="(estadoCuenta, index) in EstadoCuentas"
                                :key="index"
                            >
                                <tr v-if="generalSearch(estadoCuenta)">
                                    <td>
                                        <div>
                                            {{
                                                estadoCuenta.created_at
                                                    ? arreglarCadena(
                                                          estadoCuenta.created_at
                                                      )
                                                    : estadoCuenta.Fecha
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{
                                                estadoCuenta.Tipo
                                                    ? estadoCuenta.Tipo
                                                    : "Venta del día"
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            :class="
                                                estadoCuenta.Monto
                                                    ? 'text-danger'
                                                    : ''
                                            "
                                        >
                                            {{
                                                estadoCuenta.Monto
                                                    ? estadoCuenta.Monto
                                                    : estadoCuenta.venta
                                            }}
                                            <samp class="text-dark"
                                                >&nbspCOP</samp
                                            >
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{
                                                estadoCuenta.Referencia
                                                    ? estadoCuenta.Referencia
                                                    : ""
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{
                                                estadoCuenta.Salida
                                                    ? estadoCuenta.Salida
                                                    : ""
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{
                                                estadoCuenta.user
                                                    ? estadoCuenta.user.name
                                                    : ""
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
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getEstadoCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/estadoDeCuenta`,
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
                    this.EstadoCuentas = [
                        ...resData["Modelo Reporte"],
                        ...resData["ventaDiaria"],
                    ];
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
        generalSearch(estadoCuenta) {
            const Created_at = estadoCuenta.created_at
                ? this.arreglarCadena(estadoCuenta.created_at).includes(
                      this.toSearch
                  )
                : false;
            const Tipo = estadoCuenta.Tipo
                ? estadoCuenta.Tipo.toLowerCase().includes(this.toSearch)
                : false;
            const Valorapuesta = estadoCuenta.Valorapuesta
                ? estadoCuenta.Valorapuesta.toString().includes(this.toSearch)
                : false;
            const Monto = estadoCuenta.Monto
                ? estadoCuenta.Monto.toString().includes(this.toSearch)
                : false;
            const Referencia = estadoCuenta.Referencia
                ? estadoCuenta.Referencia.toLowerCase().includes(this.toSearch)
                : false;
            const Salida = estadoCuenta.Salida
                ? estadoCuenta.Salida.toLowerCase().includes(this.toSearch)
                : false;
            const user = estadoCuenta.user
                ? estadoCuenta.user.name.toLowerCase().includes(this.toSearch)
                : false;

            if (
                Created_at ||
                Tipo ||
                Valorapuesta ||
                Monto ||
                Referencia ||
                Salida ||
                user
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
