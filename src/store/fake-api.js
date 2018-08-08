// export const login = async ({email}) => ({email, token: '123', _id: 'hola'})

export const setToken = token => true

// export const logout = () => Promise.resolve()

export const changePassword = ({oldPassword, newPassword, email}) => Promise.resolve({oldPassword, newPassword, email})

// export const userList = () => Promise.resolve()

// export const createUser = ({email, password}) => Promise.resolve({email, password})

// export const removeUser = (_id) => Promise.resolve(_id)

/* export async function getGrupoLineaDeInvestigacion () {
  return []
} */
/* export async function getLineasDeInvestigacion () {
  return []
}

export async function getUnidadesAcademicas () {
  return []
}
export async function getDisciplinasDeEstudio () {
  return []
}

export async function mandarFormularioProyecto (proyecto) {}

export async function getProyectos () {
  return []
}

export async function getProyecto (id) {
  return {}
}

export async function editFormularioProyecto (proyecto) {}

export async function deleteProyecto (id) {}
*/
