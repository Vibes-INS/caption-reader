export interface Articles {
  id?: number
  title: string
  content: string
  createdDate: string
  updatedDate: string
}

export const articlesStores = {
  articles: '++id, title, content, createdDate, updatedDate',
}
