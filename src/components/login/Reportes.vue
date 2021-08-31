<template>
    <div class="Reportes">
        <div class="row">
            <div
                v-if="rol !== 'promotor'"
                class="col-12 col-md-5 col-lg-4 my-2 my-md-0"
            >
                <Finanzas :key="componentKey" />
            </div>
            <div v-else class="col-12 col-md-5 col-lg-4 my-2 my-md-0"></div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="Reportes__options rounded-3 m-1 py-2">
                    <form @submit.prevent="sendReporte(reporte)">
                        <label>
                            Seleccione
                            <div>
                                {{ tipos[reporte.Tipo - 1] }}
                                <select
                                    v-model="reporte.Tipo"
                                    name="tipo"
                                    class="triangulo-bottom"
                                    required
                                >
                                    <option
                                        v-for="(tipo, index) in tipos"
                                        :key="index"
                                        :value="index + 1"
                                    >
                                        {{ tipo }}
                                    </option>
                                </select>
                            </div>
                        </label>

                        <label v-if="reporte.Tipo === 2">
                            Seleccione empleado
                            <div>
                                {{ reporte.user_pago.name }}
                                <select
                                    v-model="reporte.user_pago"
                                    name="empleado"
                                    class="triangulo-bottom"
                                    required
                                    @change="mutarMonto(reporte.user_pago)"
                                >
                                    <option
                                        v-for="(empleado, index) in empleados"
                                        :key="index"
                                        :value="empleado"
                                    >
                                        {{ empleado.name }}
                                    </option>
                                </select>
                            </div>
                        </label>
                        <label v-if="reporte.Tipo !== 2">
                            Escriba el monto
                            <input
                                v-model="reporte.Monto"
                                type="number"
                                min="0"
                                required
                            />
                        </label>
                        <label v-if="reporte.Tipo === 2">
                            Editar el monto
                            <input
                                v-model="reporte.Monto"
                                type="number"
                                min="0"
                                :required="
                                    !reporte.Monto && !reporte.MontoCredito
                                "
                            />
                        </label>
                        <label v-if="reporte.Tipo === 2">
                            Pago credito
                            <input
                                v-model="reporte.MontoCredito"
                                type="number"
                                min="0"
                                :required="
                                    !reporte.Monto && !reporte.MontoCredito
                                "
                            />
                        </label>
                        <label v-if="reporte.Tipo !== 2">
                            Descripción
                            <input
                                v-model="reporte.Descripcion"
                                type="text"
                                required
                            />
                        </label>
                        <label>
                            Seleccione salida
                            <div>
                                {{ reporte.Salida }}
                                <select
                                    v-model="reporte.Salida"
                                    name="salida"
                                    class="triangulo-bottom"
                                    required
                                >
                                    <option
                                        v-for="(salida, index) in salidas"
                                        :key="index"
                                    >
                                        {{ salida }}
                                    </option>
                                </select>
                            </div>
                        </label>
                        <button
                            type="submit"
                            class="btn btn-light btn-outline-dark btn-sm rounded-pill border-0 mb-2"
                        >
                            ENVIAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "Reportes",
    components: { Finanzas },
    data() {
        return {
            reporte: {
                Tipo: "",
                Monto: "",
                MontoCredito: "",
                Descripcion: "",
                user_pago: "",
                Salida: "",
            },
            tipos: ["Gasto", "Pago", "Premio"],
            salidas: ["Acumulado", "Caja"],
            empleados: [],
            componentKey: 0,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),
        mutarMonto(monto) {
            if (monto.balance > 0) {
                this.reporte.Monto = monto.balance;
            } else {
                this.reporte.Monto = 0;
            }

            if (monto.user_credito > 0) {
                this.reporte.MontoCredito = monto.user_credito;
            } else {
                this.reporte.MontoCredito = 0;
            }
        },
        async getEmpleados() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/vendedores/general`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.empleados = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async getVendedores() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/vendedores/promotor`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.empleados = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        clearInput() {
            this.reporte = {
                Tipo: "",
                Monto: "",
                MontoCredito: "",
                Descripcion: "",
                user_pago: "",
                Salida: "",
            };
        },
        async sendReporte(reporte) {
            const formData = new FormData();

            if (reporte.user_pago) {
                formData.append("user_pago", reporte.user_pago.id);
                if (reporte.Monto) {
                    formData.append("Monto", reporte.Monto);
                } else {
                    formData.append("Monto", 0);
                }

                if (reporte.MontoCredito) {
                    formData.append("MontoCredito", reporte.MontoCredito);
                } else {
                    formData.append("MontoCredito", 0);
                }
            } else {
                formData.append("Descripcion", reporte.Descripcion);
                formData.append("Monto", reporte.Monto);
            }
            formData.append("Tipo", reporte.Tipo);
            formData.append("Salida", reporte.Salida);

            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/reportes`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: formData,
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else if (resData == "No puedes cancelar mas de la cuenta") {
                    alert(resData);
                } else if (
                    resData == "No puedes cancelar mas de la cuenta del credito"
                ) {
                    alert(resData);
                } else {
                    this.componentKey += 1;
                    this.clearInput();
                    if (reporte.Tipo === 1) {
                        alert("Reporte de gasto enviado");
                    } else if (reporte.Tipo === 2) {
                        alert("Reporte de pago enviado");
                    } else {
                        alert("Reporte de premio enviado");
                    }
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
        if (this.rol === "administrador") {
            this.getEmpleados();
        } else {
            this.getVendedores();
        }
    },
};
</script>

<style lang="scss" scoped>
.Reportes {
    .Reportes__options {
        background: var(--bs-dark);
        label {
            margin: 1.5rem 0;
            padding: 0rem 0.5rem;
            display: flex;
            justify-content: space-between;
            background: var(--bs-light);
            div {
                display: flex;
                select {
                    background: transparent;
                    appearance: none;
                    outline: none;
                }
            }
            input {
                background: var(--bs-light);
            }
        }
    }
}
</style>
