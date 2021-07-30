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
            <swiper-slide
                ><img src="../../../assets/img/background/1.jpg" alt=""
            /></swiper-slide>
            <swiper-slide
                ><img src="../../../assets/img/background/2.jpg" alt=""
            /></swiper-slide>
            <swiper-slide
                ><img src="../../../assets/img/background/3.jpg" alt=""
            /></swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Mousewheel, Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Mousewheel, Pagination, Autoplay]);

export default {
    name: "SwiperBG",
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>
