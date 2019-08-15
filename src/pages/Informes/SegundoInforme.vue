<template>
  <q-page padding>
    <div>
      <div align="left">
        <h6 class="q-ma-none">Universidad Adventista del Plata</h6>
        <p class="q-ma-none">Secretaría de Ciencia y Técnica</p>
      </div>
      <h5 align="center" class="bold">2° Informe de Avance</h5>
      <div align="left">
        <p>Fecha: {{ Date.now }}</p>
        <p>Responsable/s: {{proyecto.idDirector}} - {{proyecto.idCodirector}}</p>
        <p>Becarios o Asistentes de Investigación (si existen):</p>
        <p>Denominación del Proyecto: {{proyecto.nroProyecto}}</p>
      </div>
      <div>
        <h5 class="bold">ETAPA (según cronograma)</h5>
        <textarea v-model="datos.etapa" class="full-width"></textarea>
      </div>
      <div>
        <h5 class="bold">ESTADO ACTUAL DE LA INVESTIGACIÓN</h5>
        <p class="caption">Especifique (a) el grado de alcance de los objetivos, (b) los resultados obtenidos hasta la fecha y (c) cualquier situación que merezca ser presentada acerca del avance del proyecto.</p>
        <full-editor v-model="datos.estado"/>
      </div>
      <p align="center" class="q-mt-lg">Publicaciones y Presentaciones relacionadas con el Proyecto</p>
      <div>
        <p class="caption q-mt-lg">1. Comunicaciones (posters y ponencias) presentadas en eventos científicos, nacionales o internacionales, relativas al proyecto: </p>
        <q-btn
          size="sm"
          color="primary"
          label="Agregar Item"
          @click="agregarComunicacion()" />
        <q-btn color="" size="sm" :disabled="!selectedComunicacion" flat round icon="edit" @click="modificarComunicacion(selectedComunicacion)" />
        <q-btn color="negative" size="sm" :disabled="!selectedComunicacion" flat round delete icon="delete" @click="borrarComunicacion(selectedComunicacion)" />
        <tabla-comunicaciones :comunicaciones="comunicaciones" :selected.sync="selectedComunicacion"/>
      </div>
      <div>
        <br>
        <p class="caption q-mt-lg">2. Artículos publicados, en revistas con referato, relativos al proyecto. Libro o Capítulo de Libro publicado, relativo al proyecto.</p>
        <q-btn
          size="sm"
          color="primary"
          label="Agregar Item"
          @click="agregarRevista()" />
        <q-btn color="" size="sm" :disabled="!selectedRevista" flat round icon="edit" @click="modificarRevista(selectedRevista)" />
        <q-btn color="negative" size="sm" :disabled="!selectedRevista" flat round delete icon="delete" @click="borrarRevista(selectedRevista)" />
        <tabla-revistas :revistas="revistas" :selected.sync="selectedRevista" class="q-mb-lg"/>
        <q-btn
          size="sm"
          color="primary"
          label="Agregar Item"
          @click="agregarLibro()" />
        <q-btn color="" size="sm" :disabled="!selectedLibro" flat round icon="edit" @click="modificarLibro(selectedLibro)" />
        <q-btn color="negative" size="sm" :disabled="!selectedLibro" flat round delete icon="delete" @click="borrarLibro(selectedLibro)" />
        <tabla-libros :libros="libros" :selected.sync="selectedLibro" class="q-mb-lg"/>
        <q-btn
          size="sm"
          color="primary"
          label="Agregar Item"
          @click="agregarCapitulo()" />
        <q-btn color="" size="sm" :disabled="!selectedCapitulo" flat round icon="edit" @click="modificarCapitulo(selectedCapitulo)" />
        <q-btn color="negative" size="sm" :disabled="!selectedCapitulo" flat round delete icon="delete" @click="borrarCapitulo(selectedCapitulo)" />
        <tabla-capitulo :capitulos="capitulos" :selected.sync="selectedCapitulo" class="q-mb-lg"/>
      </div>
      <div>
        <p class="caption q-mt-lg">3. Artículos en prensa, proceso de referato o proceso de redacción, previstos a ser publicados (datos completos de la revista).</p>
        <full-editor v-model="datos.articulos"/>
      </div>
      <div>
        <p class="caption q-mt-lg">4. Otras actividades que considere relevantes, relativas al proyecto (talleres, cursos, seminarios, conferencias, etc.).</p>
        <full-editor v-model="datos.actividades"/>
      </div>
      <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
      <q-btn class="q-mt-lg q-ml-lg" icon="save" label="Guardar" @click="agregar(proyecto.id, comunicaciones, revistas, libros, capitulos)"></q-btn>
    </div>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import FullEditor from 'components/FullEditor'
