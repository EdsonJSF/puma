<template>
    <div class="Home">
        <SwiperBg />
        <swiper
            :direction="'vertical'"
            :slidesPerView="1"
            :loop="true"
            :mousewheel="true"
            class="mySwiper pumaSwiper"
        >
            <swiper-slide>
                <Welcome class="container" />
            </swiper-slide>
            <swiper-slide class="bg-puma-gray">
                <Resultados class="container" />
            </swiper-slide>
            <swiper-slide class="bg-puma-gray">
                <Sorteos class="container" />
            </swiper-slide>
            <swiper-slide class="bg-puma-gray">
                <Ubicanos class="container" />
            </swiper-slide>
            <swiper-slide class="bg-puma-gray">
                <Testimonios class="container" />
            </swiper-slide>
            <swiper-slide class="bg-puma-gray">
                <Contactanos class="container h-100" />
            </swiper-slide>
            <SocialMedia />
        </swiper>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Mousewheel, Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Mousewheel, Pagination, Autoplay]);

/* COMPONETS VUE */
import Welcome from "@/components/home/Welcome.vue";
import Resultados from "@/components/home/Resultados.vue";
import Sorteos from "@/components/home/Sorteos.vue";
import Ubicanos from "@/components/home/Ubicanos.vue";
import Testimonios from "@/components/home/Testimonios.vue";
import Contactanos from "@/components/home/Contactanos.vue";
import SocialMedia from "@/components/home/plugins/SocialMedia.vue";
import SwiperBg from "@/components/home/plugins/SwiperBg.vue";

import { mapActions } from "vuex";

export default {
    components: {
        Welcome,
        Resultados,
        Sorteos,
        Ubicanos,
        Testimonios,
        Contactanos,
        SocialMedia,
        SwiperBg,

        // Swiper Module
        Swiper,
        SwiperSlide,
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions(["getDataHome"]),
    },
    created() {
        this.getDataHome();
    },
};
</script>

<style lang="scss" scoped></style>
