<template>
    <div class="Resumenes">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-4">
                <Finanzas />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <div class="Resumenes__data rounded-3 py-2">
                    <div class="table-responsive">
                        <table
                            class="table table-borderless table-hover align-middle"
                        >
                            <thead>
                                <th><div>Fecha</div></th>
                                <th><div>Número</div></th>
                                <th><div>Valor a aportar</div></th>
                                <th><div>Lotería</div></th>
                                <th><div>Tipo</div></th>
                                <th><div>Vendedor</div></th>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(resumen, index) in ResumenVentas"
                                    :key="index"
                                >
                                    <td>
                                        <div>
                                            {{
                                                resumen.Fecha.replace(/-/g, "/")
                                            }}
                                        </div>
                                    </td>
                                    <td>
                                        <div>{{ resumen.Numero }}</div>
                                    </td>
                                    <td>
                                        <div>{{ resumen.Valorapuesta }}</div>
                                    </td>
                                    <td>
                                        <div>{{ resumen.Loteria }}</div>
                                    </td>
                                    <td>
                                        <div>{{ resumen.Tipo }}</div>
                                    </td>
                                    <td>
                                        <div>{{ resumen.Nombrepromotor }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Finanzas from "@/components/login/Finanzas.vue";

export default {
    name: "Resumenes",
    components: { Finanzas },
    data() {
        return {
            ResumenVentas: [],
        };
    },
    methods: {
        ...mapActions(["logout", "showPreloader"]),

        async getResumenVentas() {
            this.showPreloader(true);
            try {
                const res = await fetch(
                    `${this.prefix}/api/${this.rol}/resumenventas?token=${this.token}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await res.json();
                this.showPreloader(false);

                if (resData.status === "Token is Expired") {
                    this.logout();
                } else {
                    this.ResumenVentas = resData;
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
        this.getResumenVentas();
    },
};
</script>

<style lang="scss" scoped>
.Resumenes__data {
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
