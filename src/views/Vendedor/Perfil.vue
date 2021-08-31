<template>
    <div class="Login">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4 my-2 my-md-0">
                <Profile />
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/login/Profile.vue";

export default {
    name: "Login",
    components: { Profile },
};
</script>
