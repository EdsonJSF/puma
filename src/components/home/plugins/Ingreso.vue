<template>
    <div class="Ingreso">
        <div class="d-flex flex-column">
            <!-- LOGIN -->
            <form
                @submit.prevent="toLogin(usuario)"
                class="paralelogramo-primary p-2 d-flex flex-column flex-sm-row justify-content-between align-items-center"
            >
                <span class="mx-1"
                    >User:
                    <input
                        class="w-50"
                        type="email"
                        placeholder="email"
                        required
                        v-model="usuario.email"
                /></span>
                <span class="mx-1"
                    >Clave:
                    <input
                        class="w-50"
                        type="password"
                        placeholder="pass"
                        required
                        v-model="usuario.password"
                /></span>
                <div class="mx-1 d-flex flex-column">
                    <button type="submit" class="fw-bold">ENTRAR</button>
                    <button
                        class="btn navbar-toggler fs-6"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#forgetPass"
                        aria-controls="forgetPass"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Olvide mi contraseña
                    </button>
                </div>
            </form>

            <!-- RECOVER PASS -->
            <form
                @submit.prevent="toRecover(forgetPass)"
                class="collapse paralelogramo-primary p-2 w-auto align-self-end"
                id="forgetPass"
            >
                <input
                    class="w-100"
                    type="email"
                    placeholder="Ingrese correo de recuperación"
                    required
                    v-model="forgetPass.email"
                />
                <button type="submit" class="fw-bold">
                    RECUPERAR
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Ingreso",
    data() {
        return {
            usuario: {
                email: "",
                password: "",
            },
            forgetPass: {
                email: "",
            },
        };
    },
    methods: {
        ...mapActions(["login", "recoveryPass"]),

        clearInput() {
            this.usuario = {
                email: "",
                password: "",
            };
            this.forgetPass = {
                email: "",
            };
        },

        async toLogin(usuario) {
            const query = await this.login(usuario);
            if (query) {
                this.clearInput();
            } else {
                alert("Alguno de los datos es erroneo");
            }
        },
        async toRecover(email) {
            const query = await this.recoveryPass(email);
            if (query) {
                this.clearInput();
                alert(this.pass);
            } else {
                alert("Alguno de los datos es erroneo");
            }
        },
    },
    computed: {
        ...mapState(["pass"]),
    },
};
</script>

<style lang="scss" scoped>
.Ingreso * {
    color: var(--bs-green);
    button {
        border: none;
        background-color: transparent;
    }
    .navbar-toggler:focus {
        box-shadow: none;
    }
    input {
        border-bottom: 1px solid var(--bs-secondary);
        background-color: transparent;
    }
}
</style>
