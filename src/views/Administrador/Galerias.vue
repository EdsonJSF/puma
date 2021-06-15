<template>
    <div class="Galerias">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div class="Galerias__lista rounded-3 m-1 py-2">
                    <h2 class="my-2">Lista de galerias</h2>
                    <div
                        class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                    >
                        <p class="m-0">Ganadores</p>
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
                    <div
                        class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                    >
                        <p class="m-0">Resultados 1</p>
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
                    <div
                        class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                    >
                        <p class="m-0">Resultados 2</p>
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
                    <div
                        class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                    >
                        <p class="m-0">Resultados 3</p>
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
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Galerias__module rounded-3 m-1 py-2">
                    <form @submit.prevent="sendGaleria(galeria)" class="row">
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column justify-content-between h-100 p-2"
                            >
                                <input
                                    type="file"
                                    @change="onFileSelected"
                                    accept="video/*, image/*"
                                />
                                <div class="d-flex justify-content-around">
                                    <img src="#" alt="" />
                                    <img src="#" alt="" />
                                    <img src="#" alt="" />
                                </div>
                                <div class="d-flex align-items-start p-2">
                                    <button
                                        @click="onUpLoad"
                                        type="submit"
                                        class="btn btn-light rounded-pill"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column align-items-start p-2"
                            >
                                <h4>Titulo</h4>
                                <textarea
                                    v-model="galeria.titulo"
                                    class="w-100"
                                    required
                                ></textarea>
                                <h4>Descripción</h4>
                                <textarea
                                    v-model="galeria.descripcion"
                                    class="w-100"
                                    required
                                ></textarea>
                                <h4>Link de enlace</h4>
                                <textarea
                                    v-model="galeria.link"
                                    class="w-100"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Galerias",
    data() {
        return {
            galeria: {
                img: [],
                titulo: "",
                descripcion: "",
                link: "",
            },
            selectedFile: null,
        };
    },
    methods: {
        ...mapActions(["sendGaleria"]),
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            console.log(event.target.files);
        },
        async onUpLoad() {
            try {
                const res = await fetch(`../src/assets/img/galerias`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: this.selectedFile,
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.Galerias {
    .Galerias__lista,
    .Galerias__module {
        background: var(--bs-dark);
    }
    .Galerias__lista-item {
        background: var(--bs-light);
    }
    .Galerias__module {
        textarea {
            border: none;
            background-color: transparent;
            background-image: repeating-linear-gradient(
                transparent,
                transparent 1.5rem,
                #000 1.5rem,
                #000 1.56rem,
                transparent 1.56rem
            );
        }
        textarea:focus {
            outline: none;
        }
    }
}
</style>
