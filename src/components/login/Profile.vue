<template>
    <div class="Profile">
        <div class="Profile d-flex flex-column align-items-start">
            <img
                class="Profile__img rounded-3 p-2 "
                src="../../assets/img/img.jpg"
                alt=""
            />
            <div
                class="Profile__data-title d-flex flex-column align-items-start my-2"
            >
                <h5 class="m-0">Nombre</h5>
                <p class="m-0">Informacion del perfil</p>
                <p class="m-0">Informacion del perfil</p>
                <p class="m-0">Informacion del perfil</p>
            </div>
            <div
                class="Profile__data-content d-flex flex-column align-items-start my-2"
            >
                <h6 class="m-0">Saldo</h6>
                <p class="m-0">70.000 cop</p>
                <h6 class="m-0">Credito</h6>
                <p class="m-0">0.00 cop</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
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
