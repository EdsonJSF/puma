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
    width: 4rem;
    height: 4rem;
    border: 0.7rem solid var(--bs-secondary);
    border-right-color: var(--bs-primary);
    border-radius: 100%;
    animation: preloader 0.7s linear infinite;
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
