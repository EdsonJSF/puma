<template>
    <div class="Profile">
        <div class="Profile d-flex flex-column align-items-start">
            <img
                v-if="userPerfil.foto"
                :src="`${prefix}/images/${userPerfil.foto}`"
                class="Profile__img rounded-3 p-2 "
                alt=""
            />
            <div
                class="Profile__data-title d-flex flex-column align-items-start my-2"
            >
                <h5 class="m-0">{{ userPerfil.name }}</h5>
                <p class="m-0">{{ userPerfil.email }}</p>
                <p class="m-0">{{ userPerfil.direccion }}</p>
                <p class="m-0">{{ userPerfil.telefono }}</p>
            </div>
            <div
                v-if="rol !== 'administrador'"
                class="Profile__data-content d-flex flex-column align-items-start my-2"
            >
                <h6 class="m-0">Saldo</h6>
                <p class="m-0">{{ userPerfil.balance }} cop</p>
                <h6 class="m-0">Credito</h6>
                <p class="m-0">0.00 cop</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Profile",
    data() {
        return {
            userPerfil: "",
        };
    },
    methods: {
        ...mapActions(["getPerfil"]),
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    async created() {
        const query = await this.getPerfil();
        this.userPerfil = query["Datos del usuario"];
    },
};
</script>

<style lang="scss" scoped>
.Profile {
    .Profile__img {
        background: var(--bs-dark);
        width: 10rem;
    }
}
</style>
