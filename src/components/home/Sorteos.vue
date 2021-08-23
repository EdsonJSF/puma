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
                :breakpoints="{
                    576: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                }"
                class="mySwiper sorteos mt-5"
            >
                <swiper-slide
                    v-for="(sorteo, index) in dataSorteos"
                    :key="index"
                    class="h-100 d-flex flex-column"
                >
                    <div>
                        <img
                            :src="`${prefix}/images/${sorteo.rutaImagen}`"
                            :alt="sorteo.titulo"
                        />
                        <h4 class="text-start">{{ sorteo.titulo }}</h4>
                    </div>
                </swiper-slide>
            </swiper>

            <div v-for="(video, index) in dataVideo" :key="index">
                <!-- <video
                    v-if="!index"
                    :src="`${prefix}/videos/${video.rutaVideo}`"
                    class="videoSorteo w-auto mw-100"
                    controls
                ></video> -->
                <iframe
                    :src="video.link"
                    class="videoSorteo w-auto mw-100"
                    controls
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
        ...mapState(["dataSorteos", "dataVideo", "prefix"]),
    },
};
</script>

<style lang="scss" scoped>
.videoSorteo {
    max-height: 30vh;
}
</style>
