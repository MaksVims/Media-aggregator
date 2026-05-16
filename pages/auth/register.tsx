import React from 'react';
import {NextPage} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import {AlertType, RegisterFormValues} from "types";
import {useFetch} from "@/hooks";
import {errorsMessage, successMessage} from "@/const";
import {useAlert} from "@/contexts/AlertContext";
import {useAuth} from "@/contexts/AuthContext";
import {NoAccessUser, Seo} from "@/hoc";
import {FormRegister} from "@/components/auth";
import {BoxLoader} from "@/components/ui";

const Register: NextPage = () => {
  const {showAlert} = useAlert()
  const { register: authRegister } = useAuth()
  const router = useRouter()

  const [register, loading] = useFetch(async (values: RegisterFormValues) => {
    try {
      const {password, email, username} = values
      const user = await authRegister(email, password, username || '')
      showAlert(successMessage.AUTH_REGISTER(user.displayName, user.email), AlertType.SUCCESS)
      await router.push('/')
    } catch (e) {
      showAlert(errorsMessage.AUTH_REGISTER, AlertType.ERROR)
    }
  })

  return (
    <Seo title="Регистрация посетителя">
      <NoAccessUser to='/'>
        <div className="bg-black">
          <main className="flex-center px-4 py-6 bg-auth bg-no-repeat bg-top min-screen">
            <section className="mx-auto max-w-2xl w-full bg-white rounded-md shadow-md relative">
              <div className="space-y-12 sm:space-y-20 py-6 px-4 ">
                <div className="space-y-1 text-center">
                  <h1 className="text-2xl text-black font-semibold">
                    Регистрация аккаунта
                  </h1>
                  <div className="flex-center space-x-1 text-sm">
                    <span className="text-gray-color">
                      Уже есть аккаунт?
                    </span>
                    <Link href="/auth/login">
                      <a className="link-blur-color">
                        Войти
                      </a>
                    </Link>
                  </div>
                </div>
                <FormRegister submitHandler={register}/>
              </div>
              {loading && <BoxLoader/>}
            </section>
          </main>
        </div>
      </NoAccessUser>
    </Seo>
  );
};

export default Register;