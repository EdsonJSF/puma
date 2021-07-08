<template>
    <div class="SolicitarMobiliario h-100">
        <form
            @submit.prevent="solicitarMobiliario(mobiliario)"
            class="d-flex flex-column rounded-3 h-100"
        >
            <h6 class="text-white my-3">MOBILIARIO</h6>
            <textarea
                v-model="mobiliario.cantidad"
                class="form-control my-3 h-100"
                placeholder="Mobiliario a solicitar"
                required
            ></textarea>
            <textarea
                v-model="mobiliario.cuotas"
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
export default {
    name: "SolicitarMobiliario",
    data() {
        return {
            mobiliario: {
                cantidad: "",
                cuotas: "",
            },
        };
    },
    methods: {
        solicitarMobiliario(mobiliario) {
            console.log(mobiliario);
        },
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
