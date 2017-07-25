const Profesor = require('./Profesor')

class Proyecto {
  /*
    String nombre
  */
  constructor ({nombre, profesores}) {
    this.nombre = nombre
    this.profesores = profesores.map(p => new Profesor(p))
  }
}

module.exports = Proyecto
