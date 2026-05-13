import React, { FC, useState } from 'react'

const typeLabel = { FACT: 'Факт', BLOOPER: 'Ляп' }
const typeBadgeClass = {
  FACT: 'bg-blue-100 text-blue-700',
  BLOOPER: 'bg-orange-100 text-orange-700',
}

interface FactItemProps {
  text: string
  type: 'FACT' | 'BLOOPER'
  spoiler: boolean
}

const FactItem: FC<FactItemProps> = ({ text, type, spoiler }) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <li className="flex gap-3 text-sm text-gray-700 items-start">
      <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 ${typeBadgeClass[type]}`}>
        {typeLabel[type]}
      </span>
      {spoiler && !revealed ? (
        <button
          className="text-left text-gray-400 italic underline underline-offset-2 hover:text-gray-600 transition-colors"
          onClick={() => setRevealed(true)}
        >
          Спойлер — нажмите чтобы показать
        </button>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </li>
  )
}

export default FactItem
