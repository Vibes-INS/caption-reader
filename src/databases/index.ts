import Dexie, { Table } from 'dexie'
import { Articles, articlesStores } from './articles'

export class ArticlesDexie extends Dexie {
  articles!: Table<Articles>

  constructor () {
    super('ArticlesDatabase')
    this.version(1).stores({
      ...articlesStores,
    })
  }
}

const db = new ArticlesDexie()

export default db
