<template>
    <div class="ListUsuarios">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <form
                    @submit.prevent="addUsuario(usuario, rol)"
                    class="d-flex flex-column form-signin"
                >
                    <div class="form-label-group w-100">
                        <div>
                            <input
                                type="file"
                                class="form-control"
                                @change="onFileSelected"
                                accept="image/*"
                                required
                            />
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
                                v-model="usuario.ganancia"
                                class="form-control"
                                type="number"
                                placeholder="ganancia"
                                required
                            />
                            <input
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
                            <select v-model="newRol" class="form-control" required>
                                <option value="Administrador" selected
                                    >Administrador</option
                                >
                                <option value="Promotor">Promotor</option>
                                <option value="Vendedor">Vendedor</option>
                            </select>
                        </div>
                        <button
                            v-if="crear"
                            type="submit"
                            class="btn btn-primary btn-sm"
                        >
                            Crear
                        </button>
                        <button
                            v-else
                            type="submit"
                            class="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="d-flex flex-column rounded-3 my-2 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-hover table-borderless align-middle"
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
                                    class="border-5 border-start-0 border-end-0"
                                >
                                    <td class="bg-light">
                                        {{ usuario.name }}
                                    </td>
                                    <td class="bg-light">{{ usuario.dni }}</td>
                                    <td class="bg-light">
                                        {{ usuario.balance }} COP
                                    </td>
                                    <td>
                                        <button
                                            @click="selectUsuario(usuario)"
                                            class="btn"
                                        >
                                            <img
                                                src="../../assets/img/icons/pen-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            @click="delUsuario(usuario)"
                                            class="btn"
                                        >
                                            <img
                                                src="../../assets/img/icons/trash-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="submit"
                        class="btn text-light  align-self-end mx-5"
                    >
                        Agregar +
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ListUsuarios",
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
            },
            newRol: "",
            crear: true,
        };
    },
    methods: {
        async getPromotoresVendedores() {
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
                this.PromotoresVendedores = resData;
            } catch (error) {
                console.log(error);
            }
        },
        onFileSelected(event) {
            this.usuario.foto = event.target.files[0];
        },
        async addUsuario(newUser, rol) {
            if (this.crear) {
                this.createUsuario(newUser, rol);
            } else {
                this.editUsuario(newUser, rol);
            }
        },
        async createUsuario(newUser, rol) {
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/crearpromotorvendedor?token=${this.token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    }
                );
                const resData = await res.json();

                if (resData.token) {
                    this.PromotoresVendedores.unshift(resData.user);
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
                    };
                    this.rol = "";

                    if (rol === "Administrador") {
                        this.createAdmin();
                    } else if (rol === "Promotor") {
                        this.createProm();
                    } else if (rol === "Vendedor") {
                        this.createVend();
                    } else {
                        console.log("error");
                    }
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async createAdmin() {
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
            } catch (error) {
                console.log(error);
            }
        },
        async createProm() {
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
            } catch (error) {
                console.log(error);
            }
        },
        async createVend() {
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
            } catch (error) {
                console.log(error);
            }
        },
        async selectUsuario(user) {
            this.crear = false;
            this.usuario = user;
        },
        async editUsuario(newUser, rol) {
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
                };
                this.rol = "";
                this.crear = true;

                if (rol === "Administrador") {
                    this.editAdmin(newUser.id);
                } else if (rol === "Promotor") {
                    this.editProm(newUser.id);
                } else if (rol === "Vendedor") {
                    this.editVend(newUser.id);
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async editAdmin(id) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async editProm(id) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async editVend(id) {
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
            } catch (error) {
                console.log(error);
            }
        },
        async delUsuario(user) {
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
                this.PromotoresVendedores.splice(
                    this.PromotoresVendedores.indexOf(user),
                    1
                );
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getPromotoresVendedores();
    },
};
</script>

<style lang="scss" scoped>
.rounded-3 {
    background: var(--bs-dark);
}
.text-light {
    text-shadow: 2px 2px 1.5px #222;
}
</style>
