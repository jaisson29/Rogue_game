import { Map } from 'rot-js'
import Player from './Player'

class World {
  constructor(width, height, tilesize) {
    this.width = width
    this.height = height
    this.tilesize = tilesize
    this.entities = [new Player(0, 0, 16)]

    this.worldMap = new Array(this.width)
    for (let x = 0; x < this.width; x++) {
      this.worldMap[x] = new Array(this.height)
    }
    // this.createCellularMap()
  }

  get player() {
    return this.entities[0]
  }

  add(entity) {
    this.entities.push(entity)
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldMap[x][y] === 0) {
          entity.x = x
          entity.y = y
          return
        }
      }
    }
  }

  isWall(x, y) {
    return (
      this.worldMap[x] === undefined ||
      this.worldMap[y] === undefined ||
      this.worldMap[x][y] === 1
    )
  }

  movePlayer(dx, dy) {
    let tempPlayer = this.player.copyPlayer()
    tempPlayer.move(dx, dy)
    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
      console.log(`Way blocked at ${tempPlayer.x}:${tempPlayer.y}!`)
    } else {
      this.player.move(dx, dy)
    }
  }

  createCellularMap() {
    var map = new Map.Cellular(this.width, this.height, { connected: true })
    map.randomize(0.5)
    var userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldMap[x][y] = 1 //Create walls around edges of map
        return
      }
      this.worldMap[x][y] = value === 0 ? 1 : 0
    }
    map.create(userCallback)
    map.connect(userCallback, 1)
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldMap[x][y] === 1) this.drawWall(context, x, y)
      }
    }
    this.entities.forEach((entity) => {
      entity.draw(context)
    })
  }

  drawWall(context, x, y) {
    context.fillStyle = '#000000'
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    )
  }
}

export default World