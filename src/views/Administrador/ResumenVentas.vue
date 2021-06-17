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
                                    v-for="(resumen, index) in ResumenVentas"
                                    :key="index"
                                >
                                    <td class="border border-5 border-start-0 ">
                                        {{ resumen.Fecha.replace(/-/g, "/") }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.Numero }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.Valorapuesta }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.Loteria }}
                                    </td>
                                    <td class="border border-5 ">
                                        {{ resumen.Tipo }}
                                    </td>
                                    <td class="border border-5 border-end-0 ">
                                        {{ resumen.Nombrepromotor }}
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
import { mapState } from "vuex";

import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "ResumenVentas",
    components: { Finanzas },
    data() {
        return {
            ResumenVentas: [],
        };
    },
    methods: {
        async getResumenVentas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/resumenventas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.ResumenVentas = resData;
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "prefix"]),
    },
    created() {
        this.getResumenVentas();
    },
};
</script>

<style lang="scss" scoped>
.rounded-3 {
    background: var(--bs-dark);
}
</style>
