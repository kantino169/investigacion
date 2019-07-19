<template>
  <q-page padding>
    <h5>Anexos</h5>
    <p>Para añadir los anexos correspondientes al proyecto subirlos en el siguiente modulo. Por cualquier duda apretar en mas imformacion</p>
    <q-uploader
      url="http://localhost:3000/api/anexos/"
      :multiple="true"
      :auto-expand="true"
      :additional-fields="[
        {name: 'idProyecto', value: this.proyecto.id},
        {name: 'idUsuario', value: this.$store.state.usuario.id}
      ]"
    />
    <q-collapsible icon="help_outline" label="Mas informacion">
      <div>
        - Solicitud de autorización de la Institución donde se pretende realizar el estudio <br>
        - Invitación a la participación del estudio y Consentimiento Informado<br>
        - Especificaciones de Técnicas y Métodos de Estudio<br>
        - Descripción de tests, maniobras o procedimientos <br>
        - Protocolos de Experimentación <br>
        - Fórmulas, Reactivos, etc. <br>
        - Constancia de aprobación del Comité de Ética de la UAP, en caso de trabajar con personas o animales (adjuntar la misma si ya fue presentado al Comité).
      </div>
    </q-collapsible>
    <div class="row q-mt-lg">
      <div class="col">
        <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
      </div>
      <div class="col q-ml-lg" align="right">
        <q-btn label="Descargar" :disabled="!selected" icon="get_app" @click="url()" />
      </div>
    </div>
    <tabla-anexos :anexos="anexos" :selected.sync="selected"/>
    <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { openURL } from 'quasar'
import TablaAnexos from 'components/Anexos/TablaAnexos'
import FormDialog from 'components/FormDialog'

export default {
  name: 'Anexos',
  components: { TablaAnexos, FormDialog },
  mounted () { this.cargarTodas(this.proyecto.id) },
  data: () => ({selected: undefined}),
  computed: {
    ...mapGetters('anexos', ['anexos']),
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    }
  },
  methods: {
    ...mapActions('anexos', ['cargarTodas', 'modificar', 'eliminar']),

    async url () {
      openURL(`http://localhost:3000/api/anexos/download/${this.selected.nombreArchivo}`)
    },
    async editar (anexo) {
      try {
        const id = anexo.id
        const nombreAnterior = anexo.nombreArchivo
        const {nombreArchivo} = await this.$refs.form.getData({
          title: 'Modificar Nombre',
          form: {
            nombreArchivo: {label: 'Nombre', prompt: nombreAnterior}
          }
        })
        await this.modificar({nombreArchivo, id})
      } catch (error) {
      }
    },
    async borrar (anexo) {
      try {
        await this.$q.dialog({
          title: 'Eliminar',
          message: `Desea eliminar el Anexo ${anexo.nombreArchivo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(anexo)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
