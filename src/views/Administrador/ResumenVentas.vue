<template>
    <div class="ResumenVentas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-hover table-borderless align-middle"
                        >
                            <thead>
                                <th class="border border-5 border-start-0 ">
                                    Fecha
                                </th>
                                <th class="border border-5 ">Número</th>
                                <th class="border border-5 ">
                                    Valor a aportar
                                </th>
                                <th class="border border-5 ">Lotería</th>
                                <th class="border border-5 ">Tipo</th>
                                <th class="border border-5 border-end-0 ">
                                    Vendedor
                                </th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(resumen, index) in resumenes"
                                    :key="index"
                                >
                                    <td class="border border-5 border-start-0 ">
                                        {{ resumen.fecha }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.numero }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.valor }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.loteria }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.tipo }}
                                    </td>
                                    <td class="border border-5 border-end-0 ">
                                        {{ resumen.vendedor }}
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
import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "ResumenVentas",
    components: { Finanzas },
    data() {
        return {
            resumenes: [
                {
                    fecha: "data",
                    numero: "data",
                    valor: "data",
                    loteria: "data",
                    tipo: "data",
                    vendedor: "data",
                },
                {
                    fecha: "data",
                    numero: "data",
                    valor: "data",
                    loteria: "data",
                    tipo: "data",
                    vendedor: "data",
                },
                {
                    fecha: "data",
                    numero: "data",
                    valor: "data",
                    loteria: "data",
                    tipo: "data",
                    vendedor: "data",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.rounded-3 {
    background: var(--bs-dark);
}
</style>
