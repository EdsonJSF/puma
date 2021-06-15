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
                                    v-for="(solicitud, index) in solicitudes"
                                    :key="index"
                                    class="border-5 border-start-0 border-end-0"
                                >
                                    <td class="bg-light">
                                        {{ solicitud.name }}
                                    </td>
                                    <td class="bg-light">
                                        {{ solicitud.solicita }}
                                    </td>
                                    <td>
                                        <button class="btn">
                                            <button class="btn">
                                                <img
                                                    src="../../assets/img/icons/pen-solid.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </button>
                                    </td>
                                    <td>
                                        <button class="btn">
                                            <button class="btn">
                                                <img
                                                    src="../../assets/img/icons/trash-solid.svg"
                                                    alt=""
                                                />
                                            </button>
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
import Profile from "@/components/login/Profile.vue";

export default {
    components: { Profile },
    name: "Solicitudes",
    data() {
        return {
            solicitudes: [
                {
                    name: "data",
                    solicita: "data",
                },
                {
                    name: "data",
                    solicita: "data",
                },
                {
                    name: "data",
                    solicita: "data",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
