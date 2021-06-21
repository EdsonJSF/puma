<template>
    <div class="Galerias">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Galerias__lista d-flex flex-column rounded-3 m-1 py-2"
                >
                    <div
                        v-for="(galeria, indexGaletia) in Galerias"
                        :key="indexGaletia"
                    >
                        <h2 class="my-2">{{ tituloGaleria(indexGaletia) }}</h2>
                        <div
                            v-for="(item, indexItem) in galeria"
                            :key="indexItem"
                            class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                        >
                            <p class="m-0">{{ item.titulo }}</p>
                            <div>
                                <button
                                    @click="editGaleria(item, indexGaletia)"
                                    class="btn"
                                >
                                    <img
                                        src="../../assets/img/icons/check-square-solid.svg"
                                        alt=""
                                    />
                                </button>
                                <button
                                    @click="deleteGaleria(item, indexGaletia)"
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
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Galerias__module rounded-3 m-1 py-2">
                    <form
                        @submit.prevent="sendGalerias(galeria, galeriaTipo)"
                        class="row"
                    >
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column justify-content-between h-100 p-2"
                            >
                                <input
                                    type="file"
                                    @change="onFileSelected"
                                    accept="video/*, image/*"
                                    required
                                />
                                <div class="d-flex justify-content-around">
                                    <img src="#" alt="" />
                                    <img src="#" alt="" />
                                    <img src="#" alt="" />
                                </div>
                                <div>
                                    <select v-model="galeriaTipo" required>
                                        <option value="" disabled selected
                                            >Seleccione</option
                                        >
                                        <option value="Resultados"
                                            >Resultados</option
                                        >
                                        <option value="Sorteos">Sorteos</option>
                                        <option value="Ubicanos"
                                            >Ubicanos</option
                                        >
                                        <option value="Testimonios"
                                            >Testimonios</option
                                        >
                                    </select>
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
                                    v-model="galeria.contenido"
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
import { mapState } from "vuex";

export default {
    name: "Galerias",
    data() {
        return {
            galeria: {
                rutaImagen: "",
                titulo: "",
                contenido: "",
                rutaVideo: "",
                orden: 1,
                tipo: 1,
                link: "",
            },
            fileSelected: "",
            galeriaTipo: "",
            Galerias: [],
        };
    },
    methods: {
        onFileSelected(event) {
            this.fileSelected = event.target.files[0];
        },
        async getGalerias() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/customize?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.Galerias = resData;
            } catch (error) {
                console.log(error);
            }
        },
        tituloGaleria(titulo) {
            return titulo.split(": ")[1];
        },
        async sendGalerias(galeria, tipo) {
            const formData = new FormData();

            formData.append("rutaImagen", this.fileSelected);
            formData.append("titulo", galeria.titulo);
            formData.append("contenido", galeria.contenido);
            formData.append("rutaVideo", this.fileSelected);
            formData.append("orden", galeria.orden);
            formData.append("tipo", galeria.tipo);
            formData.append("link", galeria.link);

            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/customize?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: formData,
                    }
                );
                const resData = await res.text();
                console.log(resData);

                // if (tipo === "Resultados") {
                //     sendResultados(galeria);
                // } else if (tipo === "Sorteos") {
                //     sendSorteos(galeria);
                // } else if (tipo === "Ubicanos") {
                //     sendUbicanos(galeria);
                // } else if (tipo === "Testimonios") {
                //     sendTestimonios(galeria);
                // } else {
                // }
            } catch (error) {
                console.log(error);
            }
        },
        async sendResultados(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/galeriasResultados?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                console.log(resData);
            } catch (error) {
                console.log(error);
            }
        },
        async sendSorteos(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/galeriasSorteos?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                console.log(resData);
            } catch (error) {
                console.log(error);
            }
        },
        async sendUbicanos(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/galeriasUbicanos?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                console.log(resData);
            } catch (error) {
                console.log(error);
            }
        },
        async sendTestimonios(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/galeriasTestimonios?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                console.log(resData);
            } catch (error) {
                console.log(error);
            }
        },
        async editGaleria(data, index) {
            try {
                console.log(data, index);
                console.log("editGaleria");
            } catch (error) {
                console.log(error);
            }
        },
        async deleteGaleria(data, index) {
            try {
                this.Galerias[index].splice(
                    this.Galerias[index].indexOf(data),
                    1
                );
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "prefix"]),
    },
    created() {
        this.getGalerias();
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
