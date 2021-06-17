<template>
    <div class="PromotoresVendedores">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <form
                    @submit.prevent="addUsuario(usuario, rol)"
                    class="d-flex flex-column"
                >
                    <!-- <div>
                        <input
                            type="file"
                            @change="onFileSelected"
                            accept="video/*, image/*"
                        />
                    </div> -->
                    <div>
                        <input
                            v-model="usuario.name"
                            type="name"
                            placeholder="name"
                            required
                        />
                        <input
                            v-model="usuario.email"
                            type="email"
                            placeholder="email"
                            required
                        />
                        <input
                            v-if="crear"
                            v-model="usuario.password"
                            type="password"
                            minlength="6"
                            placeholder="password"
                            required
                        />
                        <input
                            v-model="usuario.dni"
                            type="number"
                            placeholder="dni"
                            required
                        />
                        <input
                            v-model="usuario.ganancia"
                            type="number"
                            placeholder="ganancia"
                            required
                        />
                        <input
                            v-model="usuario.porcentaje"
                            type="number"
                            max="50"
                            placeholder="porcentaje"
                            required
                        />
                        <input
                            v-model="usuario.direccion"
                            type="direccion"
                            placeholder="direccion"
                            required
                        />
                        <input
                            v-model="usuario.telefono"
                            type="phone"
                            placeholder="telefono"
                            required
                        />
                        <select v-model="rol" required>
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
                    <button v-else type="submit" class="btn btn-primary btn-sm">
                        Editar
                    </button>
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
    name: "PromotoresVendedores",
    data() {
        return {
            PromotoresVendedores: [],
            usuario: {
                name: "eds",
                email: "eds@eds.eds",
                password: "eds123",
                dni: "123",
                ganancia: "123",
                porcentaje: "10",
                foto: "sadas",
                direccion: "eds",
                telefono: "123",
            },
            rol: "",
            crear: true,
        };
    },
    methods: {
        async getPromotoresVendedores() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/modulopromotorvendedor?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/crearpromotorvendedor?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/CrearAdministrador?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/CrearPromotor?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/CrearVendedor?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/modulopromotorvendedor/${newUser.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    }
                );
                const resData = await res.json();
                console.log(resData);
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
                    `${this.prefix}/api/administrador/ModificarAdministrador/${id}?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/ModificarPromotor/${id}?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/ModificarVendedor/${id}?token=${this.token}`,
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
                    `${this.prefix}/api/administrador/modulopromotorvendedor/${user.id}?token=${this.token}`,
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
        ...mapState(["token", "prefix"]),
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
