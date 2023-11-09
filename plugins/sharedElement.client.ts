import { SharedElementRouteGuard, SharedElementDirective } from 'v-shared-element'

export default defineNuxtPlugin(({ vueApp, $router }) => {
  SharedElementDirective.install(vueApp)
  // @ts-ignore
  $router.beforeEach(SharedElementRouteGuard)
})
