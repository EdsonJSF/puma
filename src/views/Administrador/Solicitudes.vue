<template>
    <div class="Solicitudes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Profile />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="d-flex flex-column rounded-3 my-2 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-hover table-borderless align-middle"
                        >
                            <thead>
                                <th>Nombre Apellido</th>
                                <th>Solicita</th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(solicitud, index) in Solicitudes"
                                    :key="index"
                                    class="border-5 border-start-0 border-end-0"
                                >
                                    <td class="bg-light">
                                        {{ solicitud.Nombre }}
                                    </td>
                                    <td class="bg-light">
                                        {{ solicitud.MobiliarioSolicitado }}
                                    </td>
                                    <td>
                                        <button
                                            @click="aprobSolicitudes(solicitud)"
                                            class="btn"
                                        >
                                            <img
                                                src="../../assets/img/icons/check-square-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            @click="negarSolicitudes(solicitud)"
                                            class="btn"
                                        >
                                            <img
                                                src="../../assets/img/icons/trash-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn text-light  align-self-end mx-5">
                        Agregar +
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import Profile from "@/components/login/Profile.vue";

export default {
    name: "Solicitudes",
    components: { Profile },
    data() {
        return {
            Solicitudes: [],
            SolicitudesAceptadas: [],
            SolicitudesRechazadas: [],
        };
    },
    methods: {
        async getSolicitudes() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/SolicitudesAdministrador?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.Solicitudes = resData;
            } catch (error) {
                console.log(error);
            }
        },
        async getSolicitudesAceptadas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/solicitudesAceptadas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                console.log(resData);

                this.SolicitudesAceptadas = resData["Solicitudes Aceptadas"];
            } catch (error) {
                console.log(error);
            }
        },
        async getSolicitudesRechazadas() {
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/solicitudesRechazadas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                console.log(resData);

                this.SolicitudesRechazadas = resData["Solicitudes Rechazadas"];
            } catch (error) {
                console.log(error);
            }
        },
        async aprobSolicitudes(data) {
            console.log(this.SolicitudesAceptadas);
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/modificarsolicitud/${data.id}?token=${this.token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const resData = await res.json();

                this.SolicitudesAceptadas.unshift(data);
                this.Solicitudes.splice(this.Solicitudes.indexOf(data), 1);

                console.log(this.SolicitudesAceptadas);
            } catch (error) {
                console.log(error);
            }
        },
        async negarSolicitudes(data) {
            console.log(this.SolicitudesRechazadas);
            try {
                const res = await fetch(
                    `${this.prefix}/api/administrador/eliminarsolicitud/${data.id}?token=${this.token}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();

                this.SolicitudesRechazadas.unshift(data);
                this.Solicitudes.splice(this.Solicitudes.indexOf(data), 1);

                console.log(this.SolicitudesRechazadas);
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(["token", "prefix"]),
    },
    created() {
        this.getSolicitudes();
        this.getSolicitudesAceptadas();
        this.getSolicitudesRechazadas();
    },
};
</script>

<style lang="scss" scoped></style>
