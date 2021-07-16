<template>
    <div class="OtrasSolicitudes h-100">
        <form
            @submit.prevent="otrasSolicitudes(solicitud)"
            class="d-flex flex-column rounded-3 h-100"
        >
            <h6 class="text-white my-3">OTROS</h6>
            <textarea
                v-model="solicitud.Solicitud"
                class="form-control my-3 h-100"
                placeholder="Solicitud"
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
    name: "OtrasSolicitudes",
    data() {
        return {
            solicitud: {
                Solicitud: "",
            },
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        clearInput() {
            this.solicitud = {
                Solicitud: "",
            };
        },
        async otrasSolicitudes(solicitud) {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/crearsolicitud`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.token}`,
                        },
                        body: JSON.stringify(solicitud),
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
