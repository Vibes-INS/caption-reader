import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useArticles, useInnerSize } from '../../hooks'
import { useLiveQuery } from 'dexie-react-hooks'

const Editor: React.FC = () => {
  const { width, height } = useInnerSize()
  const { id } = useParams<{ id?: string }>()
  const { addArticle, updateArticle, getArticlesById } = useArticles()
  const navigate = useNavigate()
  const article = useLiveQuery(() => {
    if (id) {
      return getArticlesById(Number(id))
    }
  })
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const onCreateArticle = useCallback(async () => {
    const newArticleId = await addArticle({
      title: articleTitle,
      content: articleContent,
    })
    console.log(newArticleId)
    navigate(`/editor/${newArticleId}`, { replace: true })
  }, [articleContent, articleTitle])
  const onUpdateArticle = useCallback(() => {
    updateArticle(Number(id), {
      title: articleTitle,
      content: articleContent,
    })
  }, [articleContent, articleTitle, id])
  const onSave = useCallback(() => {
    if (!articleTitle || !articleContent) return
    const isCreateMode = Boolean(!id)
    if (isCreateMode) {
      return onCreateArticle()
    }
    onUpdateArticle()
  }, [
    articleTitle,
    articleContent,
    onCreateArticle,
    onUpdateArticle,
  ])
  useEffect(() => {
    if (article?.content) {
      setArticleContent(article?.content)
    }
    if (article?.title) {
      setArticleTitle(article?.title)
    }
  }, [article?.content, article?.title])

  return (
    <div className="p-4 relative flex flex-col items-center" style={{ width, height }}>
      <input
        type="text"
        className={classNames(
          'bg-gray-100',
          'dark:bg-gray-600',
          'outline-none',
          'rounded-md',
          'mb-4',
          'px-4',
          'py-2',
          'max-w-lg',
          'w-full',
        )}
        value={articleTitle}
        onChange={e => setArticleTitle(e.target.value)}
        placeholder="Article Title"
      />
      <textarea
        className={classNames(
          'resize-none',
          'w-full',
          'h-full',
          'bg-gray-100',
          'dark:bg-gray-600',
          'outline-none',
          'px-4',
          'py-2',
          'max-w-lg',
          'mb-12',
          'rounded-md',
        )}
        placeholder="Article Content"
        value={articleContent}
        onChange={e => setArticleContent(e.target.value)}
      />
      <footer className={classNames(
        'absolute',
        'bottom-0',
        'left-0',
        'w-full',
        'py-2',
        'px-4',
        'flex',
        'bg-white',
        'border-t',
        'border-gray-400',
        'dark:border-gray-600',
        'dark:bg-black',
      )}>
        <div className={classNames(
          'flex',
          'flex-row-reverse',
          'max-w-lg',
          'w-full',
          'm-auto',
        )}>
          <button
            className={classNames(
              'rounded-md',
              'bg-purple-600',
              'px-4',
              'py-1',
              'text-white',
              'active:bg-purple-800',
              'outline-none',
            )}
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Editor
