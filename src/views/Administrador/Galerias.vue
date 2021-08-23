<template>
    <div class="Galerias">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
                <div class="Galerias__lista d-flex flex-column rounded-3 py-2">
                    <div
                        v-for="(galeria, indexGaleria) in Galerias"
                        :key="indexGaleria"
                    >
                        <h5 class="my-2">{{ tituloGaleria(indexGaleria) }}</h5>
                        <div
                            v-for="(item, indexItem) in galeria"
                            :key="indexItem"
                        >
                            <div
                                v-if="generalSearch(item)"
                                class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                            >
                                <p class="m-0">{{ item.titulo }}</p>
                                <div v-if="item.estado === 1">
                                    <button
                                        @click="selectGaleria(item)"
                                        class="btn"
                                    >
                                        <img
                                            src="../../assets/img/icons/pen-solid.svg"
                                            alt=""
                                        />
                                    </button>
                                    <button
                                        @click="deleteGaleria(item)"
                                        class="btn"
                                    >
                                        <img
                                            src="../../assets/img/icons/trash-solid.svg"
                                            alt=""
                                        />
                                    </button>
                                </div>
                                <div v-else>
                                    <button
                                        @click="activarGaleria(item)"
                                        class="btn"
                                    >
                                        <img
                                            src="../../assets/img/icons/check-square-solid.svg"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Galerias__module rounded-3 py-2">
                    <form
                        @submit.prevent="addGaleria(galeria)"
                        class="row"
                        enctype="multipart/form-data"
                    >
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column justify-content-between align-items-center h-100 p-2"
                            >
                                <label
                                    v-if="galeria.tipo != 6"
                                    class="inputFile d-flex flex-column justify-content-center align-items-center w-100 h-50"
                                >
                                    <input
                                        @change="onFileSelected"
                                        :key="fileInputKey"
                                        :required="crear"
                                        type="file"
                                        accept="image/*"
                                        class="invisible"
                                    />
                                    <figure
                                        v-if="imagenSeleccionada"
                                        class="m-0 w-100 h-100"
                                    >
                                        <img
                                            :src="imagen"
                                            class="w-auto mw-100 h-auto mh-100"
                                            alt="Imagen Seleccionada"
                                        />
                                    </figure>
                                    <img
                                        v-if="!imagenSeleccionada"
                                        class="imgPlus"
                                        src="../../assets/img/icons/plus-solid.svg"
                                        alt=""
                                    />
                                </label>
                                <label
                                    v-if="
                                        galeria.tipo == 6 &&
                                            galeria.link.includes('http')
                                    "
                                    class="inputFile d-flex flex-column justify-content-center align-items-center w-100 h-100"
                                >
                                    <div class="m-0 w-100 h-100">
                                        <iframe
                                            :src="video"
                                            class="w-auto mw-100 h-auto mh-100"
                                            controls
                                        ></iframe>
                                    </div>
                                </label>
                                <div>
                                    <select
                                        v-if="crear"
                                        v-model="galeria.tipo"
                                        class="form-control border border-1"
                                        required
                                    >
                                        <option value="" disabled selected
                                            >Seleccione</option
                                        >
                                        <option value="1">Resultados</option>
                                        <option value="2">Sorteos</option>
                                        <option value="3">Ubicanos</option>
                                        <option value="4">Testimonios</option>
                                        <option value="5">Slider</option>
                                        <option value="6">Video</option>
                                    </select>
                                </div>
                                <div
                                    class="align-self-start d-flex flex-wrap align-items-start p-2"
                                >
                                    <button
                                        type="submit"
                                        class="fw-bold btn btn-light btn-outline-dark rounded-pill border-0 px-4 m-1"
                                    >
                                        {{ crear ? "Guardar" : "Editar" }}
                                    </button>
                                    <button
                                        @click.prevent="clearInput"
                                        class="fw-bold btn btn-light btn-outline-dark rounded-pill border-0 px-4 m-1"
                                    >
                                        Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column align-items-start p-2"
                            >
                                <h5>Titulo</h5>
                                <textarea
                                    v-model="galeria.titulo"
                                    class="w-100"
                                    required
                                ></textarea>
                                <h5
                                    v-if="
                                        galeria.tipo == 1 || galeria.tipo == 3
                                    "
                                >
                                    Descripción
                                </h5>
                                <textarea
                                    v-if="
                                        galeria.tipo == 1 || galeria.tipo == 3
                                    "
                                    v-model="galeria.contenido"
                                    class="w-100"
                                    required
                                ></textarea>
                                <h5
                                    v-if="
                                        galeria.tipo == 1 ||
                                            galeria.tipo == 3 ||
                                            galeria.tipo == 6
                                    "
                                >
                                    Link de enlace
                                </h5>
                                <textarea
                                    v-if="
                                        galeria.tipo == 1 ||
                                            galeria.tipo == 3 ||
                                            galeria.tipo == 6
                                    "
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
import { mapActions, mapState } from "vuex";

