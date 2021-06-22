<template>
    <div class="Metricas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Metricas__numeros d-flex flex-column border border-dark rounded-3 m-1 py-2"
                >
                    <div class="my-2"><h4>Números Bloqueados</h4></div>
                    <div
                        v-for="(numero, index) in NumerosBloqueados"
                        :key="index"
                        class="Metricas__numeros-numero d-flex justify-content-between my-1 px-2 py-1"
                    >
                        <p class="fw-bolder m-0">
                            {{ numero.Numero }}
                        </p>
                        <div>
                            <button
                                v-if="numero.Estado != 0"
                                @click="blockNumero(numero)"
                                class="btn"
                            >
                                <img
                                    src="../../assets/img/icons/check-square-solid.svg"
                                    alt=""
                                />
                            </button>
                            <button
                                v-else
                                @click="desBlockNumero(numero)"
                                class="btn"
                            >
                                <img
                                    src="../../assets/img/icons/trash-solid.svg"
                                    alt=""
                                />
                            </button>
                        </div>
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
                                Agregar
                            </th>
                            <th class="border border-5 ">Más vendidos</th>
                            <th class="border border-5 ">Valor a apostar</th>
                            <th class="border border-5 ">Lotería</th>
                            <th class="border border-5 ">Tipo</th>
                            <th class="border border-5 border-end-0 ">
                                Vendedor
                            </th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(metrica, index) in Metricas"
                                :key="index"
                            >
                                <td
                                    @click="addNumero(metrica)"
                                    class="border border-5 border-start-0 "
                                >
                                    <button class="btn">
                                        <img
                                            src="../../assets/img/icons/plus-solid.svg"
                                            alt=""
                                        />
                                    </button>
                                </td>
                                <td class="border border-5 border-start-0 ">
                                    {{ metrica.Numero }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.Valorapuesta }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.Loteria }}
                                </td>
                                <td class="border border-5 ">
                                    {{ metrica.Tipo }}
                                </td>
                                <td class="border border-5 border-end-0">
                                    {{ metrica.Nombrepromotor }}
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
import { mapState } from "vuex";

export default {
    name: "Metricas",
    data() {
        return {
            newNumero: "",
            Metricas: [],
            NumerosBloqueados: [],
            NumerosRepetidos: [],
        };
    },
    methods: {
        async getMetricas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/metricas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.Metricas = resData["Data completa del Modelo"];
                this.NumerosBloqueados =
                    resData["Numeros de loteria bloqueados"];
                this.NumerosRepetidos =
                    resData["Numeros de loteria mas repetidos"];
            } catch (error) {
                console.log(error);
            }
        },
        addNumero(data) {
            this.NumerosBloqueados.push(data);
            this.Metricas.splice(this.Metricas.indexOf(data), 1);
        },
        async blockNumero(data) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/bloquearNumero/${data.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.NumerosBloqueados[
                    this.NumerosBloqueados.indexOf(data)
                ].Estado = 0;
            } catch (error) {
                console.log(error);
            }
        },
        async desBlockNumero(data) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/desbloquearNumero/${data.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.NumerosBloqueados.splice(
                    this.NumerosBloqueados.indexOf(data),
                    1
                );
                this.Metricas.unshift(data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getMetricas();
    },
};
</script>

<style lang="scss" scoped>
.Metricas__numeros-numero,
.Metricas__Info {
    background: var(--bs-dark) !important;
}
</style>
