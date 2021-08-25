<template>
    <div class="Resultados">
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
                        RESULTADOS
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
                class="mySwiper resultados mt-4"
            >
                <swiper-slide
                    v-for="(resultado, index) in dataResultados"
                    :key="index"
                    class="h-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <img
                        :src="`${prefix}/images/${resultado.rutaImagen}`"
                        :alt="resultado.titulo"
                    />
                    <div class="d-flex flex-wrap align-items-end">
                        <h4 class="paralelogramo-primary pe-5">
                            {{ resultado.titulo }}
                        </h4>
                        <a
                            class="paralelogramo-primary text-reset text-nowrap text-decoration-none px-2"
                            :href="resultado.link"
                            target="_blank"
                            >Ver mas...</a
                        >
                    </div>
                    <p class="text-start">
                        {{ resultado.contenido }}
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
    name: "Resultados",
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        nextReults() {
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.resultados"
            ).swiper;
            nextPumaSwiper.slideNext();
        },
        prevReults() {
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.resultados"
            ).swiper;
            nextPumaSwiper.slidePrev();
        },
    },
    computed: {
        ...mapState(["dataResultados", "prefix"]),
    },
};
</script>
