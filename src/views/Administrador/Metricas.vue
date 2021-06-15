<template>
    <div class="Metricas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Metricas__numeros d-flex flex-column border border-dark rounded-3 m-1 py-2"
                >
                    <div class="my-2"><h4>Números Bloqueados</h4></div>
                    <div
                        class="Metricas__numeros-numero d-flex justify-content-between my-1 px-2 py-1"
                    >
                        <p class="fw-bolder m-0">555</p>
                        <div>
                            <button class="btn">
                                <img
                                    src="../../assets/img/icons/check-square-solid.svg"
                                    alt=""
                                />
                            </button>
                            <button class="btn">
                                <img
                                    src="../../assets/img/icons/trash-solid.svg"
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around mt-4 mb-2">
                        <button
                            class="btn btn-light border border-dark rounded-pill"
                        >
                            Agregar +
                        </button>
                        <button
                            class="btn btn-light border border-dark rounded-pill"
                        >
                            GUARDAR
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Metricas__Info table-responsive rounded-3 m-1 py-2">
                    <table
                        class="table table-hover table-borderless align-middle"
                    >
                        <thead>
                            <th class="border border-5 border-start-0 ">
                                Más vendidos
                            </th>
                            <th class="border border-5 ">Valor a apostar</th>
                            <th class="border border-5 ">Lotería</th>
                            <th class="border border-5 ">Tipo</th>
                            <th class="border border-5 border-end-0 ">
                                Vendedor
                            </th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(metrica, index) in metricas"
                                :key="index"
                            >
                                <td class="border border-5 border-start-0 ">
                                    {{ metrica.vendido }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.valor }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.loteria }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.tipo }}
                                </td>
                                <td class="border border-5 border-end-0">
                                    {{ metrica.vendedor }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Metricas",
    data() {
        return {
            metricas: [
                {
                    vendido: "datos",
                    valor: "datos",
                    loteria: "datos",
                    tipo: "datos",
                    vendedor: "datos",
                },
                {
                    vendido: "datos",
                    valor: "datos",
                    loteria: "datos",
                    tipo: "datos",
                    vendedor: "datos",
                },
                {
                    vendido: "datos",
                    valor: "datos",
                    loteria: "datos",
                    tipo: "datos",
                    vendedor: "datos",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.Metricas__numeros-numero,
.Metricas__Info {
    background: var(--bs-dark) !important;
}
</style>
