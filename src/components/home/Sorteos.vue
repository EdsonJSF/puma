<template>
    <div class="Sorteos">
        <div class="py-2">
            <div>
                <h1>
                    Sorteos
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
                class="mySwiper sorteos mt-3"
            >
                <swiper-slide
                    v-for="(sorteo, index) in dataSorteos"
                    :key="index"
                >
                    <div>
                        <img
                            :src="`${prefix}/images/${sorteo.rutaImagen}`"
                            :alt="sorteo.titulo"
                        />
                        <p>{{ sorteo.titulo }}</p>
                    </div>
                </swiper-slide>
            </swiper>

            <div>
                <!-- TODO configurar el video -->
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
    name: "Sorteos",
    components: {
        HeaderComponents,

        Swiper,
        SwiperSlide,
    },
    computed: {
        ...mapState(["dataSorteos", "prefix"]),
    },
};
</script>
