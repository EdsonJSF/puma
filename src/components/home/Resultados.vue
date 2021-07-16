<template>
    <div class="Resultados">
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
                        <h3>RESULTADOS</h3>
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
                :slidesPerView="2"
                :spaceBetween="30"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                class="mySwiper resultados mt-3"
            >
                <swiper-slide
                    class="h-100 d-flex flex-column"
                    v-for="(resultado, index) in dataResultados"
                    :key="index"
                >
                    <img
                        :src="`${prefix}/images/${resultado.rutaImagen}`"
                        :alt="resultado.titulo"
                    />
                    <div class="d-flex flex-wrap align-items-end">
                        <h1 class="paralelogramo-primary pe-5">
                            {{ resultado.titulo }}
                        </h1>
                        <a
                            @click.prevent=""
                            class="paralelogramo-primary text-reset text-nowrap text-decoration-none px-2"
                            href=""
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
    data() {
        return {};
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
