<template>
    <div id="HeaderLogin">
        <div class="d-flex flex-column">
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
            <div class="d-flex align-self-end mt-3">
                <div class="paralelogramo-primary">
                    <img
                        class="ico-search p-2"
                        src="../../assets/img/icons/search-solid.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Routes from "./Routes.vue";

export default {
    name: "HeaderLogin",
    components: {
        Routes,
    },
};
</script>
