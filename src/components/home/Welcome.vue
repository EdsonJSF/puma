<template>
    <div class="Welcome">
        <div class="py-2">
            <div class="d-flex flex-column">
                <div class="d-flex flex-wrap">
                    <div class="paralelogramo-primary ms-3 mt-2 mt-md-4">
                        <img
                            class="logo-home"
                            src="../../assets/img/logo/logo-sm.png"
                            alt="Logo Puma"
                        />
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex">
                            <a
                                @click="toLogin = false"
                                :class="toLogin ? '' : 'active'"
                                class="paralelogramo m-0 px-2 pt-3 pb-1"
                                >Inicio</a
                            >
                            <a
                                @click="toLogin = !toLogin"
                                :class="toLogin ? 'active' : ''"
                                class="paralelogramo m-0 px-2 pt-3 pb-1"
                                >Ingreso</a
                            >
                        </div>
                        <div class="paralelogramo-gray"></div>
                    </div>
                    <Ingreso v-if="toLogin" class="d-none d-lg-block w-50" />
                </div>
                <div class="align-self-end">
                    <div
                        class="paralelogramo-primary d-flex align-items-center"
                    >
                        <form
                            @submit.prevent="sendSearch(toSearch)"
                            id="search"
                            class="collapse"
                        >
                            <input
                                v-model="toSearch"
                                class="bg-transparent"
                                type="text"
                                placeholder="Buscar"
                                required
                            />
                        </form>
                        <button
                            class="btn btn-sm navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#search"
                            aria-controls="search"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <img
                                class="ico-search"
                                src="../../assets/img/icons/search-solid.svg"
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="paralelogramo-secondary d-flex justify-content-around flex-wrap mx-3 mx-md-0 mt-1 px-2 px-md-5"
            >
                <a
                    @click="toPumaSwiper"
                    v-for="(navigation, index) in navigations"
                    :key="index"
                    :data-item="index"
                    class="paralelogramo pt-2 px-1 mx-1 px-md-2 mx-md-2"
                    >{{ navigation }}</a
                >
            </div>
            <div>
                <Ingreso v-if="toLogin" class="d-block d-lg-none mt-3" />
            </div>
        </div>
    </div>
</template>

<script>
import Ingreso from "@/components/home/plugins/Ingreso.vue";
export default {
    name: "Welcome",
    components: {
        Ingreso,
    },
    data() {
        return {
            toLogin: false,
            toSearch: "",
            navigations: [
                "Resultados",
                "Sorteos",
                "Ubicanos",
                "Testimonios",
                "Contactanos",
            ],
        };
    },
    methods: {
        toPumaSwiper(e) {
            let eIndex = Number(e.target.dataset.item);
            eIndex += 2;
            const nextPumaSwiper = document.querySelector(
                ".swiper-container.pumaSwiper"
            ).swiper;
            nextPumaSwiper.slideTo(eIndex);
        },
        clearInput() {
            this.toSearch = "";
        },
        sendSearch(search) {
            alert(`Voy a buscar: ${search}`);
            this.clearInput();
        },
    },
};
</script>

<style lang="scss" scoped>
.Welcome a {
    font-weight: 500;
    text-decoration: none;
    color: var(--bs-white);
    cursor: pointer;
}
.Welcome a:hover,
.Welcome a.active {
    color: var(--bs-green);
}
</style>
