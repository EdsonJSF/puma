<template>
    <div class="Metricas">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Metricas__numeros d-flex flex-column border border-dark rounded-3 py-2"
                >
                    <div><h4>Números Bloqueados</h4></div>
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
                                class="btn btn-sm"
                            >
                                <img
                                    src="../../assets/img/icons/check-square-solid.svg"
                                    alt=""
                                />
                            </button>
                            <button
                                v-else
                                @click="desBlockNumero(numero)"
                                class="btn btn-sm"
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
                <div class="Metricas__Info rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Agregar</div></th>
                                <th><div>Más vendidos</div></th>
                                <th><div>Valor a apostar</div></th>
                                <th><div>Lotería</div></th>
                                <th><div>Tipo</div></th>
                            </thead>
                            <tbody
                                v-for="(metrica, index) in Metricas"
                                :key="index"
                            >
                                <tr v-if="generalSearch(metrica)">
                                    <td @click="addNumero(metrica)">
                                        <div>
                                            <button class="btn btn-sm">
                                                <img
                                                    src="../../assets/img/icons/plus-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{{ metrica.Numero }}</div>
                                    </td>
                                    <td>
                                        <div>{{ metrica.Valorapuesta }}</div>
                                    </td>
                                    <td>
                                        <div>{{ metrica.Loteria }}</div>
                                    </td>
                                    <td>
                                        <div>{{ metrica.Tipo }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

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
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getMetricas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/metricas`,
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
                    this.Metricas = resData["Data completa del Modelo"];
                    this.NumerosBloqueados =
                        resData["Numeros de loteria bloqueados"];
                    this.NumerosRepetidos =
                        resData["Numeros de loteria mas repetidos"];
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        addNumero(numero) {
            this.NumerosBloqueados.push(numero);
            this.Metricas.splice(this.Metricas.indexOf(numero), 1);
        },
        async blockNumero(numero) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/bloquearNumero/${numero.id}`,
                    {
                        method: "DELETE",
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
                    this.NumerosBloqueados.splice(
                        this.NumerosBloqueados.indexOf(numero),
                        1
                    );
                    this.NumerosBloqueados = [
                        ...this.NumerosBloqueados,
                        ...resData["El objeto fue eliminado con exito!"],
                    ];
                    alert("Numero bloqueado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async desBlockNumero(numero) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/desbloquearNumero/${numero.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    numero.Estado = 1;
                    this.NumerosBloqueados.splice(
                        this.NumerosBloqueados.indexOf(numero),
                        1
                    );
                    this.Metricas.unshift(numero);
                    alert("Numero desbloqueado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(metrica) {
            const Loteria = metrica.Loteria
                ? metrica.Loteria.toString()
                      .toLowerCase()
                      .includes(this.toSearch)
                : false;
            if (
                Loteria ||
                metrica.Numero.toString().includes(this.toSearch) ||
                metrica.Tipo.toLowerCase().includes(this.toSearch) ||
                metrica.Valorapuesta.toString().includes(this.toSearch)
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix", "toSearch"]),
    },
    created() {
        this.getMetricas();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Metricas__numeros {
    max-height: var(--max-height);
    overflow: auto;
    .Metricas__numeros-numero {
        background: var(--bs-dark);
    }
}
.Metricas__Info {
    background: var(--bs-dark);
    .table-responsive {
        max-height: var(--max-height);
        overflow: auto;
    }
    table {
        th,
        td {
            border: 0.5rem solid transparent !important;
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
            border-left: none !important;
        }
        th:last-child,
        td:last-child {
            border-right: none !important;
        }
    }
}
</style>
