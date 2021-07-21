<template>
    <div class="ListaUsuarios">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <form
                    @submit.prevent="addUsuario(usuario)"
                    class="ListaUsuarios__form d-flex flex-column rounded-3 my-2 py-2"
                >
                    <input
                        @change="onFileSelected"
                        :key="fileInputKey"
                        type="file"
                        class="form-control"
                        accept="image/*"
                        :required="crear"
                    />
                    <figure v-if="imagenSeleccionada" class="m-0">
                        <img
                            :src="imagen"
                            width="150"
                            height="150"
                            alt="Imagen Seleccionada"
                        />
                    </figure>
                    <input
                        v-model="usuario.name"
                        class="form-control"
                        type="name"
                        placeholder="name"
                        required
                    />
                    <input
                        v-model="usuario.email"
                        class="form-control"
                        type="email"
                        placeholder="email"
                        required
                    />
                    <input
                        v-if="crear"
                        class="form-control"
                        v-model="usuario.password"
                        type="password"
                        minlength="6"
                        placeholder="password"
                        required
                    />
                    <input
                        v-model="usuario.dni"
                        class="form-control"
                        type="number"
                        placeholder="dni"
                        required
                    />
                    <input
                        v-if="usuario.rol_id != 1"
                        v-model="usuario.ganancia"
                        class="form-control"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="ganancia"
                        required
                    />
                    <input
                        v-if="usuario.rol_id != 1"
                        v-model="usuario.porcentaje"
                        class="form-control"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="porcentaje"
                        required
                    />
                    <input
                        v-model="usuario.direccion"
                        class="form-control"
                        type="direccion"
                        placeholder="direccion"
                        required
                    />
                    <input
                        v-model="usuario.telefono"
                        class="form-control"
                        type="phone"
                        placeholder="telefono"
                        required
                    />
                    <select
                        v-model="usuario.rol_id"
                        class="form-control"
                        required
                    >
                        <option value="" class="form-control" disabled selected
                            >Seleccione rol</option
                        >
                        <option value="1">Administrador</option>
                        <option value="2">Promotor</option>
                        <option value="3">Vendedor</option>
                    </select>
                    <select
                        v-if="usuario.rol_id == 3"
                        v-model="usuario.user_id"
                        class="form-control"
                        required
                    >
                        <option value="" class="form-control" disabled selected
                            >Seleccione promotor</option
                        >
                        <option
                            v-for="(promotor,
                            indexPro) in PromotoresVendedores[1]"
                            :key="indexPro"
                            :value="promotor.id"
                            >{{ promotor.name }}</option
                        >
                    </select>
                    <input
                        v-model="usuario.codigo"
                        class="form-control"
                        type="text"
                        placeholder="codígo"
                        required
                    />
                    <div>
                        <button
                            type="submit"
                            class="btn btn-sm btn-light btn-outline-dark border-0 rounded-pill my-1"
                        >
                            {{ crear ? "Crear" : "Editar" }}
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div
                    class="ListaUsuarios__data d-flex flex-column rounded-3 my-2 py-2"
                >
                    <div class="table-responsive">
                        <table class="table table-borderless align-middle">
                            <tbody>
                                <tr
                                    v-for="(rolEmpleado,
                                    indexRol) in PromotoresVendedores"
                                    :key="indexRol"
                                >
                                    <td colspan="">
                                        <table
                                            class="table table-borderless table-hover align-middle"
                                        >
                                            <thead>
                                                <th v-if="indexRol === 0">
                                                    Vendedor
                                                </th>
                                                <th v-else-if="indexRol === 1">
                                                    Promotor
                                                </th>
                                                <th v-else>
                                                    Administrador
                                                </th>
                                            </thead>
                                            <thead>
                                                <th>Nombre Apellido</th>
                                                <th>NIT</th>
                                                <th>Ganancia</th>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(empleado,
                                                    indexEmp) in rolEmpleado"
                                                    :key="indexEmp"
                                                >
                                                    <td>
                                                        <div>
                                                            {{ empleado.name }}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {{ empleado.dni }}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {{
                                                                empleado.balance
                                                            }}
                                                            COP
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <button
                                                                @click="
                                                                    selectUsuario(
                                                                        empleado
                                                                    )
                                                                "
                                                                class="btn btn-sm"
                                                            >
                                                                <img
                                                                    src="../../assets/img/icons/pen-solid.svg"
                                                                    alt=""
                                                                />
                                                            </button>
                                                            <button
                                                                v-if="
                                                                    empleado.tipo ==
                                                                        1
                                                                "
                                                                @click="
                                                                    delUsuario(
                                                                        empleado
                                                                    )
                                                                "
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        @click.prevent="clearInput"
                        class="btn text-light align-self-end mx-5"
                    >
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
    name: "ListaUsuarios",
    data() {
        return {
            PromotoresVendedores: [],

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
                rol_id: "",
                codigo: "",
                user_id: "",
            },
            imagenSeleccionada: "",
            fileInputKey: 0,
            crear: true,
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getPromotoresVendedores() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modulopromotorvendedor`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.PromotoresVendedores = resData;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
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
                user_id: "",
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
            formData.append("ganancia", usuario.ganancia);
            formData.append("porcentaje", usuario.porcentaje);
            formData.append("direccion", usuario.direccion);
            formData.append("telefono", usuario.telefono);
            formData.append("codigo", usuario.codigo);
            formData.append("nuevo_id", usuario.user_id);

            try {
                const res = await fetch(`${this.prefix}/api/register`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                    body: formData,
                });
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else if (resData.token) {
                    let position = "";
                    if (usuario.rol_id == 1) {
                        position = 2;
                    } else if (usuario.rol_id == 2) {
                        position = 1;
                    } else if (usuario.rol_id == 3) {
                        position = 0;
                    }
                    this.PromotoresVendedores[position].unshift(resData.user);
                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
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
            formData.append("ganancia", usuario.ganancia);
            formData.append("porcentaje", usuario.porcentaje);
            formData.append("direccion", usuario.direccion);
            formData.append("telefono", usuario.telefono);
            formData.append("codigo", usuario.codigo);
            formData.append("nuevo_id", usuario.user_id);
            formData.append("tipo", 1);

            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/moduloPromotorVendedorUpdate/${usuario.id}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: formData,
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.usuario.tipo = 1;
                    this.usuario.foto =
                        resData["El objeto fue actualizado con exito!"].foto;
                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async delUsuario(usuario) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modulopromotorvendedor/${usuario.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    let position = "";
                    if (usuario.rol_id == 1) {
                        position = 2;
                    } else if (usuario.rol_id == 2) {
                        position = 1;
                    } else if (usuario.rol_id == 3) {
                        position = 0;
                    }
                    this.PromotoresVendedores[position][
                        this.PromotoresVendedores[position].indexOf(usuario)
                    ] = resData["El objeto fue eliminado con exito"];

                    this.clearInput();
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
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
        this.getPromotoresVendedores();
    },
};
</script>

<style lang="scss" scoped>
.ListaUsuarios {
    .ListaUsuarios__form {
        background: var(--bs-dark);
        .form-control,
        .form-control:focus {
            margin: 1px 0;
        }
    }
    .ListaUsuarios__data {
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
