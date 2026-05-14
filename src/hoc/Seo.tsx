import React, { FC } from 'react';
import Head from 'next/head'

interface SeoProps {
  title: string,
  indexed?: boolean,
  description?: string,
  keywords?: string
}

const Seo: FC<SeoProps> = ({
  children,
  title,
  keywords,
  description,
  indexed = true,
}) => (
  <>
    <Head>
      <title>
        {title}
        {' '}
        | Агрегатор медиаконтента — фильмы, факты и рецензии
      </title>
      <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      <meta name="robots" content={indexed ? 'index,follow' : 'noindex,nofollow'} />
      <meta name="keywords" content={`Фильмы, агрегатор медиаконтента, рецензии на фильмы, факты о фильмах, рейтинг фильмов, ${keywords}`} />
      <meta name="description" content={`Агрегатор медиаконтента — информация о фильмах, рецензии, факты и рейтинги в одном месте. ${description || ''}`} />
    </Head>
    {children}
  </>
);

export default Seo;