export default {
    name: "Galerias",
    data() {
        return {
            galeria: {
                rutaImagen: "",
                rutaVideo: "",
                contenido: "",
                titulo: "",
                orden: "1",
                tipo: "",
                link: "",
            },
            imagenSeleccionada: "",
            videoSeleccionado: "",
            fileInputKey: 0,
            crear: true,

            Galerias: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getGalerias() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/customizeGeneral?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Galerias = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        tituloGaleria(titulo) {
            return titulo.split(": ")[1];
        },

        onFileSelected(event) {
            const img = event.target.files[0];
            this.galeria.rutaImagen = img;
            this.mostrarImagen(img);
        },
        mostrarImagen(img) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imagenSeleccionada = e.target.result;
            };
            reader.readAsDataURL(img);
        },
        onVideoSelected(event) {
            const video = event.target.files[0];
            this.galeria.rutaVideo = video;
            this.mostrarVideo(video);
        },
        mostrarVideo(video) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.videoSeleccionado = e.target.result;
            };
            reader.readAsDataURL(video);
        },
        clearInput() {
            this.galeria = {
                rutaImagen: "",
                rutaVideo: "",
                contenido: "",
                titulo: "",
                orden: "1",
                tipo: "",
                link: "",
            };
            this.imagenSeleccionada = "";
            this.videoSeleccionado = "";
            this.fileInputKey++;
            this.crear = true;
        },

        addGaleria(galeria) {
            if (this.crear) {
                this.sendGalerias(galeria);
            } else {
                this.editGaleria(galeria);
            }
        },
        async sendGalerias(galeria) {
            this.showPreloader(true);

            const formData = new FormData();
            formData.append("rutaImagen", galeria.rutaImagen);
            formData.append("rutaVideo", galeria.rutaVideo);
            formData.append("titulo", galeria.titulo);
            formData.append("contenido", galeria.contenido);
            formData.append("link", galeria.link);
            formData.append("orden", galeria.orden);
            formData.append("tipo", galeria.tipo);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/customize?token=${this.token}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else if (galeria.tipo === "1") {
                    this.Galerias["Datos tipo 1: Resultados"].push(resData[1]);
                } else if (galeria.tipo === "2") {
                    this.Galerias["Datos tipo 2: Sorteos"].push(resData[1]);
                } else if (galeria.tipo === "3") {
                    this.Galerias["Datos tipo 3: Ubicanos"].push(resData[1]);
                } else if (galeria.tipo === "4") {
                    this.Galerias["Datos tipo 4: Testimonios"].push(resData[1]);
                } else if (galeria.tipo === "5") {
                    this.Galerias["Datos tipo 5: Slider"].push(resData[1]);
                } else if (galeria.tipo === "6") {
                    this.Galerias["Datos tipo 6: Video"].push(resData[1]);
                } else {
                }

                this.clearInput();
                alert("Galeria enviada");
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },

        selectGaleria(galeria) {
            this.galeria = galeria;
            this.imagenSeleccionada = `${this.prefix}/images/${galeria.rutaImagen}`;
            this.videoSeleccionado = `${this.prefix}/videos/${galeria.rutaVideo}`;
            this.crear = false;
        },
        async editGaleria(galeria) {
            this.showPreloader(true);

            const formData = new FormData();
            formData.append("rutaImagen", galeria.rutaImagen);
            formData.append("rutaVideo", galeria.rutaVideo);
            formData.append("titulo", galeria.titulo);
            formData.append("contenido", galeria.contenido);
            formData.append("link", galeria.link);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/customizeUpdate/${galeria.id}?token=${this.token}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    if (
                        resData["El objeto fue actualizado con exito!"]
                            .rutaImagen
                    ) {
                        galeria.rutaImagen =
                            resData[
                                "El objeto fue actualizado con exito!"
                            ].rutaImagen;
                    }

                    if (
                        resData["El objeto fue actualizado con exito!"]
                            .rutaVideo
                    ) {
                        galeria.rutaVideo =
                            resData[
                                "El objeto fue actualizado con exito!"
                            ].rutaVideo;
                    }

                    this.clearInput();
                    alert("Galeria editada");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async deleteGaleria(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/customize/${galeria.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 0;
                    alert("Galeria eliminada");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async activarGaleria(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/UpdateEstado/${galeria.id}?token=${this.token}`,
                    {}
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 1;
                    this.selectGaleria(galeria);
                    alert("Galeria activada");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(galeria) {
            if (galeria.titulo) {
                if (galeria.titulo.toLowerCase().includes(this.toSearch)) {
                    return true;
                }
            } else {
                return false;
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix", "toSearch"]),
        imagen() {
            return this.imagenSeleccionada;
        },
        video() {
            return this.galeria.link;
        },
    },
    created() {
        this.getGalerias();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Galerias {
    .Galerias__lista {
        background: var(--bs-dark);
        max-height: var(--max-height);
        overflow-y: auto;
        .Galerias__lista-item {
            background: var(--bs-light);
            &:hover {
                background: var(--bs-dark);
            }
        }
    }
    .Galerias__module {
        background: var(--bs-dark);
        .inputFile {
            background: var(--bs-light);
            border: 1px solid var(--bs-gray);
            border-radius: 1rem;
            cursor: pointer;
            .imgPlus {
                height: 10%;
            }
            figure {
                img {
                    border-radius: 1rem;
                }
            }
        }
        select {
            border-color: var(--bs-gray) !important;
        }
        textarea {
            background: {
                color: transparent;
                image: repeating-linear-gradient(
                    transparent,
                    transparent 1.5rem,
                    #000 1.5rem,
                    #000 1.56rem,
                    transparent 1.56rem
                );
            }
        }
    }
}
</style>
