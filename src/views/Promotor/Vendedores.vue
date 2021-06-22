<template>
    <div class="Vendedores">
        <ListaUsuarios />
    </div>
</template>

<script>
import ListaUsuarios from "@/components/login/ListaUsuarios.vue";

export default {
    name: "Vendedores",
    components: {
        ListaUsuarios,
    },
};
</script>