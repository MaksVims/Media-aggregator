import React, { FC } from 'react';
import { MainPopup } from '@/components/ui/popup';

interface PopupTermsOfUsersProps {
  onClose: () => void,
  isOpened: boolean
}

const titleClasses = 'font-semibold mb-2'

const PopupTermsOfUsers: FC<PopupTermsOfUsersProps> = ({ onClose, isOpened }) => (
  <MainPopup
    onClose={onClose}
    isOpened={isOpened}
    title="Условия пользования"
  >
  <div className="overflow-auto max-h-[400px] custom-scrollbar pr-4 text-sm leading-relaxed ">
  <div className="space-y-4">
    <section>
      <h3 className={titleClasses}>1. Общие положения</h3>
      <p>1.1. Данное Соглашение определяет условия использования сервиса «AM» (Агрегатор медиаконтента).</p>
      <p>1.2. Используя сайт, пользователь автоматически соглашается с условиями данного Соглашения.</p>
      <p>1.3. Администрация оставляет за собой право изменять условия Соглашения без предварительного уведомления.</p>
    </section>

    <section>
      <h3 className={titleClasses}>2. Описание сервиса</h3>
      <p>2.1. Сервис «AM» является информационной платформой, предоставляющей доступ к базе данных фильмов, сериалов и другого медиаконтента.</p>
      <p>2.2. Сервис не является владельцем контента и предоставляет информацию в ознакомительных целях, используя открытые API (TMDB и др.).</p>
    </section>

    <section>
      <h3 className={titleClasses}>3. Права и обязанности пользователя</h3>
      <p>3.1. Пользователь обязуется использовать сервис исключительно в личных некоммерческих целях.</p>
      <p>3.2. Запрещено использование автоматизированных скриптов (парсеров, ботов) для сбора информации с сайта.</p>
    </section>

    <section>
      <h3 className={titleClasses}>4. Ограничение ответственности</h3>
      <p>4.1. Сервис предоставляется на условиях «как есть» (as is). Администрация не гарантирует бесперебойную работу сайта.</p>
      <p>4.2. Администрация не несет ответственности за точность данных, полученных из внешних источников (API).</p>
    </section>

    <section>
      <h3 className={titleClasses}>5. Конфиденциальность</h3>
      <p>5.1. Сбор и обработка персональных данных пользователей осуществляется в соответствии с Политикой конфиденциальности.</p>
    </section>
  </div>
</div>
  </MainPopup>
);

export default PopupTermsOfUsers;
