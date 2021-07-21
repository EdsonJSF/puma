<template>
    <div class="SolicitarCredito">
        <form
            @submit.prevent="solicitarCredito(credito)"
            class="d-flex flex-column rounded-3"
        >
            <h6 class="text-white my-3">CREDITO / PRESTAMO</h6>
            <textarea
                v-model="credito.CantidadSolicitada"
                class="form-control my-3"
                placeholder="Cantidad a solicitar"
                required
            ></textarea>
            <textarea
                v-model="credito.Cuotas"
                class="form-control my-3"
                placeholder="Cuotas de pago"
                required
            ></textarea>
            <div class="align-self-end">
                <button
                    class="btn btn-light btn-outline-dark btn-sm rounded-pill border-0 my-3 me-3"
                    type="submit"
                >
                    ENVIAR
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "SolicitarCredito",
    data() {
        return {
            credito: {
                CantidadSolicitada: "",
                Cuotas: "",
            },
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        clearInput() {
            this.credito = {
                CantidadSolicitada: "",
                Cuotas: "",
            };
        },
        async solicitarCredito(credito) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/api/${this.rol}/crearsolicitud`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: JSON.stringify(credito),
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
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
    },
};
</script>

<style lang="scss" scoped>
form {
    background: var(--bs-dark);
    textarea,
    textarea:focus {
        background: var(--bs-light);
        resize: none;
    }
}
</style>
