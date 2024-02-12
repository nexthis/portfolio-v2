import * as PIXI from 'pixi.js'
import { DropShadowFilter } from 'pixi-filters'
import _ from 'lodash'
import meteImage from '~/assets/images/mete.png'

export function useSuperExtraCanvas () {
  let app: PIXI.Application<PIXI.ICanvas>
  let mouseposition: {x:number, y: number}
  const starsInstance = createStars()
  const meteoritesInstance = createMeteorites()

  function init () {
    // console.log('init')

    app = new PIXI.Application({ resizeTo: window, background: 'black' })

    const gradient = createGradTexture()

    app.stage.addChild(gradient)
    app.stage.addChild(starsInstance.draw())
    app.stage.addChild(meteoritesInstance.draw())

    app.stage.eventMode = 'static'
    app.stage.hitArea = app.screen

    if (app.renderer.view.style) {
      app.renderer.view.style.touchAction = 'auto'
    }

    app.stage.on('mousemove', (event) => {
      const { left, top } = app.stage.getBounds()

      mouseposition = mouseposition || { x: 0, y: 0 }
      mouseposition.x = event.clientX - left
      mouseposition.y = event.clientY - top
    })

    app.renderer.on('resize', (width, height) => {
      gradient.width = width
      gradient.height = height
      starsInstance.reDraw()
    })

    app.ticker.add(() => {
      meteoritesInstance.tick()
      starsInstance.tick()
    })

    return app.view
  }

  function createGradTexture () {
    const container = new PIXI.Container()
    // adjust it if somehow you need better quality for very very big images
    // const quality = 256
    const canvas = document.createElement('canvas')

    canvas.width = app.renderer.width
    canvas.height = app.renderer.height

    const ctx = canvas.getContext('2d')!
    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, app.renderer.height)

    grd.addColorStop(0, '#000000')
    grd.addColorStop(1, '#141414')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, app.renderer.width, app.renderer.height)
    const texture = PIXI.Texture.from(canvas)
    container.addChild(new PIXI.Sprite(texture))
    return container
  }

  function createMeteorites () {
    const gravity = 0.5
    let timer = 0
    let randomSpawnRate = 150
    const container = new PIXI.Container()
    const meteorites: Array<{ meteorite: PIXI.Sprite, speed: number, x: number, y: number, dx: number, dy: number, radius: number }> = []

    const dropShadowFilter = new DropShadowFilter({
      color: 0xE3EAEF,
      blur: 4,
      quality: 4,
      alpha: 0.7,
      offset: { x: 0, y: 0 }
    })

    function createMeteorite () {
      const radius = (Math.random() * 50) + 5
      const x = radius + (app.renderer.width - radius * 2) * Math.random()
      const y = -10
      const dx = (Math.random() - 0.5) * 20
      const dy = (Math.random() * 10) + 5
      const speed = (Math.random() * 10) + 2

      const meteorite = PIXI.Sprite.from(meteImage)

      meteorite.height = radius
      meteorite.width = radius
      meteorite.x = x
      meteorite.y = y

      meteorites.push({ meteorite, x, y, speed, dx, dy, radius })

      return { meteorite }
    }

    function draw () {
      container.filters = [dropShadowFilter, dropShadowFilter]

      const meteorite = createMeteorite()
      container.addChild(meteorite.meteorite)
      return container
    }

    function tick () {
      for (const item of meteorites) {
        const { meteorite, speed, x, y, dx, dy, radius } = item

        if (meteorite.y - radius >= app.renderer.height) {
          const index = meteorites.indexOf(item)
          container.removeChild(item.meteorite)
          meteorites.splice(index, 1)
          // console.log('end')
        }

        const A = { x, y }
        const B = { x: meteorite.x, y: meteorite.y }
        const C = { x, y: meteorite.y }
        const c = distance(A, B)
        const a = distance(B, C)
        // const b = distance(A, C)

        // console.log(A, B, C)
        item.dy += gravity
        item.dx += 0.1
        item.speed = speed > 1 ? speed - 0.5 : 0

        const sin = a === c ? 0 : a / c
        // const cos = b === c ? 0 : b / c
        const theta = sin !== 0 ? 0 : Math.asin(sin) * 180 / Math.PI

        // console.log(theta)

        meteorite.x += speed * Math.cos(theta) + dx
        meteorite.y += Math.sin(theta) + dy
      }

      timer++
      if (timer % randomSpawnRate === 0) {
        const meteorite = createMeteorite()
        container.addChild(meteorite.meteorite)
        randomSpawnRate = Math.floor((Math.random() * 10) + 100)
        timer = 0
      }
    }

    return { draw, tick }
  }

  function createStars () {
    const range = 150
    // const speed = 0.08
    const container = new PIXI.Container()
    const stars: Array<{ star: PIXI.Graphics, x: number, y: number, radius: number }> = []

    const dropShadowFilter = new DropShadowFilter({
      color: 0xE3EAEF,
      blur: 4,
      quality: 4,
      alpha: 0.7,
      offset: { x: 0, y: 0 }
    })

    function reDraw () {
      container.removeChildren()
      stars.splice(0, stars.length)
      internalDraw()
    }

    function draw () {
      internalDraw()

      container.filters = [dropShadowFilter, dropShadowFilter]
      return container
    }

    function internalDraw () {
      const max = _.clamp(Math.round((app.renderer.width * app.renderer.height) / (5 * 5 * 300)), 20, 350)

      for (let index = 0; index < max; index++) {
        const star = new PIXI.Graphics()
        const x = Math.random() * app.renderer.width
        const y = Math.random() * app.renderer.height
        const radius = Math.random() * 3

        // star.filters = [dropShadowFilter]
        star.beginFill('white')
        star.arc(0, 0, radius, 0, Math.PI * 2, false)
        star.endFill()
        star.x = x
        star.y = y

        container.addChild(star)
        stars.push({ star, x, y, radius })
      }
    }

    function tick () {
      if (!mouseposition) {
        return
      }

      for (const item of stars) {
        const { star, x, y, radius } = item
        const dis = distance({ x: star.x, y: star.y }, { x: mouseposition.x, y: mouseposition.y })

        if (dis <= range) {
          const dx = star.x - mouseposition.x
          const dy = star.y - mouseposition.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (distance - 100) * 0.07 // Adjust the strength by changing the factor
          if (star.fill.color === 16777215) {
            star.clear()
            star.beginFill('#00da89')
            star.arc(0, 0, radius, 0, Math.PI * 2, false)
            star.endFill()
          }
          star.x -= forceDirectionX * force
          star.y -= forceDirectionY * force
        } else if (star.x !== x || star.y !== y) {
          if (star.fill.color === 16777215) {
            star.clear()
            star.beginFill('white')
            star.arc(0, 0, radius, 0, Math.PI * 2, false)
            star.endFill()
          }

          if (star.x.toFixed(0) === x.toFixed(0)) {
            star.x = x
          }

          if (star.y.toFixed(0) === y.toFixed(0)) {
            star.y = y
          }
          star.x += (x - star.x) * 0.05
          star.y += (y - star.y) * 0.05
        }
      }
    }

    return { draw, tick, reDraw }
  }

  // Utils
  function distance (p1: { x: number, y: number }, p2: { x: number, y: number }) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  onUnmounted(() => {
    // console.log('remove')

    app.destroy()
  })

  return { init }
}
