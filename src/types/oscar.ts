export type Nominee = {
  id: string
  name: string
  subtitle?: string
  tmdbId?: number
}

export type TmdbType = 'movie' | 'person'

export type Category = {
  id: string
  number: string
  label: string
  title: string
  tmdbType: TmdbType
  nominees: Nominee[]
}

export type View = 'game' | 'summary'

export type Selections = Record<string, string>
