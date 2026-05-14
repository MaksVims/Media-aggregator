import React, { FC } from 'react';
import Image from 'next/image';
import { ISpecificStaff } from 'types';
import { PersonGridInfo } from '@/components/person';

interface PersonInfoProps {
  person: ISpecificStaff,
  countMovies: number
}

const PersonInfo: FC<PersonInfoProps> = ({ person, countMovies }) => {
  const isFacts = !!person.facts.length
  return (
    <section
      className="flex flex-col space-y-4 flex-wrap md:flex-row md:space-x-4 xl:!space-y-0 xl:flex-nowrap xl:!justify-center"
    >
      <div
        className="p-4 flex-shrink-0 self-center md:border-r-2 border-solid border-gray-300 md:py-0 md:mr-4"
      >
        <div className="drop-shadow-lg">
          <Image
            src={person.posterUrl}
            width={240}
            height={360}
            alt={person.nameRu}
          />
        </div>
      </div>
      <div
        className={`space-y-4 border-t-2 pt-4 border-solid border-gray-400 md:!border-none md:!pt-0 flex-shrink-0
                ${isFacts ? 'xl:w-[400px]' : 'xl:min-w-[400px]'}`}
      >
        <h1 className="text-3xl xl:text-4xl font-bold">
          <strong>{person.nameRu}</strong>
        </h1>
        <h2 className="text-gray-color">
          {person.nameEn}
        </h2>
        <h3 className="text-xl font-semibold">
          О персоне
        </h3>
        <PersonGridInfo
          person={person}
          countMovies={countMovies}
        />
      </div>
      {isFacts && (
        <div className="mt-4 xl:self-center ">
          <h3 className="font-medium mb-2">
            Знали ли вы что?
          </h3>
          <ul
            className="space-y-2 text-gray-color leading-normal pr-2 max-h-[300px] xl:max-h-[200px] overflow-y-auto custom-scrollbar"
          >
            {person.facts.map((fact) => (
              <li
                key={fact}
                className="text-xs relative after:content-['-'] after:text-2xl after:-left-4 after:-top-2 after:absolute"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PersonInfo;
