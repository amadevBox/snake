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
    this.coordinates = {
      x : [],
      y : []
  	}
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, Snake.PIECE_SNAKE_RADIUS, 0, 2 * Math.PI)
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
  }

  pushCoordinates() {
    this.coordinates.x.push(this.x)
    this.coordinates.y.push(this.y)
    this.snakeLengthControl()
  }

  snakeLengthControl() {
    if (this.coordinates.x.length > this.length) {
      this.ctx.beginPath()
      this.ctx.clearRect(
        this.coordinates.x[0] - Snake.PIECE_SNAKE_RADIUS - 3,
        this.coordinates.y[0] - Snake.PIECE_SNAKE_RADIUS - 3,
        Snake.PIECE_SNAKE_RADIUS * 2 + 4, Snake.PIECE_SNAKE_RADIUS * 2 + 4
      )
      this.ctx.closePath()
      this.coordinates.x.shift()
      this.coordinates.y.shift()
    }
  }

  validationCoordinates({mapW, mapH}) {
    if (this.x < 0) {
      this.x = mapW
    } else if (this.x > mapW) {
      this.x = 0
    } else if (this.y < 0) {
      this.y = mapH
    } else if (this.y > mapH) {
      this.y = 0
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

  stop() {
    clearInterval(this.interval)
    alert('Finish')
  }
}

Snake.INITIAL_LENGTH = 150
Snake.PIECE_SNAKE_RADIUS = 5.3
Snake.SPEED = 2
Snake.ROTATION_SPEED = 5


window.onload = () => {
  const canvas = document.getElementById('map')
  const ctx = canvas.getContext('2d')

  const snake = new Snake(100, 100, 0, 100, ctx)
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
