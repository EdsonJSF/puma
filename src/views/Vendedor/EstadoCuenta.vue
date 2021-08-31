<template>
    <div id="EstadoCuenta">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <Profile />
            </div>
            <div class="col-12 col-md-7 col-lg-8 my-2 my-md-0">
                <VerMiEstadosCuentas />
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/login/Profile.vue";
import VerMiEstadosCuentas from "@/components/login/estadosCuentas/VerMiEstadosCuentas.vue";

export default {
    name: "EstadoCuenta",
    components: {
        Profile,
        VerMiEstadosCuentas,
    },
};
</script>
