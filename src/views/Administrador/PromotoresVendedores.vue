<template>
    <div class="PromotoresVendedores">
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
                                <th>NIT</th>
                                <th>Ganancia</th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(empleado, index) in empleados"
                                    :key="index"
                                    class="border-5 border-start-0 border-end-0"
                                >
                                    <td class="bg-light">
                                        {{ empleado.name }}
                                    </td>
                                    <td class="bg-light">{{ empleado.nit }}</td>
                                    <td class="bg-light">
                                        {{ empleado.ganancia }}%
                                    </td>
                                    <td>
                                        <button class="btn">
                                            <img
                                                src="../../assets/img/icons/pen-solid.svg"
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button class="btn">
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
import Profile from "@/components/login/Profile.vue";

export default {
    name: "PromotoresVendedores",
    components: { Profile },
    data() {
        return {
            empleados: [
                {
                    name: "data",
                    nit: "data",
                    ganancia: "data",
                },
                {
                    name: "data",
                    nit: "data",
                    ganancia: "data",
                },
                {
                    name: "data",
                    nit: "data",
                    ganancia: "data",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.rounded-3 {
    background: var(--bs-dark);
}
.text-light {
    text-shadow: 2px 2px 1.5px #222;
}
</style>
