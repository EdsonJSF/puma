<template>
    <div class="Sorteos">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Sorteos__input d-flex flex-column rounded-3 my-2 py-2"
                >
                    <div>
                        <h5>Nuevo Sorteo</h5>
                    </div>
                    <div>
                        <form
                            @submit.prevent="addSorteo(newSorteo)"
                            class="d-flex flex-column"
                        >
                            <input
                                v-model="newSorteo.fecha"
                                class="border-0 my-1"
                                type="date"
                                placeholder="Fecha:"
                                required
                            />
                            <input
                                v-model="newSorteo.loteria"
                                class="border-0 my-1"
                                type="text"
                                placeholder="lotería:"
                                required
                            />
                            <input
                                v-model="newSorteo.codigo"
                                class="border-0 my-1"
                                type="text"
                                placeholder="Ponga su código:"
                                required
                            />
                            <div class="align-self-end mx-5 my-2">
                                <button
                                    class="btn btn-sm btn-light btn-outline-dark rounded-pill border-0"
                                    type="submit"
                                >
                                    {{ crear ? "GUARDAR" : "EDITAR" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div
                    class="Sorteos__data d-flex flex-column rounded-3 my-2 py-2"
                >
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th>Fecha</th>
                                <th>Loteria</th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(sorteo, index) in Sorteos"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            {{ sorteo.fecha }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {{ sorteo.loteria }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn text-light  align-self-end mx-5">
                        Agregar +
                    </button>
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
            newSorteo: {
                fecha: "2121-07-07",
                loteria: "asdas",
                codigo: "asdas",
            },
            Sorteos: [],
            crear: true,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        addSorteo(sorteo) {
            if (this.crear) {
                this.sendSorteo(sorteo);
            } else {
                this.editSorteo(sorteo);
            }
        },
        clearInput() {
            this.newSorteo = {
                fecha: "",
                loteria: "",
                codigo: "",
            };
            this.crear = true;
        },
        async sendSorteo(sorteo) {
            this.Sorteos.push(sorteo);
            this.clearInput();
            return;
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/sorteos`,
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
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        selectSorteo(sorteo) {
            this.newSorteo = sorteo;
            this.crear = false;
        },
        async editSorteo(sorteo) {
            this.clearInput();
            return;
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/sorteos`,
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
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async delSorteo(sorteo) {
            this.Sorteos.splice(this.Sorteos.indexOf(sorteo), 1);
            this.clearInput();

            return;
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/sorteos`,
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
        .text-light {
            text-shadow: 2px 2px 1.5px #222;
        }
    }
}
</style>
