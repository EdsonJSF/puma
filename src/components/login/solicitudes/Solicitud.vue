<template>
    <div id="Solicitud">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Profile />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="row">
                    <div class="col-4">
                        <SolicitarCredito />
                    </div>
                    <div class="col-4">
                        <SolicitarMobiliario />
                    </div>
                    <div class="col-4">
                        <OtrasSolicitudes />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/login/Profile.vue";
import SolicitarCredito from "@/components/login/solicitudes/SolicitarCredito.vue";
import SolicitarMobiliario from "@/components/login/solicitudes/SolicitarMobiliario.vue";
import OtrasSolicitudes from "@/components/login/solicitudes/OtrasSolicitudes.vue";

export default {
    name: "Solicitud",
    components: {
        Profile,
        SolicitarCredito,
        SolicitarMobiliario,
        OtrasSolicitudes,
    },
};
</script>
