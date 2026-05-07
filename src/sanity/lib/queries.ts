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

export type PortfolioItem = {
  _id: string
  title: string
  imagePath: string
  objectPosition?: string
  tags?: string[]
  href?: string
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
