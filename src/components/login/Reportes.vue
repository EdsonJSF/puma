<template>
    <div class="Reportes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Reportes__options rounded-3 m-1 py-1">
                    <form @submit.prevent="">
                        <label>
                            Seleccione
                            <div>
                                {{ reporte.tipo }}
                                <select
                                    v-model="reporte.tipo"
                                    name="tipo"
                                    class="triangulo-bottom"
                                    required
                                >
                                    <option
                                        v-for="(tipo, index) in tipos"
                                        :key="index"
                                    >
                                        {{ tipo }}
                                    </option>
                                </select>
                            </div>
                        </label>

                        <label v-if="reporte.tipo === 'Pago'">
                            Seleccione empleado
                            <div>
                                {{ reporte.empleado }}
                                <select
                                    v-model="reporte.empleado"
                                    name="empleado"
                                    class="triangulo-bottom"
                                    required
                                >
                                    <option
                                        v-for="(empleado, index) in empleados"
                                        :key="index"
                                    >
                                        {{ empleado }}
                                    </option>
                                </select>
                            </div>
                        </label>
                        <label v-if="reporte.tipo === 'Pago'">
                            Editar el monto
                            <input
                                v-model="reporte.monto"
                                type="number"
                                min="0"
                                required
                            />
                        </label>
                        <label v-if="reporte.tipo !== 'Pago'">
                            Escriba el monto
                            <input
                                v-model="reporte.monto"
                                type="number"
                                min="0"
                                required
                            />
                        </label>
                        <label v-if="reporte.tipo !== 'Pago'">
                            Descripción
                            <input
                                v-model="reporte.descripcion"
                                type="text"
                                required
                            />
                        </label>
                        <label>
                            Seleccione salida
                            <div>
                                {{ reporte.salida }}
                                <select
                                    v-model="reporte.salida"
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
                            class="btn btn-light rounded-pill mb-2"
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
import { mapState } from "vuex";

import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "Reportes",
    components: { Finanzas },
    data() {
        return {
            reporte: {
                tipo: "",
                monto: "",
                descripcion: "",
                empleado: "",
                salida: "",
            },
            tipos: ["Gasto", "Pago", "Premio"],
            salidas: ["Acumulado", "Caja"],
            empleados: ["Edson", "Italo", "Dilson"],
        };
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
                    appearance: none;
                    outline: none;
                    background: transparent;
                }
            }
            input {
                border: none;
                background: var(--bs-light);
            }
        }
        .btn {
            transition: all 0.7s ease;
            &:hover {
                background: var(--bs-secondary);
            }
        }
    }
}
</style>
