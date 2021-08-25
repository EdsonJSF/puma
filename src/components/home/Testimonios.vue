<template>
    <div class="Testimonios">
        <div class="py-2">
            <div>
                <h1>
                    Testimonios
                </h1>
            </div>
            <HeaderComponents />
            <swiper
                :slidesPerView="2"
                :spaceBetween="30"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                :breakpoints="{
                    576: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                }"
                class="mySwiper testimonios mt-4"
            >
                <swiper-slide
                    v-for="(testimonio, index) in dataTestimonios"
                    :key="index"
                    class="h-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <img
                        :src="`${prefix}/images/${testimonio.rutaImagen}`"
                        :alt="testimonio.titulo"
                    />
                    <h4>{{ testimonio.titulo }}</h4>
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
import HeaderComponents from "@/components/home/plugins/HeaderComponents.vue";

export default {
    name: "Testimonios",
    components: {
        HeaderComponents,

        Swiper,
        SwiperSlide,
    },
    computed: {
        ...mapState(["dataTestimonios", "prefix"]),
    },
};
</script>
