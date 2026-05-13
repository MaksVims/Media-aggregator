export type LoginValidationErrors = {
  email?: string,
  password?: string,
}

export type LoginFormValues = {
  email: string,
  password: string,
}

export type RegisterFormValues = {
  email: string,
  username: string,
  password: string,
  repeating: string,
  isAgree: false
}

export type RegisterValidationErrors = {
  email?: string,
  username?: string,
  password?: string,
  repeating?: string,
  isAgree?: string
}

export type EditUserDataFormValues = {
  username: string,
}

export type EditUserDataValidationErrors = {
  username?: string,
}
