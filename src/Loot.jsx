import Entity from './Entity'

class Loot extends Entity {
  action(verb, world) {
    if (verb === ' bump') {
      console.log('pichup', this)
    }
    if (verb === 'drop') {
      console.log('drop', this)
    }
  }
}

export default Loot
