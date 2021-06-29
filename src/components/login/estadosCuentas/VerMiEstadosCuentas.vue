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
                            <tr>
                                <td><div>1</div></td>
                                <td><div>1</div></td>
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
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                    <div class="my-1 p-2">
                        <h5>Ventas de la semana</h5>
                        <p>
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                    <div class="my-1 p-2">
                        <h5>Ventas del mes</h5>
                        <p>
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VerMiEstadosCuentas",
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
