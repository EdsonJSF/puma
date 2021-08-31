<template>
    <div class="Sorteos">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <div class="Sorteos__input d-flex flex-column rounded-3 py-2">
                    <div>
                        <h5>Nuevo Sorteo</h5>
                    </div>
                    <div>
                        <form
                            @submit.prevent="addSorteo(sorteo)"
                            class="d-flex flex-column"
                        >
                            <input
                                v-model="sorteo.Fecha"
                                class="border-0 my-1"
                                type="datetime-local"
                                placeholder="Fecha:"
                                required
                            />
                            <input
                                v-model="sorteo.Loteria"
                                class="border-0 my-1"
                                type="text"
                                placeholder="lotería:"
                                required
                            />
                            <input
                                v-model="sorteo.Codigo"
                                class="border-0 my-1"
                                type="text"
                                placeholder="Ponga su código:"
                                required
                            />
                            <input
                                v-model="sorteo.Max"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="Monto límite"
                                required
                            />
                            <input
                                v-model="sorteo.porc_4cifras"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="4 cifras"
                                required
                            />
                            <input
                                v-model="sorteo.porc_triple"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="Triple"
                                required
                            />
                            <input
                                v-model="sorteo.porc_combn3"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="Combinado de 3"
                                required
                            />
                            <input
                                v-model="sorteo.porc_combn4"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="Combinado de 4"
                                required
                            />
                            <input
                                v-model="sorteo.porc_terminal"
                                class="border-0 my-1"
                                type="number"
                                min="0"
                                placeholder="Terminal"
                                required
                            />
                            <div class="d-flex justify-content-around">
                                <button
                                    @click.prevent="clearInput"
                                    class="btn btn-sm btn-light btn-outline-dark rounded-pill border-0 my-1"
                                >
                                    Limpiar
                                </button>
                                <button
                                    class="btn btn-sm btn-light btn-outline-dark rounded-pill border-0 my-1"
                                    type="submit"
                                >
                                    {{ crear ? "GUARDAR" : "EDITAR" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="Sorteos__data d-flex flex-column rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th>Fecha</th>
                                <th>Loteria</th>
                            </thead>
                            <tbody
                                v-for="(sorteo, index) in Sorteos"
                                :key="index"
                            >
                                <tr v-if="generalSearch(sorteo)">
                                    <td>
                                        <div>
                                            {{ arreglarCadena(sorteo.Fecha) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ sorteo.Loteria }}
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="sorteo.Estado === 1">
                                            <button
                                                @click="selectSorteo(sorteo)"
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/pen-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                @click="delSorteo(sorteo)"
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/trash-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button
                                                @click="editSorteo(sorteo)"
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/check-square-solid.svg"
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
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Sorteos",
    data() {
        return {
            sorteo: {
                Fecha: "",
                Loteria: "",
                Codigo: "",
                Max: "",
                porc_4cifras: "",
                porc_triple: "",
                porc_combn3: "",
                porc_combn4: "",
                porc_terminal: "",
            },
            Sorteos: [],
            crear: true,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getSorteos() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/mostrarSorteo`,
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
                    this.Sorteos = resData["Sorteos Activos"];
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        arreglarCadena(cadena) {
            return cadena.replace("T", " ");
        },

        addSorteo(sorteo) {
            if (this.crear) {
                this.sendSorteo(sorteo);
            } else {
                this.editSorteo(sorteo);
            }
        },
        clearInput() {
            this.sorteo = {
                Fecha: "",
                Loteria: "",
                Codigo: "",
                Max: "",
                porc_4cifras: "",
                porc_triple: "",
                porc_combn3: "",
                porc_combn4: "",
                porc_terminal: "",
            };
            this.crear = true;
        },
        async sendSorteo(sorteo) {
            const formData = new FormData();
            formData.append("Fecha", sorteo.Fecha);
            formData.append("Loteria", sorteo.Loteria);
            formData.append("Codigo", sorteo.Codigo);
            formData.append("Max", sorteo.Max);
            formData.append("porc_4cifras", sorteo.porc_4cifras);
            formData.append("porc_triple", sorteo.porc_triple);
            formData.append("porc_combn3", sorteo.porc_combn3);
            formData.append("porc_combn4", sorteo.porc_combn4);
            formData.append("porc_terminal", sorteo.porc_terminal);

            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/generarSorteo`,
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
                } else if (resData === "El codigo ya existe") {
                    alert(resData);
                } else {
                    this.Sorteos.unshift(resData.sorteos);
                    this.clearInput();
                    alert("Sorteo enviado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        selectSorteo(sorteo) {
            sorteo.Fecha = sorteo.Fecha.replace(" ", "T");
            this.sorteo = sorteo;
            this.crear = false;
        },
        async editSorteo(sorteo) {
            sorteo.Estado = 1;
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/modificarSorteo/${sorteo.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: JSON.stringify(sorteo),
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.clearInput();
                    alert("Sorteo editado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async delSorteo(sorteo) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/eliminarSorteo/${sorteo.id}`,
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
                    this.Sorteos[this.Sorteos.indexOf(sorteo)].Estado = 0;
                    alert("Sorteo eliminado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(sorteo) {
            if (
                sorteo.Fecha.toLowerCase().includes(this.toSearch) ||
                sorteo.Loteria.toLowerCase().includes(this.toSearch)
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
        this.getSorteos();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Sorteos {
    .Sorteos__input {
        background: var(--bs-dark);
        form {
            input {
                background: var(--bs-light);
            }
        }
    }
    .Sorteos__data {
        background: var(--bs-dark);
        .table-responsive {
            max-height: var(--max-height);
            overflow: auto;
        }
        table {
            td {
                border-top: 0.5rem solid transparent;
                border-bottom: 0.5rem solid transparent;
                padding: 0;
                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 5px;
                    min-height: 2rem;
                    background: var(--bs-light);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
