export const isAuth = state => state.login.token != null;
export const getCurrentUser = state => state.user;
export const getCurrentUserId = state => state.user.idUser;
export const getCurrentUserFullNamed = state => state.user.nombre + ' ' + state.user.apellidoPaterno + ' ' + state.user.apellidoMaterno;
export const getCurrentUserFullName = state => state.user.name;
export const isAdmin = state => state.user.rol !== undefined && state.user.rol === 'ADMIN';

