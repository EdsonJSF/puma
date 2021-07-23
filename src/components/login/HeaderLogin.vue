<template>
    <div class="HeaderLogin">
        <div class="d-flex flex-column mb-3">
            <!-- LOGO & NAV -->
            <div class="d-flex flex-column flex-md-row">
                <div class="paralelogramo-primary mt-2 mt-md-4">
                    <img
                        class="logo-home"
                        src="../../assets/img/logo/logo-sm.png"
                        alt="Logo Puma"
                    />
                </div>
                <Routes />
            </div>

            <!-- SEARCH BTN -->
            <div
                v-if="
                    $route.path != `/${rol}/perfil` &&
                        $route.path != `/${rol}/reportar-gastos`
                "
                class="d-flex align-self-end mt-3"
            >
                <div class="paralelogramo-primary d-flex align-items-center">
                    <form
                        @submit.prevent="sendSearch(search), (search = '')"
                        id="search"
                        class="collapse"
                    >
                        <input
                            v-model="search"
                            class="bg-transparent"
                            type="text"
                            :placeholder="toSearch || 'Buscar'"
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
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Routes from "./Routes.vue";

export default {
    name: "HeaderLogin",
    components: {
        Routes,
    },
    data() {
        return {
            search: "",
        };
    },
    methods: {
        ...mapActions(["sendSearch"]),
    },
    computed: {
        ...mapState(["toSearch", "rol"]),
    },
};
</script>
