import classNames from 'classnames'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useArticles } from '../../hooks'

const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { getArticlesById } = useArticles()
  const article = useLiveQuery(() => getArticlesById(Number(id)))

  return (
    <div
      className={classNames(
        'p-4',
      )}
    >
      <h1 className="text-xl mb-4">
        {article?.title}
      </h1>
      <p>
        {article?.content}
      </p>
    </div>
  )
}

export default Reader
