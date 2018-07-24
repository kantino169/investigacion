<template>
<div>
    <table class="q-table bordered full-width"> 
        <tr>
            <td>Id</td>
            <td>Descripcion</td>
            <td>Monto</td>
            <td>Cantidad</td>
            <td colspan="2"></td>
        </tr>
        <tr v-for="equipo in equipos"
            :key="equipo.id">
            <td class="">{{equipo.id}}</td>
            <td class="">{{equipo.descripcion}}</td>
            <td class="">{{equipo.monto}}</td>
            <td class="">{{equipo.cantidad}}</td>
            <td><button class="orange" @click="editLine(grupo)">Modificar linea</button></td>
            <td><button class="red" @click="confirmRemoval(grupo)">Eliminar linea</button></td>
        </tr>
    </table>
    <button class="primary ">Crear nuevo grupo</button>
</div>
</template>
