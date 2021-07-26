<template>
    <div class="Contactanos">
        <div class="d-flex flex-column h-100">
            <div>
                <h1>
                    Contactanos
                </h1>
            </div>
            <HeaderComponents />
            <form
                @submit.prevent="contactar(contacto)"
                class="row d-flex justify-content-center align-items-center mx-2 my-auto"
            >
                <div class="col-12 col-md-6 d-flex flex-column">
                    <input
                        v-model="contacto.nombre_contacto"
                        type="text"
                        placeholder="Tu nombre"
                        required
                    />
                    <input
                        v-model="contacto.correo_contacto"
                        type="email"
                        placeholder="Tu correo"
                        required
                    />
                </div>
                <textarea
                    v-model="contacto.mensaje_contacto"
                    class="col-12 col-md-6"
                    cols="auto"
                    rows="3"
                    placeholder="Tu mensaje"
                    required
                ></textarea>
                <button
                    class="paralelogramo-primary btn w-auto my-4 px-3 py-1"
                    type="submit"
                >
                    ENVIAR
                </button>
            </form>
            <div
                class="paralelogramo-primary row justify-content-center align-items-center"
            >
                <div class="position-absolute"></div>
                2021 Chance Puma derechos reservados
            </div>
            <div
                class="paralelogramo paralelogramo-dark d-flex justify-content-center align-items-center my-4 w-25 mx-auto"
            >
                <div
                    @click="toTopSwiper"
                    class="triangulo-top bg-transparent"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HeaderComponents from "@/components/home/plugins/HeaderComponents.vue";

export default {
    name: "Contactanos",
    components: {
        HeaderComponents,
    },
    data() {
        return {
            contacto: {
                nombre_contacto: "",
                correo_contacto: "",
                mensaje_contacto: "",
            },
        };
    },
    methods: {
        ...mapActions(["contactanos"]),

        clearInput() {
            this.contancto = {
                nombre_contacto: "",
                correo_contacto: "",
                mensaje_contacto: "",
            };
        },

        async contactar(mensaje) {
            const res = await this.contactanos(mensaje);
            if (res) {
                alert(this.message);
                this.clearInput();
            }
        },

        toTopSwiper() {
            const topPumaSwiper = document.querySelector(
                ".swiper-container.pumaSwiper"
            ).swiper;
            topPumaSwiper.slideTo(1);
        },
    },
    computed: {
        ...mapState(["message"]),
    },
};
</script>

<style lang="scss" scoped>
input,
textarea,
textarea:focus {
    margin: 0.7rem 0;
    padding: 0rem 1rem;
    background: var(--bs-dark);
    resize: none;
}

button.paralelogramo-primary:hover::before {
    background-color: var(--bs-secondary);
}
button.paralelogramo-primary:hover {
    color: var(--bs-white) !important;
}
.paralelogramo-primary .position-absolute {
    max-width: 75vw;
    width: 20rem;
    height: 3rem;
    background: var(--bs-secondary);
    z-index: -2;
}
</style>
