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
