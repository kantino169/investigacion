export const isLogged = (state) => !!state.id

export const isAdmin = state => state.tipoUsuario === 3

export const isTeacher = state => state.tipoUsuario === 1

export const isDirector = state => state.tipoUsuario === 2

export const isStudent = state => state.tipoUsuario === 0

export const isNotStudent = state => state.tipoUsuario !== 0
