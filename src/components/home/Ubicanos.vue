<template>
    <div class="Ubicanos">
        <div class="py-2">
            <div class="d-flex flex-wrap">
                <div
                    class="paralelogramo-primary d-flex align-items-end ms-3 mt-2 mt-md-4 p-1 px-3"
                >
                    <img
                        class="logo-home"
                        src="../../assets/img/logo/tigre.png"
                        alt="Logo Puma"
                    />
                    <div>
                        <h3>UBICANOS</h3>
                        <div class="d-flex justify-content-around">
                            <h5>★</h5>
                            <h5>★</h5>
                            <h5>★</h5>
                            <h5>★</h5>
                            <h5>★</h5>
                        </div>
                    </div>
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
                    <img
                        :src="`${prefix}/images/${ubicacion.rutaImagen}`"
                        :alt="ubicacion.titulo"
                    />
                    <div class="d-flex align-items-end">
                        <h1 class="paralelogramo-primary pe-5">
                            {{ ubicacion.titulo }}
                        </h1>
                        <a
                            @click.prevent=""
                            class="paralelogramo-primary text-reset text-nowrap text-decoration-none px-2"
                            href=""
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
        ...mapState(["dataUbicanos", "prefix"]),
    },
};
</script>
