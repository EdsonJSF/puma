<template>
    <Preloader />
    <div v-if="$route.name !== 'Home'" class="container">
        <HeaderLogin />
    </div>
    <router-view :class="$route.name === 'Home' ? '' : 'container'" />
</template>

<script>
import { mapActions } from "vuex";

import HeaderLogin from "@/components/login/HeaderLogin.vue";
import Preloader from "@/components/Preloader.vue";

export default {
    components: {
        HeaderLogin,
        Preloader,
    },
    methods: {
        ...mapActions(["readToken"]),
    },
    created() {
        this.readToken();
    },
};
</script>

<style lang="scss">
#app {
    text-align: center;
}
body {
    min-height: 90vh;
}
body,
.bg-puma-gray {
    background-color: var(--bs-white);
    background-image: url("./assets/img/background/bg-sm.svg");
    background-repeat: no-repeat;
    background-position: 100% 50%;
    background-size: 75vw 85vh;
}
.btn {
    img {
        min-width: 1rem;
    }
}
</style>
