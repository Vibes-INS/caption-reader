import React from 'react'
import { useArticles } from '../../hooks'
import { useLiveQuery } from 'dexie-react-hooks'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Articles: React.FC = () => {
  const { getArticlesWithPaging } = useArticles()
  const articles = useLiveQuery(() => getArticlesWithPaging())

  return (
    <div className={classNames(
      'p-4',
    )}>
      {
        articles?.map((article, i) => (
          <Link
            key={i}
            to={`/reader/${article.id}`}
            className={classNames(
              'rounded-md',
              'py-2',
              'px-4',
              'mb-4',
              'flex',
              'bg-gray-200',
              'dark:bg-gray-600',
            )}
          >
            {article.title}
            <Link
              to={`/editor/${article.id}`}
              onClick={e => {
                e.stopPropagation()
              }}
              className={classNames(
                'ml-auto',
                'dark:active:bg-gray-800',
                'px-2',
                'rounded-md',
              )}
            >
              Edit
            </Link>
          </Link>
        ))
      }
    </div>
  )
}

export default Articles
