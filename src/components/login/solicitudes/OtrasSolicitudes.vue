<template>
    <div class="OtrasSolicitudes h-100">
        <form
            @submit.prevent="otrasSolicitudes(solicitud)"
            class="d-flex flex-column rounded-3 h-100"
        >
            <h6 class="text-white my-3">OTROS</h6>
            <textarea
                v-model="solicitud.descripcion"
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
    background: var(--bs-dark);
    textarea,
    textarea:focus {
        background: var(--bs-light);
        resize: none;
    }
}
</style>
