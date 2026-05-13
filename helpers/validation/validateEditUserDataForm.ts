import { EditUserDataFormValues, EditUserDataValidationErrors } from 'types';
import { validationErrors } from '@/const/validationErrors';
import { regexpUsername } from '@/const/regexp';

export const validateEditUserDataForm = (
  { username }: EditUserDataFormValues,
): EditUserDataValidationErrors => {
  const errors: EditUserDataValidationErrors = {}

  if (username.length && !regexpUsername.test(username)) {
    errors.username = validationErrors.username
  }

  return errors
}
