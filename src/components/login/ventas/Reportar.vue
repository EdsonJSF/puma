<template>
    <div class="Reportar rounded-3 m-2">
        <form @submit.prevent="sendReporte(reporte)" class="row">
            <div class="Reportar__data col-12 col-md-8">
                <div class="table-responsive m-1 p-2">
                    <table
                        class="table table-borderless table-hover align-middle"
                    >
                        <thead>
                            <th><div>Fecha</div></th>
                            <th><div>Número</div></th>
                            <th><div>Valor a apostar</div></th>
                            <th><div>Loteria</div></th>
                            <th><div>Tipo</div></th>
                            <th>
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
                            </th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(newReporte, index) in reportes"
                                :key="index"
                            >
                                <td>
                                    <div>
                                        <input
                                            v-model="reporte.datas[index].fecha"
                                            class="border-0 bg-transparent w-100"
                                            type="date"
                                            placeholder="fecha"
                                            required
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            v-model="
                                                reporte.datas[index].numero
                                            "
                                            class="border-0 bg-transparent w-100"
                                            type="number"
                                            min="0"
                                            step="1"
                                            placeholder="numero"
                                            required
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            v-model="
                                                reporte.datas[index].apuesta
                                            "
                                            class="border-0 bg-transparent w-100"
                                            type="text"
                                            placeholder="apuesta"
                                            required
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ reporte.datas[index].loteria }}
                                        <select
                                            v-model="
                                                reporte.datas[index].loteria
                                            "
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
                                        {{ reporte.datas[index].tipo }}
                                        <select
                                            v-model="reporte.datas[index].tipo"
                                            class="triangulo-bottom"
                                            required
                                        >
                                            <option value="Directo"
                                                >Directo</option
                                            >
                                            <option value="Conbinado"
                                                >Conbinado</option
                                            >
                                        </select>
                                    </div>
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="Reportar__total col-12 col-md-4">
                <div
                    class="d-flex flex-column justify-content-between align-items-center text-start m-1 p-2"
                >
                    <div>
                        <div class="Reportar__total-item m-1 p-2">
                            <h6>Suma total de las ventas</h6>
                            <input
                                v-model="reporte.data"
                                class="border-0 bg-transparent w-100"
                                type="text"
                                required
                            />
                        </div>
                        <div class="Reportar__total-item m-1 p-2">
                            <h6>Puntos de venta</h6>
                            <input
                                v-model="reporte.data"
                                class="border-0 bg-transparent w-100"
                                type="text"
                                required
                            />
                        </div>
                        <div class="Reportar__total-item m-1 p-2">
                            <h6>Nombre del Promotor</h6>
                            <input
                                v-model="reporte.data"
                                class="border-0 bg-transparent w-100"
                                type="text"
                                required
                            />
                        </div>
                        <div class="Reportar__total-item m-1 p-2">
                            <h6>Punto de entrega de las ventas</h6>
                            <input
                                v-model="reporte.data"
                                class="border-0 bg-transparent w-100"
                                type="text"
                                required
                            />
                        </div>
                    </div>
                    <div class="align-self-end">
                        <button
                            class="btn btn-light btn-outline-dark btn-sm rounded-pill border-0 me-4"
                            type="submit"
                        >
                            ENVIAR
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Reportar",
    data() {
        return {
            reporte: {
                datas: [
                    {
                        fecha: "",
                        numero: "",
                        apuesta: "",
                        loteria: "",
                        tipo: "",
                    },
                ],
                data: "",
            },
            reportes: 1,
            loterias: ["kino", "triple gordo", "no se cual"],
        };
    },
    methods: {
        sendReporte(reporte) {
            console.log(reporte);
        },
        pushReporte() {
            this.reportes++;
            this.reporte.datas.push({
                fecha: "",
                numero: "",
                apuesta: "",
                loteria: "",
                tipo: "",
            });
        },
        clearReportes(index) {
            this.reportes--;
            this.reporte.datas.splice(index, 1);
        },
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
