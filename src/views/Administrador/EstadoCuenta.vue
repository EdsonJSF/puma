<template>
    <div class="EstadoCuenta">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8 p-0 py-2">
                <div
                    class="EstadoCuenta__options table-responsive rounded-3 m-1 py-2"
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
                                v-for="(estadoCuenta, index) in estadoCuentas"
                                :key="index"
                            >
                                <td class="border border-5 border-start-0 ">
                                    {{ estadoCuenta.fecha }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.transaccion }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.monto }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.referencia }}
                                </td>
                                <td class="border border-5 ">
                                    {{ estadoCuenta.salida }}
                                </td>
                                <td class="border border-5 border-end-0 ">
                                    {{ estadoCuenta.encargado }}
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
import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "EstadoCuenta",
    components: { Finanzas },
    data() {
        return {
            estadoCuentas: [
                {
                    fecha: "datos",
                    transaccion: "datos",
                    monto: "datos",
                    referencia: "datos",
                    salida: "datos",
                    encargado: "datos",
                },
                {
                    fecha: "datos",
                    transaccion: "datos",
                    monto: "datos",
                    referencia: "datos",
                    salida: "datos",
                    encargado: "datos",
                },
                {
                    fecha: "datos",
                    transaccion: "datos",
                    monto: "datos",
                    referencia: "datos",
                    salida: "datos",
                    encargado: "datos",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.EstadoCuenta__options {
    background: var(--bs-dark);
}
</style>
