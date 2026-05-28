export default {
  AUTH_LOGIN: (name: string | null, email: string | null) => `Пользователь ${name || email} вошел в систему`,
  AUTH_REGISTER: (name: string | null, email: string | null) => `Пользователь ${name || email} зарегистрирован`,
  LOGOUT: 'Вы вышли из системы',
  REMOVE_ACCOUNT: 'Аккаунт удален',
  ADD_MOVIE_TO_COLLECTION: 'Добавлено в коллекцию',
  REMOVE_MOVIE_TO_COLLECTION: 'Удалено из коллекции',
  UPDATE_PROFILE: 'Профиль обновлен',
  UPDATE_MOVIE_IN_COLLECTION: 'Элемент коллекции обновлён',
}
