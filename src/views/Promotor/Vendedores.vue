<template>
    <div class="Vendedores">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <form
                    @submit.prevent="addUsuario(usuario)"
                    class="Vendedores__form d-flex flex-column rounded-3 py-2 px-1"
                >
                    <label class="position-relative btn d-flex w-100 py-1 px-4">
                        <input
                            @change="onFileSelected"
                            :key="fileInputKey"
                            :required="crear"
                            type="file"
                            accept="image/*"
                            class="invisible position-absolute"
                        />
                        <img
                            v-if="imagenSeleccionada"
                            class="w-25 h-auto rounded-3"
                            :src="imagen"
                            alt="Imagen Seleccionada"
                        />
                        <img
                            v-if="!imagenSeleccionada"
                            class="w-25 h-auto bg-secondary p-2 pb-0 rounded-3"
                            src="../../assets/img/icons/user-alt-solid.svg"
                        />
                        <img
                            class="p-3"
                            width="50"
                            src="../../assets/img/icons/plus-solid-white.svg"
                        />
                    </label>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Nombre</label>
                        <input
                            v-model="usuario.name"
                            class="form-control"
                            type="name"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Correo</label>
                        <input
                            v-model="usuario.email"
                            class="form-control"
                            type="email"
                            placeholder="Correo"
                            required
                        />
                    </div>
                    <div v-if="crear" class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Contraseña</label>
                        <input
                            class="form-control"
                            v-model="usuario.password"
                            type="password"
                            minlength="6"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">NIT</label>
                        <input
                            v-model="usuario.dni"
                            class="form-control"
                            type="number"
                            placeholder="NIT"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Porcentaje</label>
                        <input
                            v-model="usuario.porcentaje"
                            class="form-control"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="Porcentaje"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Dirección</label>
                        <input
                            v-model="usuario.direccion"
                            class="form-control"
                            type="direccion"
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Teléfono</label>
                        <input
                            v-model="usuario.telefono"
                            class="form-control"
                            type="phone"
                            placeholder="Teléfono"
                            required
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="btn btn-light me-1">Código</label>
                        <input
                            v-model="usuario.codigo"
                            class="form-control"
                            type="text"
                            placeholder="Código"
                            required
                        />
                    </div>
                    <div class="d-flex justify-content-around">
                        <button
                            @click.prevent="clearInput"
                            class="btn btn-sm btn-light btn-outline-dark rounded-pill border-0 my-1"
                        >
                            Limpiar
                        </button>
                        <button
                            type="submit"
                            class="btn btn-sm btn-light btn-outline-dark rounded-pill border-0 my-1"
                        >
                            {{ crear ? "Crear" : "Editar" }}
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <div class="Vendedores__data d-flex flex-column rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th>Nombre Apellido</th>
                                <th>NIT</th>
                                <th>Porcentaje</th>
                                <th>Código</th>
                            </thead>
                            <tbody
                                v-for="(vendedor, index) in Vendedores"
                                :key="index"
                            >
                                <tr v-if="generalSearch(vendedor)">
                                    <td>
                                        <div>{{ vendedor.name }}</div>
                                    </td>
                                    <td>
                                        <div>{{ vendedor.dni }}</div>
                                    </td>
                                    <td>
                                        <div>{{ vendedor.porcentaje }}%</div>
                                    </td>
                                    <td>
                                        <div>{{ vendedor.codigo }}</div>
                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                @click="selectUsuario(vendedor)"
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/pen-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                v-if="vendedor.tipo == 1"
                                                @click="delUsuario(vendedor)"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Vendedores",
    data() {
        return {
            Vendedores: [],

            usuario: {
                name: "",
                email: "",
                password: "",
                dni: "",
                ganancia: "",
                porcentaje: "",
                foto: "",
                direccion: "",
                telefono: "",
                rol_id: "3",
                codigo: "",
            },
            imagenSeleccionada: "",
            fileInputKey: 0,
            crear: true,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader", "sendSearch"]),

        async getVendedores() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/mostrarvendedor`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Vendedores = resData;
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },

        onFileSelected(event) {
            const img = event.target.files[0];
            this.usuario.foto = img;
            this.mostrarImagen(img);
        },
        mostrarImagen(img) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imagenSeleccionada = e.target.result;
            };
            reader.readAsDataURL(img);
        },
        clearInput() {
            this.usuario = {
                name: "",
                email: "",
                password: "",
                dni: "",
                ganancia: "",
                porcentaje: "",
                foto: "",
                direccion: "",
                telefono: "",
                rol_id: "",
                codigo: "",
            };
            this.imagenSeleccionada = "";
            this.fileInputKey++;
            this.crear = true;
        },

        addUsuario(usuario) {
            if (this.crear) {
                this.createUsuario(usuario);
            } else {
                this.editUsuario(usuario);
            }
        },
        async createUsuario(usuario) {
            this.showPreloader(true);

            const formData = new FormData();

            formData.append("rol", usuario.rol_id);
            formData.append("name", usuario.name);
            formData.append("email", usuario.email);
            formData.append("password", usuario.password);
            formData.append("dni", usuario.dni);
            formData.append("foto", usuario.foto);
            // formData.append("ganancia", usuario.ganancia);
            formData.append("porcentaje", usuario.porcentaje);
            formData.append("direccion", usuario.direccion);
            formData.append("telefono", usuario.telefono);
            formData.append("codigo", usuario.codigo);

            try {
                const res = await fetch(`${this.prefix}/api/api/register`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                    body: formData,
                });
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else if (resData.token) {
                    this.Vendedores.unshift(resData.user);
                    this.clearInput();
                    alert("Usuario creado");
                } else if (JSON.parse(resData).email) {
                    alert("Ya existe el email");
                } else if (JSON.parse(resData).codigo) {
                    alert("Ya existe el código");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },

        selectUsuario(usuario) {
            this.usuario = usuario;
            this.imagenSeleccionada = `${this.prefix}/images/${usuario.foto}`;
            this.crear = false;
        },
        async editUsuario(usuario) {
            this.showPreloader(true);

            const formData = new FormData();

            formData.append("rol", usuario.rol_id);
            formData.append("name", usuario.name);
            formData.append("email", usuario.email);
            formData.append("dni", usuario.dni);
            formData.append("foto", usuario.foto);
            // formData.append("ganancia", usuario.ganancia);
            formData.append("porcentaje", usuario.porcentaje);
            formData.append("direccion", usuario.direccion);
            formData.append("telefono", usuario.telefono);
            formData.append("codigo", usuario.codigo);
            formData.append("tipo", 1);

            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/modificarvendedor/${usuario.id}`,
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
                } else {
                    this.usuario.tipo = 1;
                    this.usuario.foto =
                        resData["El objeto fue actualizado con exito!"].foto;
                    this.clearInput();
                    alert("Usuario editado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        async delUsuario(usuario) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/eliminarvendedor/${usuario.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.Vendedores[this.Vendedores.indexOf(usuario)] =
                        resData["Objeto eliminado con exito!"];

                    this.clearInput();
                    alert("Usuario eliminado");
                }
            } catch (error) {
                console.log(error);
            }
            this.showPreloader(false);
        },
        generalSearch(vendedor) {
            if (
                vendedor.name.toLowerCase().includes(this.toSearch) ||
                vendedor.dni.toString().includes(this.toSearch) ||
                vendedor.codigo.toLowerCase().includes(this.toSearch) ||
                vendedor.porcentaje.toString().includes(this.toSearch)
            ) {
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
    },
    created() {
        this.getVendedores();
        this.sendSearch("");
    },
};
</script>

<style lang="scss" scoped>
.Vendedores {
    .Vendedores__form {
        background: var(--bs-dark);
        div {
            margin: 2px 0;
            label {
                font-weight: 400;
                cursor: default;
            }
        }
    }
    .Vendedores__data {
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
