import React, { FC, useEffect, useRef } from 'react';
import { Form, Formik } from 'formik';
import { EditUserDataFormValues } from 'types';
import { validateEditUserDataForm } from 'helpers';
import { useAuth } from '@/contexts/AuthContext';
import { FormInput } from '@/components/ui';

interface FormEditUserDataProps {
  submitHandler: (values: EditUserDataFormValues) => Promise<void> | void
}

const FormEditUserData: FC<FormEditUserDataProps> = ({ submitHandler }) => {
  const { user } = useAuth()
  const focusRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setTimeout(() => focusRef.current?.focus())
  }, [])

  return (
    <Formik
      initialValues={{
        username: `${user?.displayName || ''}`,
        tel: `${user?.phoneNumber || ''}`,
        url: `${user?.photoURL || ''}`,
      }}
      validate={validateEditUserDataForm}
      onSubmit={submitHandler}
    >
      <Form className="flex flex-col">
        <FormInput
          placeholder="Ваше имя или логин"
          label="Имя:"
          name="username"
          type="text"
          ref={focusRef}
        />
        <button
          className="mt-2 btn-submit"
          type="submit"
        >
          Сохранить
        </button>
      </Form>
    </Formik>
  );
};

export default FormEditUserData;