import FormDialog from 'components/FormDialog'
import { mapActions } from 'vuex'
import TablaComunicaciones from 'components/Informes/TablaComunicaciones'
import TablaRevistas from 'components/Informes/TablaRevistas'
import TablaLibros from 'components/Informes/TablaLibros'
import TablaCapitulo from 'components/Informes/TablaCapitulo'
import { uid } from 'quasar'

export default {
  name: 'segundo-informe',
  components: {FullEditor, TablaComunicaciones, TablaRevistas, TablaLibros, TablaCapitulo, FormDialog},
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    this.cargarSegundoInforme(this.proyecto.id)
  },
  data () {
    return {
      datos: {
        etapa: undefined,
        estado: undefined,
        articulos: undefined,
        actividades: undefined
      },
      comunicaciones: [],
      revistas: [],
      libros: [],
      capitulos: [],
      selectedComunicacion: undefined,
      selectedRevista: undefined,
      selectedLibro: undefined,
      selectedCapitulo: undefined
    }
  },
  computed: {
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto) || {}
    },
    informes () {
      return this.$store.getters['informes/informes']
    },
    informe () {
      return this.informes[0]
    }
  },
  watch: {
    informe: {
      handler (informe) {
        if (!informe) return
        const clone = array => Array.isArray(array) ? array.map(obj => Object.assign({}, obj)) : []
        this.datos = {
          etapa: informe.etapa,
          estado: informe.estado,
          articulos: informe.articulos,
          actividades: informe.actividades
        }
        this.comunicaciones = clone(informe.comunicaciones)
        this.revistas = clone(informe.revistas)
        this.libros = clone(informe.libros)
        this.capitulos = clone(informe.capitulos)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('informes', ['cargarSegundoInforme', 'crear', 'modificar', 'eliminar']),

    async agregar (idProyecto, comunicaciones, revistas, libros, capitulos) {
      try {
        await this.crear({...this.datos, comunicaciones, revistas, libros, capitulos, idProyecto, nroInforme: 2})
        this.$router.push({name: 'MenuProyecto', params: {idProyecto: this.proyecto.id}})
      } catch (error) {
      }
    },
    async agregarComunicacion () {
      try {
        const datosComunicacion = await this.$refs.form.getData({
          title: 'Nueva Comunicacion',
          form: {
            autores: {label: 'Autores'},
            titulo: {label: 'Titulo del trabajo'},
            evento: {label: 'Nombre del evento'},
            lugar: {label: 'Lugar'},
            fecha: {label: 'Fecha', type: 'date'}
          }
        })
        this.comunicaciones.push({...datosComunicacion, id: uid()})
      } catch (error) {
      }
    },
    async modificarComunicacion (comunicacion) {
      try {
        const {autores, titulo, evento, lugar, fecha} = await this.$refs.form.getData({
          title: 'Modificar Item',
          form: {
            autores: {label: 'Autores', model: comunicacion.autores},
            titulo: {label: 'Titulo del trabajo', model: comunicacion.titulo},
            evento: {label: 'Nombre del evento', model: comunicacion.evento},
            lugar: {label: 'Lugar', model: comunicacion.lugar},
            fecha: {label: 'Fecha', type: 'date', model: comunicacion.fecha}
          }
        })
        comunicacion.autores = autores
        comunicacion.titulo = titulo
        comunicacion.evento = evento
        comunicacion.lugar = lugar
        comunicacion.fecha = fecha
      } catch (error) {
        console.log(error)
      }
    },
    async agregarRevista () {
      try {
        const datosRevista = await this.$refs.form.getData({
          title: 'Revista',
          form: {
            autores: {label: 'Autores'},
            año: {label: 'Año', type: 'number'},
            titulo: {label: 'Titulo del trabajo'},
            revista: {label: 'Nombre revista'},
            volumen: {label: 'Volumen'},
            numero: {label: 'Numero'},
            paginas: {label: 'Paginas'},
            link: {label: 'Link'}
          }
        })
        this.revistas.push({...datosRevista, id: uid()})
      } catch (error) {
      }
    },
    async modificarRevista (rev) {
      try {
        const {autores, año, titulo, revista, volumen, numero, paginas, link} = await this.$refs.form.getData({
          title: 'Modificar Item',
          form: {
            autores: {label: 'Autores', model: rev.autores},
            año: {label: 'Año', type: 'number', model: rev.año},
            titulo: {label: 'Titulo del trabajo', model: rev.titulo},
            revista: {label: 'Nombre revista', model: rev.revista},
            volumen: {label: 'Volumen', model: rev.volumen},
            numero: {label: 'Numero', model: rev.numero},
            paginas: {label: 'Paginas', model: rev.paginas},
            link: {label: 'Link', model: rev.link}
          }
        })
        rev.autores = autores
        rev.año = año
        rev.titulo = titulo
        rev.revista = revista
        rev.volumen = volumen
        rev.numero = numero
        rev.paginas = paginas
        rev.link = link
      } catch (error) {
        console.log(error)
      }
    },
    async agregarLibro () {
      try {
        const datosLibro = await this.$refs.form.getData({
          title: 'Nueva Comunicacion',
          form: {
            autores: {label: 'Autores'},
            año: {label: 'Año'},
            titulo: {label: 'Titulo del trabajo'},
            editorial: {label: 'Editorial'},
            lugar: {label: 'Lugar'},
            link: {label: 'Link'}
          }
        })
        this.libros.push({...datosLibro, id: uid()})
      } catch (error) {
      }
    },
    async modificarLibro (libro) {
      try {
        const {autores, año, titulo, editorial, lugar, link} = await this.$refs.form.getData({
          title: 'Modificar Item',
          form: {
            autores: {label: 'Autores', model: libro.autores},
            año: {label: 'Año', type: 'number', model: libro.año},
            titulo: {label: 'Titulo del Libro', model: libro.titulo},
            editorial: {label: 'Nombre Editorial', model: libro.editorial},
            lugar: {label: 'Lugar', model: libro.lugar},
            link: {label: 'Link', model: libro.link}
          }
        })
        libro.autores = autores
        libro.año = año
        libro.titulo = titulo
        libro.editorial = editorial
        libro.lugar = lugar
        libro.link = link
      } catch (error) {
        console.log(error)
      }
    },
    async agregarCapitulo () {
      try {
        const datosCapitulo = await this.$refs.form.getData({
          title: 'Nueva Comunicacion',
          form: {
            autores: {label: 'Autores'},
            año: {label: 'Año'},
            tituloCapitulo: {label: 'Titulo del capitulo'},
            editores: {label: 'Editores'},
            tituloLibro: {label: 'Titulo del Libro'},
            editorial: {label: 'Editorial'},
            lugar: {label: 'Lugar'},
            paginas: {label: 'Paginas'},
            link: {label: 'Link'}
          }
        })
        this.capitulos.push({...datosCapitulo, id: uid()})
      } catch (error) {
      }
    },
    async modificarCapitulo (capitulo) {
      try {
        const {autores, año, tituloCapitulo, editores, tituloLibro, editorial, lugar, link} = await this.$refs.form.getData({
          title: 'Modificar Item',
          form: {
            autores: {label: 'Autores', model: capitulo.autores},
            año: {label: 'Año', type: 'number', model: capitulo.año},
            tituloCapitulo: {label: 'Titulo del Capitulo', model: capitulo.titulo},
            editores: {label: 'Editores', model: capitulo.editores},
            tituloLibro: {label: 'Titulo del Libro', model: capitulo.tituloLibro},
            editorial: {label: 'Nombre Editorial', model: capitulo.editorial},
            lugar: {label: 'Lugar', model: capitulo.lugar},
            link: {label: 'Link', model: capitulo.link}
          }
        })
        capitulo.autores = autores
        capitulo.año = año
        capitulo.tituloCapitulo = tituloCapitulo
        capitulo.editores = editores
        capitulo.tituloLibro = tituloLibro
        capitulo.editorial = editorial
        capitulo.lugar = lugar
        capitulo.link = link
      } catch (error) {
        console.log(error)
      }
    },
    async borrarComunicacion (item) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${item.titulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.comunicaciones.splice(this.comunicaciones.indexOf(item.id), 1)
        this.selectedComunicacion = undefined
      } catch (error) {
      }
    },
    async borrarRevista (item) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${item.titulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.revistas.splice(this.revistas.indexOf(item.id), 1)
        this.selectedRevista = undefined
      } catch (error) {
      }
    },
    async borrarLibro (item) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${item.titulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.libros.splice(this.libros.indexOf(item.id), 1)
        this.selectedLibro = undefined
      } catch (error) {
      }
    },
    async borrarCapitulo (item) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${item.tituloCapitulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.capitulos.splice(this.capitulos.indexOf(item.id), 1)
        this.selectedCapitulo = undefined
      } catch (error) {
      }
    }
  }
}

</script>

<style>
</style>
