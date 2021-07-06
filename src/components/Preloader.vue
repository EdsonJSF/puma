<template>
    <div v-if="preloader" class="Preloader position-absolute">
        <div
            class="Preloader__content d-flex justify-content-center align-items-center w-100 h-100"
        >
            <div class="Preloader__content-animation"></div>
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

    .Preloader__content {
        position: fixed;

        .Preloader__content-animation {
            width: 4rem;
            height: 4rem;
            border: 0.7rem solid var(--bs-secondary);
            border-right-color: var(--bs-primary);
            border-radius: 100%;
            animation: girar 0.7s linear infinite;
        }
    }
}
@keyframes girar {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
