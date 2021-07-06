<template>
    <div class="ListUsuarios">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <form
                    @submit.prevent="addUsuario(usuario, rol)"
                    class="ListUsuarios__form d-flex flex-column form-signin"
                >
                    <div class="form-label-group w-100">
                        <div>
                            <input
                                @change="onFileSelected"
                                :key="fileInputKey"
                                type="file"
                                class="form-control"
                                accept="image/*"
                            />
                        </div>
                        <div class="">
                            <figure v-if="imagenSeleccionada">
                                <img
                                    :src="imagen"
                                    width="150"
                                    height="150"
                                    alt="Imagen Seleccionada"
                                />
                            </figure>
                        </div>
                        <div>
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
                                v-if="usuario.rol !== '1'"
                                v-model="usuario.ganancia"
                                class="form-control"
                                type="number"
                                placeholder="ganancia"
                                required
                            />
                            <input
                                v-if="usuario.rol !== '1'"
                                v-model="usuario.porcentaje"
                                class="form-control"
                                type="number"
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
                                v-model="usuario.rol"
                                class="form-control"
                                required
                            >
                                <option value="1" selected
                                    >Administrador</option
                                >
                                <option value="2">Promotor</option>
                                <option value="3">Vendedor</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm">
                            {{ crear ? "Crear" : "Editar" }}
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div
                    class="ListUsuarios__data d-flex flex-column rounded-3 my-2 py-2"
                >
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th>Nombre Apellido</th>
                                <th>NIT</th>
                                <th>Ganancia</th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(usuario,
                                    index) in PromotoresVendedores"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            {{ usuario.name }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>{{ usuario.dni }}</div>
                                    </td>
                                    <td>
                                        <div>{{ usuario.balance }} COP</div>
                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                @click="selectUsuario(usuario)"
                                                class="btn btn-sm"
                                            >
                                                <img
                                                    src="../../assets/img/icons/pen-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                @click="delUsuario(usuario)"
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
                    <button
                        type="submit"
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
    name: "ListUsuarios",
    data() {
        return {
            PromotoresVendedores: [],
            usuario: {
                name: "Edson",
                email: "Edsonjsf1990@gmail.com",
                password: "123456",
                dni: "20425049",
                ganancia: "",
                porcentaje: "",
                foto: "",
                direccion: "mi casa",
                telefono: "4247469327",
                rol: "1",
                codigo: "1",
            },
            crear: true,
            fileInputKey: 0,
            imagenSeleccionada: "",
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getPromotoresVendedores() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modulopromotorvendedor?token=${this.token}`,
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

        addUsuario(newUser, rol) {
            if (this.crear) {
                this.createUsuario(newUser, rol);
            } else {
                this.editUsuario(newUser, rol);
            }
        },
        async createUsuario(newUser, rol) {
            console.log(newUser);
            console.log(newUser.rol);

            this.showPreloader(true);

            const formData = new FormData();

            formData.append("name", newUser.name);
            formData.append("email", newUser.email);
            formData.append("password", newUser.password);
            formData.append("dni", newUser.dni);
            formData.append("ganancia", newUser.ganancia);
            formData.append("porcentaje", newUser.porcentaje);
            formData.append("foto", newUser.foto);
            formData.append("direccion", newUser.direccion);
            formData.append("telefono", newUser.telefono);
            formData.append("rol", newUser.rol);
            formData.append("codigo", newUser.codigo);

            try {
                const res = await fetch(
                    `${this.prefix}/api/register?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: formData,
                    }
                );
                const resData = await res.json();
                console.log(resData);
                this.showPreloader(false);

                // if (resData.token) {
                //     this.PromotoresVendedores.unshift(resData.user);

                //     if (rol === "1") {
                //         this.createAdmin();
                //     } else if (rol === "2") {
                //         this.createProm();
                //     } else if (rol === "3") {
                //         this.createVend();
                //     } else {
                //         console.log("error");
                //     }
                // } else if (resData.status === "Token is Expired") {
                //     this.logout();
                // } else {
                //     console.log("error");
                // }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async createAdmin() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/CrearAdministrador?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async createProm() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/CrearPromotor?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async createVend() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/CrearVendedor?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        selectUsuario(user) {
            this.crear = false;
            this.usuario = user;
        },
        async editUsuario(newUser, rol) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modulopromotorvendedor/${newUser.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (rol === "Administrador") {
                    this.editAdmin(newUser.id);
                } else if (rol === "Promotor") {
                    this.editProm(newUser.id);
                } else if (rol === "Vendedor") {
                    this.editVend(newUser.id);
                } else if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async editAdmin(id) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/ModificarAdministrador/${id}?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async editProm(id) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/ModificarPromotor/${id}?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async editVend(id) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/ModificarVendedor/${id}?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                this.clearInput();
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        async delUsuario(user) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/modulopromotorvendedor/${user.id}?token=${this.token}`,
                    {
                        method: "DELETE",
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
                    this.PromotoresVendedores.splice(
                        this.PromotoresVendedores.indexOf(user),
                        1
                    );
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
        // TODO descomentar esto
        // this.getPromotoresVendedores();
    },
};
</script>

<style lang="scss" scoped>
.ListUsuarios__data {
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
</style>
