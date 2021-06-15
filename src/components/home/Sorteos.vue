<template>
    <div id="Sorteos" class="py-3">
        <div>
            <h1>
                Sorteos
            </h1>
        </div>
        <HeaderComponents />
        <swiper
            :slidesPerView="3"
            :spaceBetween="30"
            :loop="true"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            class="mySwiper sorteos mt-3"
        >
            <swiper-slide v-for="(sorteo, index) in dataSorteos" :key="index">
                <div>
                    <img :src="sorteo.rutaImagen" :alt="sorteo.titulo" />
                    <p>{{ sorteo.titulo }}</p>
                </div>
            </swiper-slide>
        </swiper>

        <div>
            <!-- {{ dataSorteos[0].rutaVideo }} -->
            <iframe
                width="auto"
                height="auto"
                src="https://www.youtube.com/embed/Hq24_r9Cuig"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
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
import HeaderComponents from "@/components/home/plugins/HeaderComponents.vue";

export default {
    name: "Sorteos",
    components: {
        HeaderComponents,

        Swiper,
        SwiperSlide,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(["dataSorteos"]),
    },
};
</script>
