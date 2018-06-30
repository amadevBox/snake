const degToRad = (angle) => {
  return (angle * Math.PI) / 180
}

class Snake {
  constructor(x, y, angle, length, ctx) {
    this.color = '#ff5050'
    this.name = name
    this.x = x
    this.y = y
    this.angle = angle
    this.length = length
    this.ctx = ctx
    this.coordinates = []
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, Snake.HEAD_RADIUS, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.closePath()
  }

  start(canvasSetting) {
    this.interval = setInterval(this.running, 30, canvasSetting, this)
  }

  running(cSetting, that) {
    const radian = degToRad(that.angle)
    that.x += Snake.SPEED * Math.cos(radian)
    that.y += Snake.SPEED * Math.sin(radian)
    that.validationCoordinates(cSetting)
    that.pushCoordinates()
    that.draw()
    that.findSnakeСollision()
  }

  pushCoordinates() {
    this.coordinates.push({
      x: this.x,
      y: this.y,
    })
    this.snakeLengthControl()
  }

  snakeLengthControl() {
    if (this.coordinates.length > this.length) {
      const { x, y } = this.coordinates[0]
      this.ctx.beginPath()
      this.ctx.fillStyle = '#000'
      this.ctx.arc(x, y, Snake.HEAD_RADIUS + 2, 0, 2 * Math.PI)
      this.ctx.fill();
      this.ctx.closePath();

      this.coordinates.shift()
    }
  }

  validationCoordinates({mapW, mapH}) {
    if (
      (this.x < 0) ||
      (this.x > mapW) ||
      (this.y < 0) ||
      (this.y > mapH)
    ) {
      // this.stop()
    }
  }

  turnLeft() {
    this.angle -= Snake.ROTATION_SPEED
    this.move(true)
  }

  turnRight() {
    this.angle += Snake.ROTATION_SPEED
    this.move(true)
  }

  move(rotate = false) {
    if (rotate) {
      this.SPEED = 1.6
    } else {
      this.SPEED = 2
    }
    this.x += this.SPEED * Math.cos(degToRad(this.angle))
    this.y += this.SPEED * Math.sin(degToRad(this.angle))
    this.pushCoordinates()
    this.draw()
  }

  findSnakeСollision() {
    this.coordinates.slice(0, -10).forEach(({x, y}) => {
      const distance = Math.sqrt(((x - this.x) ** 2) + ((y - this.y) ** 2))
      if (distance < 10) {
        this.stop()
      }
    })
  }

  stop() {
    clearInterval(this.interval)
    alert('Finish')
  }
}

Snake.INITIAL_LENGTH = 150
Snake.HEAD_RADIUS = 5.3
Snake.SPEED = 2
Snake.ROTATION_SPEED = 5



class Food {
	constructor(maxX, maxY, ctxSnake, x, y, color) {
		this.x = (x % (maxX - 2 * 5) + 5)
		this.y = (y % (maxY - 2 * 5) + 5)
		this.color = color
		this.draw(ctxSnake)
	}

	draw(ctx) {
		ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, Food.RADIUS, 0, 2 * Math.PI)
    ctx.fill();
    ctx.closePath();
	}

	destroy(ctx) {
		ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.arc(this.x - 1, this.y - 1, Food.RADIUS + 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
	}
}

Food.RADIUS = 6


window.onload = () => {
  const canvas = document.getElementById('map')
  const ctx = canvas.getContext('2d')

  const snake = new Snake(100, 100, 0, 200, ctx)
  snake.start({mapW: 500, mapH: 500})

  addEventListener(
    'keydown', (e) => {
      switch(e.keyCode) {
        case 37: {
          snake.turnLeft()
          break
        }
        case 39: {
          snake.turnRight()
          break
        }
      }
    }
  )
}
