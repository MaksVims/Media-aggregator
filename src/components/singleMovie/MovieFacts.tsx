import React, { FC, useState } from 'react'
import { IResponseMovieFacts } from 'types'
import FactItem from './FactItem'

interface MovieFactsProps {
  facts: IResponseMovieFacts
}

const INITIAL_COUNT = 5

const MovieFacts: FC<MovieFactsProps> = ({ facts }) => {
  const [showAll, setShowAll] = useState(false)

  if (!facts.items.length) return null

  const visible = showAll ? facts.items : facts.items.slice(0, INITIAL_COUNT)

  return (
    <section className="bg-white py-7 fact-text">
      <h2 className="text-xl font-semibold mb-4 text-center">Факты о фильме</h2>
      <ul className="px-4 space-y-3">
        {visible.map((item, index) => (
          <FactItem key={index} {...item} />
        ))}
      </ul>
      {facts.items.length > INITIAL_COUNT && !showAll && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
          >
            Показать все
          </button>
        </div>
      )}
    </section>
  )
}

export default MovieFacts
