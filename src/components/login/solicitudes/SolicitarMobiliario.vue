<template>
    <div class="SolicitarMobiliario h-100">
        <form
            @submit.prevent="solicitarMobiliario(mobiliario)"
            class="d-flex flex-column rounded-3 h-100"
        >
            <h6 class="text-white my-3">MOBILIARIO</h6>
            <textarea
                v-model="mobiliario.MobiliarioSolicitado"
                class="form-control my-3 h-100"
                placeholder="Mobiliario a solicitar"
                required
            ></textarea>
            <textarea
                v-model="mobiliario.Ubicacion"
                class="form-control my-3 h-100"
                placeholder="Ubicación del punto"
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
    name: "SolicitarMobiliario",
    data() {
        return {
            mobiliario: {
                MobiliarioSolicitado: "",
                Ubicacion: "",
            },
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        clearInput() {
            this.mobiliario = {
                MobiliarioSolicitado: "",
                Ubicacion: "",
            };
        },
        async solicitarMobiliario(mobiliario) {
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
                        body: JSON.stringify(mobiliario),
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
