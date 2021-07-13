<template>
    <div class="VerMiEstadosCuentas">
        <div class="row rounded-3">
            <div class="col-6">
                <div class="VerMiEstadosCuentas__fechas table-responsive my-3">
                    <table
                        class="table table-borderless table-hover align-middle text-start mt-1"
                    >
                        <thead>
                            <th><div>Fecha</div></th>
                            <th><div>Ventas</div></th>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(estado, index) in VerMiEstadosCuentas"
                                :key="index"
                            >
                                <td>
                                    <div>{{ estado.Fecha }}</div>
                                </td>
                                <td>
                                    <div>{{ estado.Estado }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-6">
                <div
                    class="VerMiEstadosCuentas__reportes d-flex flex-column my-4 text-start"
                >
                    <div class="my-1 p-2">
                        <h5>Ventas del día</h5>
                        <p>
                            {{ ventasDia }}
                        </p>
                    </div>
                    <div class="my-1 p-2">
                        <h5>Ventas de la semana</h5>
                        <p>
                            {{ ventasSemana }}
                        </p>
                    </div>
                    <div class="my-1 p-2">
                        <h5>Ventas del mes</h5>
                        <p>
                            {{ ventasMes }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "VerMiEstadosCuentas",
    data() {
        return {
            VerMiEstadosCuentas: [],
            ventasDia: "",
            ventasSemana: "",
            ventasMes: "",
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getMiEstadosCuentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/estadodecuenta`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.VerMiEstadosCuentas =
                        resData["Datos del modelo asociado al vendedor"].ventas;
                    this.ventasDia = resData["Ventas del dia del usuario"];
                    this.ventasSemana =
                        resData["Ventas de la semana del usuario"];
                    this.ventasMes = resData["Ventas del mes del usuario"];
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getMiEstadosCuentas();
    },
};
</script>

<style lang="scss" scoped>
.VerMiEstadosCuentas > div {
    background: var(--bs-dark);

    .VerMiEstadosCuentas__fechas {
        table {
            th,
            td {
                border: 0.5rem solid transparent;
                padding: 0;
                div {
                    padding: 0 5px;
                    min-height: 2rem;
                    background: var(--bs-light);
                    white-space: nowrap;
                }
            }
            th:first-child,
            td:first-child {
                border-left: none;
            }
            th:last-child,
            td:last-child {
                border-right: none;
            }
        }
    }
    .VerMiEstadosCuentas__reportes > div {
        background: var(--bs-light);
    }
}
</style>
