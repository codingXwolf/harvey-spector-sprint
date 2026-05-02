'use client'

/**
 * Sanity Studio mounted at /studio. Studio depends on browser globals,
 * so we mount it only after hydration.
 */

import { useEffect, useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <NextStudio config={config} />
}
