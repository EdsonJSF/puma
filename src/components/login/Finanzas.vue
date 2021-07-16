<template>
    <div class="Finanzas">
        <div class="d-flex justify-content-center m-1 py-1">
            <table>
                <tbody class="text-start">
                    <tr>
                        <td>Ventas del día</td>
                        <td>{{ Finanzas.AcumuladoDeVentasDelDia }} cop</td>
                    </tr>
                    <tr>
                        <td>Ventas del mes</td>
                        <td>{{ Finanzas.AcumuladoDeVentasDelMes }} cop</td>
                    </tr>
                    <tr>
                        <td>Acumulado</td>
                        <td>{{ Finanzas.AcumuladoDelMontoDeAcumulado }} cop</td>
                    </tr>
                    <tr>
                        <td>Premios</td>
                        <td>{{ Finanzas.AcumuladoDelMontoDePremios }} cop</td>
                    </tr>
                    <tr>
                        <td>Gastos</td>
                        <td>{{ Finanzas.AcumuladoDelMontoDeGastos }} cop</td>
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
                    `${this.prefix}/api/${this.rol}/finanzas?token=${this.token}`,
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
                    this.Finanzas = resData;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
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

<style lang="scss" scoped>
td {
    padding: 0.5rem;
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
}
</style>
