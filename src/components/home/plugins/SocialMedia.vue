<template>
    <div class="SocialMedia pumaFollows">
        <div class="collapse" id="menuSocialMedia">
            <div class="d-flex flex-column bg-dark ms-3 me-2 py-2">
                <a
                    class="mb-2"
                    href="https://www.instagram.com/"
                    target="_blanck"
                >
                    <img
                        src="../../../assets/img/icons/instagram-brands.svg"
                        alt="Instagram"
                    />
                </a>
                <a
                    class="mb-2"
                    href="https://www.facebook.com/"
                    target="_blanck"
                >
                    <img
                        src="../../../assets/img/icons/facebook-square-brands.svg"
                        alt="Facebook"
                    />
                </a>
                <a
                    class="mb-2"
                    href="https://wa.me/584247469327"
                    target="_blanck"
                >
                    <img
                        src="../../../assets/img/icons/whatsapp-brands.svg"
                        alt="Whatsapp"
                    />
                </a>
            </div>
        </div>
        <div class="pumaFollows__btn container-fluid">
            <button
                class="paralelogramo-secondary navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menuSocialMedia"
                aria-controls="menuSocialMedia"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <img src="../../../assets/img/icons/heart-solid.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SocialMedia",
};
</script>

<style lang="scss" scoped>
.pumaFollows {
    position: absolute;
    bottom: 4.5rem;
    right: 1rem;
    z-index: 1;
    img {
        width: 1.5rem;
        filter: invert(1);
    }
}
</style>
