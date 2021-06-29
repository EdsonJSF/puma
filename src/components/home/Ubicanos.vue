<template>
    <div class="Ubicanos py-2 px-1 px-sm-3 px-md-4 px-lg-5">
        <div class="d-flex flex-column">
            <div class="d-flex ms-0 ms-md-4">
                <div class="paralelogramo-primary ms-3 mt-2 mt-md-4">
                    <img
                        class="logo-home"
                        src="../../assets/img/logo/logo-sm.png"
                        alt="Logo Puma"
                    />
                </div>
                <div class="d-flex flex-column">
                    <div class="paralelogramo-secondary d-flex ps-5 py-1">
                        <button
                            @click="prevReults"
                            class="bg-transparent triangulo-left"
                        ></button>
                        <button
                            @click="nextReults"
                            class="bg-transparent triangulo-right"
                        ></button>
                    </div>
                    <!-- "Ubicanos" -->
                </div>
            </div>
            <div class="paralelogramo-gray"></div>
            <swiper
                :slidesPerView="3"
                :spaceBetween="30"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                class="mySwiper ubicanos mt-3"
            >
                <swiper-slide
                    class="h-75 d-flex flex-column"
                    v-for="(ubicacion, index) in dataUbicanos"
                    :key="index"
                >
                    <img :src="ubicacion.rutaImagen" :alt="ubicacion.titulo" />
                    <div class="d-flex align-items-end">
                        <h1 class="paralelogramo-primary pe-5">
                            {{ ubicacion.titulo }}
                        </h1>
                        <a class="paralelogramo-primary" href="">ver mas</a>
                    </div>
                    <p class="text-start">
                        {{ ubicacion.contenido }}
                    </p>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Pagination, Autoplay]);

import { mapState } from "vuex";
export default {
    name: "Ubicanos",
    data() {
        return {};
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        nextReults() {
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.ubicanos"
            ).swiper;
            nextPumaSwiper.slideNext();
        },
        prevReults() {
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.ubicanos"
            ).swiper;
            nextPumaSwiper.slidePrev();
        },
    },
    computed: {
        ...mapState(["dataUbicanos"]),
    },
};
</script>
