import { groq } from 'next-sanity'

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc) {
    _id,
    title,
    "imagePath": imagePath,
    objectPosition,
    tags,
    href
  }
`

export const allPortfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "imagePath": imagePath,
    objectPosition,
    tags,
    href
  }
`

export type PortfolioItem = {
  _id: string
  title: string
  slug?: string
  imagePath: string
  objectPosition?: string
  tags?: string[]
  href?: string
}

export const portfolioSlugsQuery = groq`
  *[_type == "portfolio" && defined(slug.current)][].slug.current
`

export const projectBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "imagePath": imagePath,
    objectPosition,
    tags,
    href,
    client,
    year,
    role,
    summary,
    body,
    gallery[]{
      imagePath,
      caption,
      objectPosition,
      wide
    },
    "nextProject": nextProject->{
      _id,
      title,
      "slug": slug.current,
      "imagePath": imagePath,
      objectPosition
    }
  }
`

export type ProjectGalleryImage = {
  imagePath: string
  caption?: string
  objectPosition?: string
  wide?: boolean
}

export type ProjectDetail = {
  _id: string
  title: string
  slug: string
  imagePath: string
  objectPosition?: string
  tags?: string[]
  href?: string
  client?: string
  year?: number
  role?: string[]
  summary?: string
  body?: string[]
  gallery?: ProjectGalleryImage[]
  nextProject?: {
    _id: string
    title: string
    slug: string
    imagePath: string
    objectPosition?: string
  }
}

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    number,
    title,
    tagline,
    description,
    deliverables
  }
`

export type ServiceItem = {
  _id: string
  number: string
  title: string
  tagline?: string
  description?: string
  deliverables?: string[]
}

export const processStepsQuery = groq`
  *[_type == "processStep"] | order(order asc) {
    _id,
    number,
    title,
    duration,
    body
  }
`

export type ProcessStepItem = {
  _id: string
  number: string
  title: string
  duration?: string
  body?: string
}

export const allNewsQuery = groq`
  *[_type == "newsArticle"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    category,
    "coverImage": coverImage,
    objectPosition,
    summary,
    externalUrl
  }
`

export const featuredNewsQuery = groq`
  *[_type == "newsArticle" && featured == true] | order(date desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    category,
    "coverImage": coverImage,
    objectPosition,
    summary,
    externalUrl
  }
`

export const newsSlugsQuery = groq`
  *[_type == "newsArticle" && defined(slug.current)][].slug.current
`

export const newsBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    category,
    "coverImage": coverImage,
    objectPosition,
    summary,
    body,
    externalUrl
  }
`

export type NewsArticleSummary = {
  _id: string
  title: string
  slug: string
  date: string
  category?: string
  coverImage: string
  objectPosition?: string
  summary?: string
  externalUrl?: string
}

export type NewsArticle = NewsArticleSummary & {
  body?: string[]
}
