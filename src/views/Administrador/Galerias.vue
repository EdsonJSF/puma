<template>
    <div class="Galerias">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <div
                    class="Galerias__lista d-flex flex-column rounded-3 m-1 py-2"
                >
                    <div
                        v-for="(galeria, indexGaleria) in Galerias"
                        :key="indexGaleria"
                    >
                        <h2 class="my-2">{{ tituloGaleria(indexGaleria) }}</h2>
                        <div
                            v-for="(item, indexItem) in galeria"
                            :key="indexItem"
                            class="Galerias__lista-item d-flex justify-content-between align-items-center px-2 my-2"
                        >
                            <p class="m-0">{{ item.titulo }}</p>
                            <div>
                                <button
                                    @click="selectGaleria(item)"
                                    class="btn"
                                >
                                    <img
                                        v-if="item.estado === 1"
                                        src="../../assets/img/icons/pen-solid.svg"
                                        alt=""
                                    />
                                    <img
                                        v-else
                                        src="../../assets/img/icons/check-square-solid.svg"
                                        alt=""
                                    />
                                </button>
                                <button
                                    v-if="item.estado === 1"
                                    @click="deleteGaleria(item, indexGaleria)"
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
                                    accept="video/*, image/*"
                                    :required="crear"
                                />
                                <div class="d-flex justify-content-around">
                                    <figure>
                                        <img
                                            :src="imagenSeleccionada"
                                            width="150"
                                            height="150"
                                            alt="Imagen Seleccionada"
                                        />
                                    </figure>
                                </div>
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
            fileInputKey: 0,
            imagenSeleccionada: "",
            galeriaTipo: "",
            Galerias: [],
            crear: true,
        };
    },
    methods: {
        ...mapActions(["logout"]),

        async getGalerias() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/customize?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            // Authorization: `Bearer ${this.token}`,
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
        },
        tituloGaleria(titulo) {
            return titulo.split(": ")[1];
        },

        onFileSelected(event) {
            const file = event.target.files[0];
            this.galeria.rutaVideo = file;
            this.galeria.rutaImagen = file;
            this.mostrarImagen(file);
        },
        mostrarImagen(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imagenSeleccionada = e.target.result;
            };
            reader.readAsDataURL(file);
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
            this.fileInputKey++;
        },

        addGaleria(data, tipo) {
            if (this.crear) {
                this.sendGalerias(data, tipo);
            } else {
                this.editGaleria(data);
            }
        },
        async sendGalerias(galeria, tipo) {
            const formData = new FormData();

            formData.append("rutaImagen", galeria.rutaImagen);
            formData.append("titulo", galeria.titulo);
            formData.append("contenido", galeria.contenido);
            formData.append("rutaVideo", galeria.rutaVideo);
            formData.append("orden", galeria.orden);
            formData.append("tipo", galeria.tipo);
            formData.append("link", galeria.link);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/customize?token=${this.token}`,
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
            }
        },
        async setResultados(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/galeriasResultados/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();

                this.Galerias["Datos tipo 1: Resultados"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
            }
        },
        async setSorteos(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/galeriasSorteos/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();

                this.Galerias["Datos tipo 2: Sorteos"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
            }
        },
        async setUbicanos(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/galeriasUbicanos/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();

                this.Galerias["Datos tipo 3: Ubicanos"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
            }
        },
        async setTestimonios(galeria) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/galeriasTestimonios/${galeria[1].id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(galeria),
                    }
                );
                const resData = await res.json();

                this.Galerias["Datos tipo 4: Testimonios"].push(galeria[1]);
                this.clearInput();
            } catch (error) {
                console.log(error);
            }
        },

        selectGaleria(data) {
            console.log(data);
            this.galeria = data;
            this.imagenSeleccionada = `${this.prefix}/images/${
                data.rutaImagen.name ? data.rutaImagen.name : data.rutaImagen
            }`;
            this.crear = false;
        },

        // FIXME no envia bien la foto
        async editGaleria(galeria) {
            console.log(galeria.rutaImagen);
            const formData = new FormData();

            formData.append("rutaImagen", galeria.rutaImagen);
            formData.append("titulo", galeria.titulo);
            formData.append("contenido", galeria.contenido);
            formData.append("rutaVideo", galeria.rutaVideo);
            formData.append("link", galeria.link);
            formData.append("estado", 1);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/customizeUpdate/${galeria.id}?token=${this.token}`,
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
                console.log(resData);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 1;
                    this.crear = true;
                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteGaleria(galeria, index) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/customize/${galeria.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                        // headers: {
                        //     "Content-Type": "application/json",
                        //     Authorization: `Bearer ${this.token}`,
                        // },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    galeria.estado = 0;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
        imagen() {
            return this.imagenSeleccionada;
        },
    },
    created() {
        this.getGalerias();
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
            border: none;
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
            &:focus {
                outline: none;
            }
        }
    }
}
</style>
