<template>
    <div id="OtrasSolicitudes">
        <form
            @submit.prevent="otrasSolicitudes(solicitud)"
            class="d-flex flex-column rounded-3"
        >
            <h5 class="my-3">OTROS</h5>
            <textarea
                v-model="solicitud.descripcion"
                class="form-control my-3"
                placeholder="Solicitud"
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
    name: "OtrasSolicitudes",
    data() {
        return {
            solicitud: {
                descripcion: "",
            },
        };
    },
    methods: {
        otrasSolicitudes(solicitud) {
            console.log(solicitud);
        },
    },
};
</script>

<style lang="scss" scoped>
form {
    background: var(--bs-gray-dark);
}
</style>
