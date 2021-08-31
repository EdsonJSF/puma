<template>
    <div class="ReportarVentas">
        <div class="row">
            <div class="col-12 my-2">
                <Reportar />
            </div>
        </div>
    </div>
</template>

<script>
import Reportar from "@/components/login/ventas/Reportar.vue";
export default {
    name: "ReportarVentas",
    components: {
        Reportar,
    },
};
</script>
