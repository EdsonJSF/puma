<template>
    <div id="SolicitarMobiliario">
        <form
            @submit.prevent="solicitarMobiliario(mobiliario)"
            class="d-flex flex-column rounded-3"
        >
            <h5 class="my-3">MOBILIARIO</h5>
            <textarea
                v-model="mobiliario.cantidad"
                class="form-control my-3"
                placeholder="Mobiliario a solicitar"
                required
            ></textarea>
            <textarea
                v-model="mobiliario.cuotas"
                class="form-control my-3"
                placeholder="Ubicación del punto"
                required
            ></textarea>
            <div>
                <button
                    class="btn btn-light btn-outline-dark btn-sm rounded-pill my-3"
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
    background: var(--bs-gray-dark);
}
</style>
