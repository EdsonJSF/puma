<template>
    <div class="ReportarVentas">
        <div class="ReportarVentas__data rounded-3">
            <form @submit.prevent="sendReporte(reporte)" class="row">
                <div class="ReportarVentas__data-input col-12 col-md-8">
                    <div class="table-responsive py-2">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Fecha</div></th>
                                <th><div>Número</div></th>
                                <th><div>Valor a apostar</div></th>
                                <th><div>Loteria</div></th>
                                <th><div>Tipo</div></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <input
                                                v-model="reporte.Fecha"
                                                class="bg-transparent w-100"
                                                type="date"
                                                placeholder="Fecha"
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input
                                                v-model="reporte.Numero"
                                                class="bg-transparent w-100"
                                                type="number"
                                                min="0"
                                                step="1"
                                                placeholder="Numero"
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input
                                                v-model="reporte.Valorapuesta"
                                                class="bg-transparent w-100"
                                                type="number"
                                                min="0"
                                                placeholder="Apuesta"
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ reporte.Loteria.Loteria }}
                                            <select
                                                v-model="reporte.Loteria"
                                                class="triangulo-bottom"
                                                required
                                            >
                                                <option
                                                    v-for="(loteria,
                                                    index) in loterias"
                                                    :key="index"
                                                    :value="loteria"
                                                    >{{
                                                        loteria.Loteria
                                                    }}</option
                                                >
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ reporte.Tipo }}
                                            <select
                                                v-model="reporte.Tipo"
                                                class="triangulo-bottom"
                                                required
                                            >
                                                <option
                                                    v-for="(tipo,
                                                    index) in tipos"
                                                    :key="index"
                                                    :value="tipo"
                                                    >{{ tipo }}</option
                                                >
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="ReportarVentas__data-total col-12 col-md-4">
                    <div
                        class="d-flex flex-column justify-content-between text-start py-2"
                    >
                        <div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Suma total de las ventas</h6>
                                <div>{{ total }}</div>
                            </div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Puntos de venta</h6>
                                <input
                                    v-model="reporte.Puntoventas"
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Punto de entrega de las ventas</h6>
                                <input
                                    v-model="reporte.Puntoentregaventas"
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Referencia</h6>
                                <input
                                    v-model="reporte.Referencia"
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div class="align-self-end">
                            <button
                                class="btn btn-sm btn-light btn-outline-dark rounded-pill me-4"
                                type="submit"
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <button
                @click="imprimir"
                class="btn btn-sm btn-dark btn-outline-light rounded-pill m-2"
            >
                IMPRIMIR
            </button>
            <button
                @click="limpiar"
                class="btn btn-sm btn-dark btn-outline-light rounded-pill m-2"
            >
                LIMPIAR
            </button>
        </div>
        <div class="ReportarVentas__Imprimir d-none">
            <div class="container">
                <Factura :ventas="facturaVentas" :data="facturaData" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Factura from "@/components/login/Factura.vue";

export default {
    name: "ReportarVentas",
    components: {
        Factura,
    },
    data() {
        return {
            reporte: {
                Fecha: "",
                Numero: "",
                Valorapuesta: "",
                Loteria: "",
                Tipo: "",
                Referencia: "",
                Puntoventas: "",
                Puntoentregaventas: "",
            },

            total: "",
            loterias: "",
            tipos: ["Directo", "Combinado"],

            facturaVentas: [],
            facturaData: {
                codigo: "",
                fecha: "",
                hora: "",
                total: 0,
            },
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        imprimir() {
            print();
        },
        limpiar() {
            this.facturaVentas = [];
            this.facturaData = {
                codigo: "",
                fecha: "",
                hora: "",
                total: 0,
            };
            this.clearInput();
        },

        async getLoterias() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/sorteos/general`,
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
                    this.loterias = resData;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async getPromotor() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/adicionalesVendedor`,
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
                    this.total = Number(resData.sumatotal);
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },

        clearInput() {
            this.reporte = {
                Fecha: "",
                Numero: "",
                Valorapuesta: "",
                Loteria: "",
                Tipo: "",
                Referencia: "",
                Puntoventas: "",
                Puntoentregaventas: "",
            };
        },
        arreglarString(string) {
            const date = {
                fecha: "",
                hora: "",
            };
            string = string.split("T");
            date.fecha = string[0]
                .split("-")
                .reverse()
                .join("/");
            date.hora = string[1].split(".")[0];
            return date;
        },
        async sendReporte(reporte) {
            const id = reporte.Loteria.id;
            const loteria = reporte.Loteria.Loteria;

            reporte.Loteria = id;
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/reportarVentaPromotor`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: JSON.stringify(reporte),
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                    this.showPreloader(false);
                } else {
                    const date = await this.arreglarString(
                        resData.ventas.created_at
                    );
                    reporte.Loteria = loteria;
                    this.facturaVentas.push(reporte);
                    this.facturaData.codigo = resData.Vendedor.codigo;
                    this.facturaData.fecha = date.fecha;
                    this.facturaData.hora = date.hora;
                    this.facturaData.total += Number(reporte.Valorapuesta);

                    this.total += Number(reporte.Valorapuesta);

                    this.clearInput();
                    this.showPreloader(false);
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
        this.getPromotor();
        this.getLoterias();
    },
};
</script>

<style lang="scss" scoped>
.ReportarVentas__data {
    background: var(--bs-dark);

    .ReportarVentas__data-input {
        table {
            th,
            td {
                border: 0.5rem solid transparent;
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
                border-left: none;
            }
            th:last-child,
            td:last-child {
                border-right: none;
            }
        }
    }

    .ReportarVentas__data-item {
        background: var(--bs-light);
    }
}
</style>
