<template>
    <div class="Galerias">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div class="Galerias__lista d-flex flex-column rounded-3">
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
                <div class="Galerias__module rounded-3">
                    <form
                        @submit.prevent="addGaleria(galeria, galeriaTipo)"
                        class="row"
                        enctype="multipart/form-data"
                    >
                        <div class="col-12 col-md-6">
                            <div
                                class="d-flex flex-column justify-content-between h-100 p-2"
                            >
                                <input
                                    type="file"
                                    @change="onFileSelected"
                                    :key="fileInputKey"
                                    accept="image/*"
                                    :required="crear"
                                />
                                <div class="d-flex justify-content-around">
                                    <figure v-if="imagenSeleccionada">
                                        <img
                                            :src="imagen"
                                            width="150"
                                            height="150"
                                            alt="Imagen Seleccionada"
                                        />
                                    </figure>
                                </div>
                                <!-- <input
                                    type="file"
                                    @change="onVideoSelected"
                                    :key="fileInputKey"
                                    accept="video/*"
                                />
                                <div class="d-flex justify-content-around">
                                    <video
                                        v-if="videoSeleccionado"
                                        :src="video"
                                        width="150"
                                        controls
                                    ></video>
                                </div> -->
                                <div>
                                    <select
                                        v-if="crear"
                                        v-model="galeriaTipo"
                                        required
                                    >
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
                                        type="submit"
                                        class="btn btn-light btn-outline-dark btn-sm rounded-pill border-0"
                                    >
                                        {{ crear ? "Guardar" : "Editar" }}
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
                                <h5>Descripción</h5>
                                <textarea
                                    v-model="galeria.contenido"
                                    class="w-100"
                                    required
                                ></textarea>
                                <h5>Link de enlace</h5>
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
import { mapActions, mapState } from "vuex";

export default {
    name: "Galerias",
    data() {
        return {
            galeria: {
                rutaImagen: "",
                titulo: "",
                contenido: "",
                rutaVideo: "",
                orden: "1",
                tipo: "1",
                link: "",
            },
            imagenSeleccionada: "",
            videoSeleccionado: "",
            fileInputKey: 0,
            galeriaTipo: "",
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
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Galerias = resData;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
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
                titulo: "",
                contenido: "",
                rutaVideo: "",
                orden: "1",
                tipo: "1",
                link: "",
            };
            this.imagenSeleccionada = "";
            this.videoSeleccionado = "";
            this.fileInputKey++;
            this.galeriaTipo = "";
            this.crear = true;
        },

        addGaleria(galeria, tipo) {
            if (this.crear) {
                this.sendGalerias(galeria, tipo);
            } else {
                this.editGaleria(galeria);
            }
        },
        async sendGalerias(galeria, tipo) {
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
                        // headers: {
                        //     "Content-Type": "application/json",
                        //     Authorization: `Bearer ${this.token}`,
                        // },
                        body: formData,
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                // TODO revisar la consulta if
                if (tipo === "Resultados") {
                    this.setResultados(resData);
                } else if (tipo === "Sorteos") {
                    this.setSorteos(resData);
                } else if (tipo === "Ubicanos") {
                    this.setUbicanos(resData);
                } else if (tipo === "Testimonios") {
                    this.setTestimonios(resData);
                } else if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async setResultados(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/galeriasResultados/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.Galerias["Datos tipo 1: Resultados"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async setSorteos(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/galeriasSorteos/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.Galerias["Datos tipo 2: Sorteos"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async setUbicanos(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/galeriasUbicanos/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.Galerias["Datos tipo 3: Ubicanos"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async setTestimonios(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/galeriasTestimonios/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.Galerias["Datos tipo 4: Testimonios"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
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
                        // headers: {
                        //     "Content-Type": "application/json",
                        //     Authorization: `Bearer ${this.token}`,
                        // },
                        body: formData,
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.rutaImagen =
                        resData[
                            "El objeto fue actualizado con exito!"
                        ].rutaImagen;
                    galeria.rutaVideo =
                        resData[
                            "El objeto fue actualizado con exito!"
                        ].rutaVideo;
                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async deleteGaleria(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/customize/${galeria.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                        // headers: {
                        //     "Content-Type": "application/json",
                        //     Authorization: `Bearer ${this.token}`,
                        // },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 0;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async activarGaleria(galeria) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/UpdateEstado/${galeria.id}?token=${this.token}`,
                    {
                        // headers: {
                        //     "Content-Type": "application/json",
                        //     Authorization: `Bearer ${this.token}`,
                        // },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 1;
                    this.selectGaleria(galeria);
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        generalSearch(galeria) {
            if (galeria.titulo.toLowerCase().includes(this.toSearch)) {
                return true;
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
            return this.videoSeleccionado;
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
        .Galerias__lista-item {
            background: var(--bs-light);
            &:hover {
                background: var(--bs-dark);
            }
        }
    }
    .Galerias__module {
        background: var(--bs-dark);
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
