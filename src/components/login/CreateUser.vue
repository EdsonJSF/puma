<template>
    <div id="CreateUser">
        CreateUser
        <form @submit.prevent="addUsuario(usuario)" class="d-flex flex-column">
            <div class="d-flex justify-content-around">
                <input
                    v-model="usuario.name"
                    type="name"
                    class="w-25"
                    placeholder="Nombre"
                    required
                />
                <input
                    v-model="usuario.dni"
                    type="id"
                    class="w-25"
                    placeholder="NIT"
                    required
                />
                <input
                    v-model="usuario.ganancia"
                    type="number"
                    class="w-25"
                    placeholder="Ganancia"
                    required
                />
            </div>
            <button type="submit">Crear</button>
        </form>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "CreateUser",
    data() {
        return {
            usuario: {
                name: "",
                dni: "",
                ganancia: "",
            },
        };
    },
    methods: {
        async addUsuario(newUser) {
            console.log(newUser);
        },
    },
    computed: {
        ...mapState(["token", "prefix"]),
    },
};
</script>
