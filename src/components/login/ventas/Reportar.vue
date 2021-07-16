<template>
    <div class="Reportar">
        <div class="rounded-3">
            <form @submit.prevent="sendReporte(reporte)" class="row">
                <div class="Reportar__data col-12 col-md-8">
                    <div class="table-responsive my-1 py-2">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Fecha</div></th>
                                <th><div>Número</div></th>
                                <th><div>Valor a apostar</div></th>
                                <th><div>Loteria</div></th>
                                <th><div>Tipo</div></th>
                                <!-- <th>
                                    <div>
                                        <button
                                            @click.prevent="pushReporte()"
                                            class="btn btn-sm"
                                        >
                                            <img
                                                src="../../../assets/img/icons/plus-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </th> -->
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
                                            {{ reporte.Loteria }}
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
                                                    >{{ loteria }}</option
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
                                    <!-- <td>
                                        <div>
                                            <button
                                                @click.prevent="
                                                    clearReportes(index)
                                                "
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../../assets/img/icons/trash-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="Reportar__total col-12 col-md-4">
                    <div
                        class="d-flex flex-column justify-content-between text-start my-1 py-2"
                    >
                        <div>
                            <div class="Reportar__total-item my-1 p-2">
                                <h6>Suma total de las ventas</h6>
                                <div>{{ total }}</div>
                            </div>
                            <div class="Reportar__total-item my-1 p-2">
                                <h6>Puntos de venta</h6>
                                <input
                                    v-model="reporte.Puntoventas"
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="Reportar__total-item my-1 p-2">
                                <h6>Nombre del Promotor</h6>
                                <div>{{ promotor }}</div>
                            </div>
                            <div class="Reportar__total-item my-1 p-2">
                                <h6>Punto de entrega de las ventas</h6>
                                <input
                                    v-model="reporte.Puntoentregaventas"
                                    class="bg-transparent w-100"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="Reportar__total-item my-1 p-2">
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
                                class="btn btn-light btn-outline-dark btn-sm rounded-pill me-4"
                                type="submit"
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Reportar",
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
            promotor: "",

            tipos: ["Directo", "Combinado"],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getPromotor() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/adicionalesVendedor`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.total = resData.ventatotal;
                this.promotor = resData.promotor[0].name;

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },

        // pushReporte() {
        //     this.reportes++;
        //     this.reporte.push({
        //         Fecha: "",
        //         Numero: "",
        //         Valorapuesta: "",
        //         Loteria: "",
        //         Tipo: "",
        //         Referencia: "",
        //         Puntoventas: "",
        //         Puntoentregaventas: "",
        //     });
        // },

        // clearReportes(index) {
        //     this.reportes--;
        //     this.reporte.splice(index, 1);
        // },

        clearInput() {
            this.reporte = [
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
            this.reportes = 1;
        },

        async sendReporte(reporte) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/venta`,
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
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.total++;
                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix", "loterias"]),
    },
    created() {
        this.getPromotor();
    },
};
</script>

<style lang="scss" scoped>
.Reportar {
    background: var(--bs-dark);

    .Reportar__data {
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

    .Reportar__total-item {
        background: var(--bs-light);
    }
}
</style>
