/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

const blacklist = [
  '200',
  '404',
  '__sitemap__/index.xml',
]

const manifest = self.__WB_MANIFEST

// Test
// console.log(manifest, manifest.filter(item => !blacklist.includes(typeof item === 'string' ? item : item.url)))

// self.__WB_MANIFEST is default injection point
precacheAndRoute(manifest.filter(item => !blacklist.includes(typeof item === 'string' ? item : item.url)))

// clean old assets
cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
