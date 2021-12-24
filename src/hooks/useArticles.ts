import { useCallback } from 'react'
import db from '../databases'
import { Articles } from '../databases/articles'
import { Paging } from '../utils'

function useArticles () {
  const addArticle = useCallback(
    async (article: Omit<Articles, 'id' | 'createdDate' | 'updatedDate'>) => {
      const id = await db.articles.add({
        ...article,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      })
      return id
    },
    [],
  )

  const getAllArticles = useCallback(async () =>
    await db
      .articles
      .toArray()
  , [])

  const getArticlesWithPaging = useCallback(async (options?: Paging) =>
    await db
      .articles
      .limit(options?.limit ?? 10)
      .offset(options?.offset ?? 0)
  , [])

  return {
    addArticle,
    getAllArticles,
    getArticlesWithPaging,
  }
}

export default useArticles
