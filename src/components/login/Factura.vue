<template>
    <div class="Factura">
        <div class="d-flex flex-column align-items-center">
            <h1>Código del vendedor: {{ data.codigo }}</h1>
            <h1>Fecha: {{ data.fecha }} Hora: {{ data.hora }}</h1>
            <table class="table table-borderless align-middle">
                <thead class="text-center">
                    <th>Número</th>
                    <th>Valor a apostar</th>
                    <th>Lotería</th>
                    <th>Tipo</th>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(venta, index) in ventas" :key="index">
                        <td>{{ venta.Numero }}</td>
                        <td>$ {{ venta.Valorapuesta }}</td>
                        <td>{{ venta.Loteria }}</td>
                        <td>{{ venta.Tipo }}</td>
                    </tr>
                </tbody>
            </table>
            <h1 class="align-self-end">Total a pagar: {{ data.total }}</h1>
            <p class="mt-auto text-muted fw-lighter fst-italic">
                Vencimiento del ticket 8 días
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Factura",
    props: {
        ventas: Array,
        data: Object,
    },
};
</script>
