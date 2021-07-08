<template>
    <div class="SolicitarCredito">
        <form
            @submit.prevent="solicitarCredito(credito)"
            class="d-flex flex-column rounded-3"
        >
            <h6 class="text-white my-3">CREDITO / PRESTAMO</h6>
            <textarea
                v-model="credito.cantidad"
                class="form-control my-3"
                placeholder="Cantidad a solicitar"
                required
            ></textarea>
            <textarea
                v-model="credito.cuotas"
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
export default {
    name: "SolicitarCredito",
    data() {
        return {
            credito: {
                cantidad: "",
                cuotas: "",
            },
        };
    },
    methods: {
        solicitarCredito(credito) {
            console.log(credito);
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
