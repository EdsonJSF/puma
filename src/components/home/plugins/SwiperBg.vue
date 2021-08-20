<template>
    <div class="SwiperBg">
        <swiper
            :loop="true"
            :centeredSlides="true"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            class="mySwiper position-absolute"
        >
            <swiper-slide v-for="(imagen, index) in dataSlider" :key="index">
                <img
                    :src="`${prefix}/images/${imagen.rutaImagen}`"
                    :alt="imagen.titulo"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Mousewheel, Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Mousewheel, Pagination, Autoplay]);

import { mapState } from "vuex";

export default {
    name: "SwiperBG",
    components: {
        Swiper,
        SwiperSlide,
    },
    computed: {
        ...mapState(["dataSlider", "prefix"]),
    },
};
</script>
