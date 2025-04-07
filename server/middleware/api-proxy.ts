import { defineEventHandler, getRequestURL, getRequestHeaders } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/')) {
    const target = config.public.apiBase + url.pathname + (url.search || '')
    const response = await $fetch(target, {
      method: event.method,
      headers: Object.fromEntries(
        Object.entries(getRequestHeaders(event)).filter(([_, v]) => v !== undefined)
      ) as HeadersInit,
    })
    return response
  }
})
