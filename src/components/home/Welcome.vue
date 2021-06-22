<template>
    <div class="Welcome w-100 py-2 px-1 px-sm-3 px-md-4 px-lg-5">
        <div class="d-flex flex-column flex-md-row justify-content-between">
            <div class="d-flex ms-0 ms-md-4">
                <div class="paralelogramo-primary ms-3 mt-2 mt-md-4">
                    <img
                        class="logo-home"
                        src="../../assets/img/logo/logo-sm.png"
                        alt="Logo Puma"
                    />
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex">
                        <a
                            @click="login(false)"
                            :class="toLogin ? '' : 'active'"
                            class="paralelogramo m-0 px-2 pt-3 pb-1"
                            >Inicio</a
                        >
                        <a
                            @click="login(true)"
                            :class="toLogin ? 'active' : ''"
                            class="paralelogramo m-0 px-2 pt-3 pb-1"
                            >Ingreso</a
                        >
                    </div>
                    <div class="paralelogramo-gray"></div>
                </div>
                <Ingreso v-if="toLogin" class="d-none d-lg-flex" />
            </div>
            <div class="d-flex align-self-end">
                <div class="paralelogramo-primary">
                    <img
                        class="ico-search p-1 p-md-2"
                        src="../../assets/img/icons/search-solid.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <div
            class="paralelogramo-secondary d-flex justify-content-around flex-wrap mx-3 mx-md-0 mt-1 px-2 px-md-5"
        >
            <a
                @click="toPumaSwiper"
                v-for="(navigation, index) in navigations"
                :key="index"
                :data-item="index"
                class="paralelogramo pt-2 px-1 mx-1 px-md-2 mx-md-2"
                >{{ navigation }}</a
            >
        </div>
        <div>
            <Ingreso v-if="toLogin" class="d-flex d-lg-none mx-3 mt-4" />
        </div>
    </div>
</template>

<script>
import Ingreso from "@/components/home/plugins/Ingreso.vue";
export default {
    name: "Welcome",
    components: {
        Ingreso,
    },
    data() {
        return {
            toLogin: false,
            navigations: [
                "Resultados",
                "Sorteos",
                "Ubicanos",
                "Testimonios",
                "Contactanos",
            ],
        };
    },
    methods: {
        toPumaSwiper(e) {
            let eIndex = Number(e.target.dataset.item);
            eIndex += 2;
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.pumaSwiper"
            ).swiper;
            nextPumaSwiper.slideTo(eIndex);
        },
        login(boolean) {
            this.toLogin = boolean;
        },
    },
};
</script>

<style scoped>
.Welcome a {
    font-weight: 500;
    text-decoration: none;
    color: var(--bs-white);
    cursor: pointer;
}
.Welcome a:hover,
.Welcome a.active {
    color: var(--bs-green);
}
</style>
