<template>
    <div id="Login">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Profile />
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/login/Profile.vue";

import { mapActions } from "vuex";

export default {
    name: "Login",
    components: { Profile },
    methods: {
        ...mapActions(["getDataUsers"]),
    },
    created() {
        this.getDataUsers();
    },
};
</script>
