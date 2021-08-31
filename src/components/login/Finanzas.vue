<template>
    <div class="Finanzas">
        <div class="d-flex justify-content-center py-2">
            <table>
                <tbody class="text-start">
                    <tr>
                        <td>Ventas del día</td>
                        <td class="px-2">
                            {{ Finanzas.AcumuladoDeVentasDelDia }} cop
                        </td>
                    </tr>
                    <tr>
                        <td>Ventas del mes</td>
                        <td class="px-2">
                            {{ Finanzas.AcumuladoDeVentasDelMes }} cop
                        </td>
                    </tr>
                    <tr>
                        <td>Acumulado</td>
                        <td class="px-2">
                            {{ Finanzas.AcumuladoDelMontoDeAcumulado }} cop
                        </td>
                    </tr>
                    <tr>
                        <td>Premios</td>
                        <td class="px-2">
                            {{ Finanzas.AcumuladoDelMontoDePremios }} cop
                        </td>
                    </tr>
                    <tr>
                        <td>Gastos</td>
                        <td class="px-2">
                            {{ Finanzas.AcumuladoDelMontoDeGastos }} cop
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Finanzas",
    data() {
        return {
            Finanzas: {},
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getFinanzas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/finanzas`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Finanzas = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getFinanzas();
    },
};
</script>
