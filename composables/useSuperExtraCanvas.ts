export function useSuperExtraCanvas () {
  let canvas: HTMLCanvasElement
  let backgroundGradient: CanvasGradient
  let context: CanvasRenderingContext2D
  let animationRequest: number = 0
  let mouseX: number = 0
  let mouseY: number = 0
  let meteoritesTimer = 0
  let meteoritesRandomSpawnRate = Math.floor((Math.random() * 25) + 60)

  const stars: Array<ReturnType<typeof star>> = []
  const meteorites: Array<ReturnType<typeof meteorite>> = []

  function init (element: HTMLCanvasElement) {
    canvas = element
    context = canvas.getContext('2d')!

    for (let i = 0; i < 150; i++) {
      stars.push(star())
    }

    backgroundGradient = context.createLinearGradient(0, 0, 0, canvas.height)
    backgroundGradient.addColorStop(0, '#000000')
    backgroundGradient.addColorStop(1, '#141414')
    canvas.addEventListener('mousemove', eventMousePos)
    animate()
  }

  function eventMousePos (evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    mouseX = evt.clientX - rect.left
    mouseY = evt.clientY - rect.top
  }

  function star () {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 3
    const mouseRange = 150

    function magneticEffect (mouseX: number, mouseY: number, targetX: number, targetY: number) {
      const dx = mouseX - targetX
      const dy = mouseY - targetY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const force = (distance - 100) * 0.07 // Adjust the strength by changing the factor

      return { x: targetX + forceDirectionX * force, y: targetY + forceDirectionY * force }
    }

    function draw () {
      // context.save()
      context.beginPath()
      const dis = distance({ x, y }, { x: mouseX, y: mouseY })
      if (dis <= mouseRange) {
        const position = magneticEffect(mouseX, mouseY, x, y)
        context.fillStyle = '#00da89'
        context.arc(position.x, position.y, radius, 0, Math.PI * 2, false)
      } else {
        context.fillStyle = 'white'
        context.arc(x, y, radius, 0, Math.PI * 2, false)
      }

      context.shadowColor = '#E3EAEF'
      context.shadowBlur = (Math.random() * 10) + 10
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0
      context.fill()

      context.closePath()
      // context.restore()
    }

    return { draw }
  }

  function meteorite () {
    const gravity = 0.5
    let radius = (Math.random() * 10) + 5
    const trailingCount = radius / 3
    let x = radius + (canvas.width - radius * 2) * Math.random()
    let y = -10
    const dx = (Math.random() - 0.5) * 20
    let dy = 15

    function calculate () {
      // Math
      if (y / trailingCount + radius + dy >= canvas.height) {
        radius = 0
      } else {
        dy += gravity
      }

      // Move particles by velocity
      x += dx
      y += dy
    }

    function draw () {
      calculate()

      for (let index = 0; index < trailingCount; index++) {
        const spacing = 0.5 // spacing between meteorites
        const rateX = index !== 0 ? (x - dx) - (dx * index * spacing) : x
        const rateY = index !== 0 ? (y - dy) - (dy * index * spacing) : y
        const rateRadius = index !== 0 ? lerp(radius / 2, radius, index / trailingCount) : radius

        // TODO Add parabolic coordinate transformation
        const opacity = index !== 0 ? (trailingCount - index) / trailingCount : 1

        // context.save()
        context.beginPath()
        context.moveTo(x, y)
        context.arc(rateX, rateY, Math.abs(rateRadius), 0, Math.PI * 2, false)

        context.shadowColor = `rgba(227, 234, 239, ${opacity})`
        context.shadowBlur = 20
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0

        context.fillStyle = `rgba(227, 234, 239, ${opacity})`
        context.fill()
        context.closePath()
        // context.restore()
      }
    }

    function getRadius () {
      return radius
    }

    return { draw, getRadius }
  }

  function animate () {
    animationRequest = window.requestAnimationFrame(animate)

    // Gradient
    context.fillStyle = backgroundGradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].draw()
    }

    // Meteorites
    for (let i = 0; i < meteorites.length; i++) {
      meteorites[i].draw()

      if (meteorites[i].getRadius() <= 0) {
        meteorites.splice(i, 1)
      }
    }

    meteoritesTimer++

    if (meteoritesTimer % meteoritesRandomSpawnRate === 0) {
      meteorites.push(meteorite())
      meteoritesRandomSpawnRate = Math.floor((Math.random() * 10) + 100)
      meteoritesTimer = 0
    }
  }

  // Utils
  function distance (p1: { x: number, y: number }, p2: { x: number, y: number }) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  function lerp (x: number, y: number, a: number) {
    return x * (1 - a) + y * a
  }

  onUnmounted(() => {
    window.cancelAnimationFrame(animationRequest)
    canvas.removeEventListener('mousemove', eventMousePos)
  })

  return { init }
}
