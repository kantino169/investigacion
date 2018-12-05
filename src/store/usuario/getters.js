export const isLogged = (state) => !!state.id

export const isAdmin = state => state.tipoUsuario === 2
