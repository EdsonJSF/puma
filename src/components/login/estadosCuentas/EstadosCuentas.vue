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
                        class="table table-hover table-borderless align-middle"
                    >
                        <thead>
                            <th class="border border-5 border-start-0 ">
                                Fecha
                            </th>
                            <th class="border border-5 ">Transacción</th>
                            <th class="border border-5 ">Monto</th>
                            <th class="border border-5 ">Referencia</th>
                            <th class="border border-5 ">Salida</th>
                            <th class="border border-5 border-end-0 ">
                                Encargado
                            </th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(estadoCuenta,
                                index) in EstadoCuentasReporte"
                                :key="index"
                            >
                                <td class="border border-5 border-start-0 ">
                                    {{
                                        arreglarCadena(estadoCuenta.created_at)
                                    }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.Transaccion }}
                                </td>
                                <td class="border border-5">
                                    {{ estadoCuenta.Monto }} COP
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.Referencia }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.Tipo }}
                                </td>
                                <td class="border border-5 border-end-0 ">
                                    {{
                                        EstadoCuentasVentas[index]
                                            .Nombrepromotor
                                    }}
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
import { mapState } from "vuex";

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
        async getEstadoCuentas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/estadoDeCuenta?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.EstadoCuentasReporte = resData["Modelo Reporte"];
                this.EstadoCuentasVentas = resData["Modelo Ventas"];
            } catch (error) {
                console.log(error);
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
}
</style>
