<template>
    <div class="EstadoCuenta">
        <EstadosCuentas />
    </div>
</template>

<script>
import EstadosCuentas from "@/components/login/estadosCuentas/EstadosCuentas.vue";

export default {
    name: "EstadoCuenta",
    components: {
        EstadosCuentas,
    },
};
</script>
