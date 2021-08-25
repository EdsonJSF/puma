<template>
    <div class="Ubicanos">
        <div class="py-2">
            <div class="d-flex flex-wrap">
                <div
                    class="paralelogramo-primary position-relative row justify-content-center align-items-center ms-3 mt-2 mt-md-4 p-1 px-3"
                >
                    <img
                        class="logo-home p-0 me-2"
                        src="../../assets/img/logo/logo-simple-sm.png"
                        alt="Logo Puma"
                    />
                    <h4 class="position-absolute col-auto ms-5 ps-5">
                        UBICANOS
                    </h4>
                </div>
                <div class="paralelogramo-secondary d-flex ps-5 py-1">
                    <button
                        @click="prevReults"
                        class="triangulo-left bg-transparent"
                    ></button>
                    <button
                        @click="nextReults"
                        class="triangulo-right bg-transparent"
                    ></button>
                </div>
            </div>
            <div class="paralelogramo-gray"></div>
            <swiper
                :slidesPerView="2"
                :spaceBetween="30"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                :breakpoints="{
                    768: {
                        slidesPerView: 3,
                    },
                }"
                class="mySwiper ubicanos mt-4"
            >
                <swiper-slide
                    v-for="(ubicacion, index) in dataUbicanos"
                    :key="index"
                    class="h-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <img
                        :src="`${prefix}/images/${ubicacion.rutaImagen}`"
                        :alt="ubicacion.titulo"
                    />
                    <div class="d-flex flex-wrap align-items-end">
                        <h4 class="paralelogramo-primary pe-5">
                            {{ ubicacion.titulo }}
                        </h4>
                        <a
                            class="paralelogramo-primary text-reset text-nowrap text-decoration-none px-2"
                            :href="ubicacion.link"
                            target="_blank"
                            >Ver mas...</a
                        >
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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Pagination, Autoplay]);

import { mapState } from "vuex";
export default {
    name: "Ubicanos",
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
        ...mapState(["dataUbicanos", "prefix"]),
    },
};
</script>
