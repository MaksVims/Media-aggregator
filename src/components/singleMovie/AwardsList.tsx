import React, { FC } from 'react'
import { IReponseMovieAwards } from 'types'

interface AwardsListProps {
  awards: IReponseMovieAwards
}

const AwardsList: FC<AwardsListProps> = ({ awards }) => {
  const wins = awards.items.filter(item => item.win)
  if (!wins.length) return null

  const grouped = wins.reduce<Record<string, { imageUrl: string; nominations: string[] }>>((acc, item) => {
    if (!acc[item.imageUrl]) acc[item.imageUrl] = { imageUrl: item.imageUrl, nominations: [] }
    acc[item.imageUrl].nominations.push(item.nominationName)
    return acc
  }, {})

  const groups = Object.values(grouped)

  return (
    <div className="mt-3">
      <p className="font-medium text-sm mb-2">Награды:</p>
      <div className="flex flex-wrap gap-5">
        {groups.map((group, i) => (
          <div key={i} className="relative group flex flex-col items-center">
            <img
              src={group.imageUrl}
              alt="Награда"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xs text-gray-500 mt-1">{group.nominations.length}</span>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 w-max max-w-[220px] bg-gray-800 text-white text-xs rounded px-2 py-1.5 pointer-events-none">
              <ul className="space-y-1">
                {group.nominations.map((nom, j) => (
                  <li key={j}>{nom}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AwardsList
