<template>
    <div class="MisSolicitudes">
        <div class="MisSolicitudes__options rounded-3 py-2">
            <div class="table-responsive">
                <table class="table table-borderless table-hover align-middle">
                    <thead>
                        <th><div>Fecha</div></th>
                        <th><div>Categoria</div></th>
                        <th><div>Credito Solicitado</div></th>
                        <th><div>Cuotas</div></th>
                        <th><div>Mobiliario</div></th>
                        <th><div>Ubicación</div></th>
                        <th><div>Solicitud</div></th>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(solicitud, index) in MisSolicitudes"
                            :key="index"
                        >
                            <td>
                                <div>
                                    {{ arreglarCadena(solicitud.created_at) }}
                                </div>
                            </td>
                            <td>
                                <div>{{ solicitud.Categoria }}</div>
                            </td>
                            <td>
                                <div>{{ solicitud.CantidadSolicitada }}</div>
                            </td>
                            <td>
                                <div>{{ solicitud.Cuotas }}</div>
                            </td>
                            <td>
                                <div>{{ solicitud.MobiliarioSolicitado }}</div>
                            </td>
                            <td>
                                <div>{{ solicitud.Ubicacion }}</div>
                            </td>
                            <td>
                                <div>{{ solicitud.Solicitud }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "MisSolicitudes",
    data() {
        return {
            MisSolicitudes: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),
        async getMisSolicitudes() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/mostrarsolicitud`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.MisSolicitudes = resData.solicitudes;
                }
            } catch (error) {
                console.log(error);
                this.showPreloader(false);
            }
        },
        arreglarCadena(cadena) {
            let newCadena = cadena.split("T");
            return newCadena[0].replace(/-/g, "/");
        },
    },
    computed: {
        ...mapState(["token", "rol", "prefix"]),
    },
    created() {
        this.getMisSolicitudes();
    },
};
</script>

<style lang="scss" scoped>
.MisSolicitudes__options {
    background: var(--bs-dark);
    table {
        th,
        td {
            border: 0.5rem solid transparent;
            padding: 0;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 5px;
                min-height: 2rem;
                background: var(--bs-light);
                white-space: nowrap;
                select {
                    background: transparent;
                    appearance: none;
                    outline: none;
                }
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
</style>
