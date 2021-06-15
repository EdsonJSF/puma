<template>
    <div id="Finanzas">
        <div class="d-flex justify-content-center m-1 py-1">
            <table>
                <tbody class="text-start">
                    <tr>
                        <td>Ventas del día</td>
                        <td>70.000 cop</td>
                    </tr>
                    <tr>
                        <td>Ventas del mes</td>
                        <td>700.000 cop</td>
                    </tr>
                    <tr>
                        <td>Acumulado</td>
                        <td>750.000 cop</td>
                    </tr>
                    <tr>
                        <td>Premios</td>
                        <td>150.000 cop</td>
                    </tr>
                    <tr>
                        <td>Gastos</td>
                        <td>80.000 cop</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: "Finanzas",
};
</script>
<style lang="scss" scoped>
td {
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
}
</style>
