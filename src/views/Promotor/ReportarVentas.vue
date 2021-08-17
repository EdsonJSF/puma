<template>
    <div class="ReportarVentas">
        <div class="ReportarVentas__data rounded-3">
            <form
                @submit.prevent="submitReporte(reportes[reportes.length - 1])"
                id="formulario"
                class="row"
            >
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
                                <tr
                                    v-for="(reporte, index) in reportes"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            <input
                                                v-model="reporte.Fecha"
                                                :disabled="
                                                    typeof reporte.Valorapuesta ===
                                                        'number' ||
                                                        typeof reporte.Numero ===
                                                            'number'
                                                "
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
                                                :class="
                                                    typeof reporte.Valorapuesta ===
                                                    'number'
                                                        ? 'text-danger'
                                                        : ''
                                                "
                                                :disabled="
                                                    typeof reporte.Numero ===
                                                        'number'
                                                "
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
                                                :disabled="
                                                    typeof reporte.Valorapuesta ===
                                                        'number' ||
                                                        typeof reporte.Numero ===
                                                            'number'
                                                "
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
                                                :disabled="
                                                    typeof reporte.Valorapuesta ===
                                                        'number' ||
                                                        typeof reporte.Numero ===
                                                            'number'
                                                "
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
                                                :disabled="
                                                    typeof reporte.Valorapuesta ===
                                                        'number' ||
                                                        typeof reporte.Numero ===
                                                            'number'
                                                "
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
                                    <td
                                        v-if="
                                            typeof reporte.Valorapuesta ===
                                                'number'
                                        "
                                    >
                                        <div>
                                            <button
                                                @click.prevent="
                                                    sendReporte(reporte)
                                                "
                                                class="btn btn-sm btn-danger"
                                            >
                                                REPARAR
                                            </button>
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
                                    v-model="
                                        reportes[reportes.length - 1]
                                            .Puntoventas
                                    "
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Punto de entrega de las ventas</h6>
                                <input
                                    v-model="
                                        reportes[reportes.length - 1]
                                            .Puntoentregaventas
                                    "
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="ReportarVentas__data-item my-1 p-2">
                                <h6>Referencia</h6>
                                <input
                                    v-model="
                                        reportes[reportes.length - 1].Referencia
                                    "
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div class="align-self-end">
                            <button
                                @click="setAgregar(true)"
                                class="btn btn-sm btn-light btn-outline-dark rounded-pill me-4"
                                type="submit"
                            >
                                Agregar +
                            </button>
                            <button
                                @click="setAgregar(false)"
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
                @click="limpiar"
                class="btn btn-sm btn-dark btn-outline-light rounded-pill m-2"
            >
                LIMPIAR
            </button>
            <button
                @click="imprimir"
                class="btn btn-sm btn-success btn-outline-light rounded-pill m-2"
            >
                IMPRIMIR FACTURA
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
            reportes: [
                {
                    Fecha: "",
                    Numero: "",
                    Valorapuesta: "",
                    Loteria: "",
                    Tipo: "",
                    Referencia: "",
                    Puntoventas: "",
                    Puntoentregaventas: "",
                },
            ],

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
            agregar: false,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        setAgregar(estado) {
            this.agregar = estado;
        },
        submitReporte(reporte) {
            if (this.agregar) {
                this.sendReporte(reporte);
                this.showPreloader(false);
                this.reportes.push({
                    Fecha: "",
                    Numero: "",
                    Valorapuesta: "",
                    Loteria: "",
                    Tipo: "",
                    Referencia: reporte.Referencia,
                    Puntoventas: reporte.Puntoventas,
                    Puntoentregaventas: reporte.Puntoentregaventas,
                });
            } else {
                this.sendReporte(reporte);
            }
        },
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

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.loterias = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
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

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.total = Number(resData.sumatotal);
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async arreglarString(string) {
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

        clearInput() {
            this.reportes = [
                {
                    Fecha: "",
                    Numero: "",
                    Valorapuesta: "",
                    Loteria: "",
                    Tipo: "",
                    Referencia: "",
                    Puntoventas: "",
                    Puntoentregaventas: "",
                },
            ];
        },
        async sendReporte(reporte) {
            this.showPreloader(true);

            const completo = reporte.Loteria;
            const id = reporte.Loteria.id;

            reporte.Valorapuesta = reporte.Valorapuesta.toString();
            reporte.Loteria = id;

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
                reporte.Loteria = completo;

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else if (resData === "Numero bloqueado") {
                    reporte.Valorapuesta = Number(reporte.Valorapuesta);
                    alert(`El numero: ${reporte.Numero} esta bloqueado !`);
                } else {
                    reporte.Numero = Number(reporte.Numero);

                    const date = await this.arreglarString(
                        resData.ventas.created_at
                    );

                    this.facturaVentas.push(resData.ventas);
                    this.facturaData.codigo = resData.Vendedor.codigo;
                    this.facturaData.fecha = date.fecha;
                    this.facturaData.hora = date.hora;
                    this.facturaData.total += Number(reporte.Valorapuesta);

                    this.total += Number(reporte.Valorapuesta);

                    if (!this.agregar) {
                        this.clearInput();
                        alert("Reporte enviado");
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
        this.getPromotor();
        this.getLoterias();
    },
};
</script>

<style lang="scss" scoped>
.ReportarVentas__data {
    background: var(--bs-dark);

    .ReportarVentas__data-input {
        .table-responsive {
            max-height: var(--max-height);
            overflow: auto;
        }
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
