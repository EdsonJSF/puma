<template>
    <div class="Solicitud">
        <div class="row">
            <div class="col-12 col-lg-4">
                <MisSolicitudes />
            </div>
            <div class="col-12 col-lg-8 mt-4 mt-lg-0">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-6 col-lg-4 my-2 my-lg-0">
                        <SolicitarCredito />
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4 my-2 my-lg-0">
                        <SolicitarMobiliario />
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4 my-2 my-lg-0">
                        <OtrasSolicitudes />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MisSolicitudes from "@/components/login/solicitudes/MisSolicitudes.vue";
import SolicitarCredito from "@/components/login/solicitudes/SolicitarCredito.vue";
import SolicitarMobiliario from "@/components/login/solicitudes/SolicitarMobiliario.vue";
import OtrasSolicitudes from "@/components/login/solicitudes/OtrasSolicitudes.vue";

export default {
    name: "Solicitud",
    components: {
        MisSolicitudes,
        SolicitarCredito,
        SolicitarMobiliario,
        OtrasSolicitudes,
    },
};
</script>
