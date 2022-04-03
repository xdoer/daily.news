export interface Author {
  id: number
  name: string
}

export interface Tags {
  id: number
  name: string
}

export interface Website {
  id: number
  name: string
  logo: string
  site: string
  updateInterval: number
  updatedAt: string
  createdAt: string
}

export interface Data {
  id: number
  title: string
  cover: string
  url: string
  date: string
  desc: string
  updatedAt: string
  createdAt: string
  author: Author
  tags: Tags[]
  website: Website
}

export interface Posts {
  data: Data[]
  success: boolean
  errorMessage: any
  errorCode: any
}
