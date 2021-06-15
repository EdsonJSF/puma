<template>
    <div id="Routes" class="d-flex flex-column mx-2">
        <div class=" d-flex flex-wrap justify-content-center">
            <router-link
                v-for="(ruta, index) in loginRoutes.rutas"
                :key="index"
                class="paralelogramo text-capitalize d-flex align-items-center mt-1 px-2 py-1"
                :to="`/${loginRoutes.userRol}/${ruta}`"
                >{{ ruta.replace(/-/g, " ") }}</router-link
            >
            <a
                class="paralelogramo d-flex align-items-center h-auto mt-1 px-2 py-1"
                @click="logout"
                >Salir</a
            >
        </div>
        <div class="paralelogramo-gray"></div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Routes",
    methods: {
        ...mapActions(["logout"]),
    },
    computed: {
        ...mapState(["loginRoutes"]),
    },
};
</script>
<style scoped>
#Routes a {
    font-weight: 500;
    text-decoration: none;
    color: var(--bs-white);
    cursor: pointer;
}
#Routes a:hover,
#Routes a.router-link-exact-active {
    color: var(--bs-green);
}
</style>
