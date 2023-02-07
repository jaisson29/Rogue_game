import React, { useRef, useEffect, useState } from 'react'
import InputManager from './InputManager.jsx'
// import Player from './Player.jsx'
import World from './World.jsx'
import Spawner from './Spawner.jsx'

// Correct why don't show the map
const ReactRogue = ({ width, height, tilesize }) => {
  const canvasRef = useRef()
  // const [player, setPlayer] = useState( new Player( 1, 2, tilesize ))
  const [world, setWorld] = useState(new World(width, height, tilesize))
  let inputManager = new InputManager()
  const handleInput = (action, data) => {
    // console.log(`handle input: ${action}:${JSON.stringify(data)}`)
    let newWorld = new World()
    Object.assign(newWorld, world)
    newWorld.movePlayer(data.x, data.y)
    setWorld(newWorld)
  }

  useEffect(() => {
    console.log('create map')
    let newWorld = new World()
    Object.assign(newWorld, world)
    newWorld.createCellularMap()
    newWorld.moveToSpace(world.player)
    let spawner = new Spawner(newWorld)
    spawner.spawnLoot(10)
    spawner.spawnMonster(6)
    spawner.spawnStairs()
    setWorld(newWorld)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log('Bind input')
    inputManager.bindKeys()
    inputManager.subscribe(handleInput)
    return () => {
      inputManager.unbindKeys()
      inputManager.unsubscribe(handleInput)
    }
  })

  useEffect(() => {
    // console.log('Draw to canvas')
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, width * tilesize, height * tilesize)
    world.draw(ctx)
  })

  const listStyle = {
    display: "flex",
    gap: "50px",
    justifyContent: "left",
    boxShadow: "0px 0px 10px .5px #000",
    padding: "15px",
    width: "400px",
    height: "200px"
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{ border: '1px solid black', background: 'DimGray' }}
      ></canvas>
      <section style={listStyle}>
        <div>
          <h3>INVENTORY</h3>
          <ul>
            {world.player.inventory.map((item, index) => (
              <li key={index}>{item.attributes.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>LOG</h3>
          <ul>
            {world.history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <ol>
        <li></li>
      </ol>
    </>
  )
}

export default ReactRogue
