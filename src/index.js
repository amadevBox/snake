const convertDegInRad = (angle) => {
  return (angle * Math.PI) / 180
}

class Snake {
  constructor(color = '#ff5050', x, y, angle, length, ctx) {
    this.color = color
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
    const radian = convertDegInRad(that.angle)
    that.x += that.SPEED * Math.cos(radian)
    that.y += that.SPEED * Math.sin(radian)
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

  validationCoordinates(cSetting) {
    if (this.x < cSetting.THICNESS_WALL) {
     this.x = cSetting.mapW - cSetting.THICNESS_WALL
    } else if (this.x > cSetting.mapW - cSetting.THICNESS_WALL) {
     this.x = cSetting.THICNESS_WALL
    } else if (this.y < cSetting.THICNESS_WALL) {
     this.y = cSetting.mapH - cSetting.THICNESS_WALL
    } else if (this.y > cSetting.mapH - cSetting.THICNESS_WALL) {
     this.y = cSetting.THICNESS_WALL
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
    this.x += (this.SPEED * Math.cos(convertDegInRad(this.angle))) >> 0
    this.y += this.SPEED * Math.sin(convertDegInRad(this.angle))
    this.pushCoordinates()
    this.draw()
  }

  stop() {
    clearInterval(this.interval)
    alert('Finish')
  }
}

Snake.INITIAL_LENGTH  = 150
Snake.PIECE_SNAKE_RADIUS = 5.3
Snake.SPEED = 2
Snake.ROTATION_SPEED = 5
