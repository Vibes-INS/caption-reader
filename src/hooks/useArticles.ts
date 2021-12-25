import { IndexableType } from 'dexie'
import { useCallback } from 'react'
import db from '../databases'
import { Articles } from '../databases/articles'
import { Paging } from '../utils'

export function useArticles () {
  const addArticle = useCallback(
    async (article: Omit<Articles, 'id' | 'createdDate' | 'updatedDate'>) => {
      const id = await db.articles.add({
        ...article,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      })
      return id
    }, [])

  const updateArticle = useCallback(
    async (id: IndexableType, changes: Omit<Articles, 'id' | 'createdDate' | 'updatedDate'>) => {
      await db.articles.update(id, {
        ...changes,
        updatedDate: new Date().toISOString(),
      })
    }, [],
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
      .toArray()
  , [])

  const getArticlesById = useCallback(async (id: number) =>
    await db
      .articles
      .get(id)
  , [])

  return {
    addArticle,
    updateArticle,
    getAllArticles,
    getArticlesWithPaging,
    getArticlesById,
  }
}
