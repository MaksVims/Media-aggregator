import React, { useCallback } from 'react';
import { NextPage } from "next";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useAlert, useAuth } from '@/contexts';
import { useFetch } from '@/hooks';
import { AlertType, LoginFormValues } from 'types';
import { errorsMessage, successMessage } from "@/const";
import { NoAccessUser, Seo } from '@/hoc';
import { FormLogin } from "@/components/auth";
import { BoxLoader } from "@/components/ui";

const Login: NextPage = () => {
  const { showAlert } = useAlert()
  const { login: authLogin } = useAuth()
  const router = useRouter()

  const [login, loading] = useFetch(useCallback(async (values: LoginFormValues) => {
    try {
      const { email, password } = values
      const user = await authLogin(email, password)
      showAlert(successMessage.AUTH_LOGIN(user.displayName, user.email), AlertType.SUCCESS)
      await router.push('/account')
    } catch (e) {
      showAlert(errorsMessage.AUTH_LOGIN, AlertType.ERROR)
    }
  }, [showAlert, router, authLogin]))

  return (
    <Seo title={'Страница входа посетителя'}>
      <NoAccessUser to='/'>
        <div className="bg-black">
          <main className="flex-center min-screen px-4 py-6 bg-auth bg-no-repeat bg-top">
            <section className="mx-auto max-w-2xl w-full bg-white rounded-md shadow-md relative">
              <div className="space-y-12 sm:space-y-20 py-6 px-4">
                <div className="space-y-1 text-center">
                  <h1 className="text-2xl text-black font-semibold">
                    Авторизация
                  </h1>
                  <div className="flex-center space-x-1 text-sm">
                    <span className="text-gray-color">
                      Нет аккаунта?
                    </span>
                    <Link href="/auth/register">
                      <a className="link-blur-color">
                        Зарегистрироваться
                      </a>
                    </Link>
                  </div>
                </div>
                <FormLogin handlerSubmit={login} />
              </div>
              {loading && <BoxLoader />}
            </section>
          </main>
        </div>
      </NoAccessUser>
    </Seo>

  );
};

export default Login;