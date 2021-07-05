<template>
    <div
        v-if="preloader"
        class="Preloader position-absolute d-flex justify-content-center align-items-center"
    >
        <div class="Preloader__content">
            <div class="preloader__animation"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Preloader",
    computed: {
        ...mapState(["preloader"]),
    },
};
</script>

<style lang="scss" scoped>
.Preloader {
    z-index: 1000;
    min-width: 100vw;
    min-height: 100vh;
}
.preloader__animation {
    width: 7rem;
    height: 7rem;
    border: 1.5rem solid var(--bs-secondary);
    border-right-color: transparent;
    border-radius: 100%;
    animation: preloader 1s infinite;
}
@keyframes preloader {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
