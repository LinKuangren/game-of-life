<script setup>
import { ref } from 'vue'
const gridHeight = 16

const counter = ref(0)
let intervalID

function setAlive(e) {
  e.target.classList.toggle('alive')
}

// get all cells
function getAllCells() {
  const rows = document.querySelectorAll('tr')
  const cells = []

  rows.forEach((row) => {
    row.querySelectorAll('td').forEach((cell) => {
      cells.push(cell)
    })
  })

  return cells
}

// get alive cells
function getAliveCells(cells) {
  const aliveCells = []

  cells.forEach((cell) => {
    if (cell.classList.contains('alive')) {
      aliveCells.push(cell)
    }
  })

  return aliveCells
}

// get 8 behaviors of a cell
function getBehaviors(cell, cells) {
  const behaviors = []
  const cellX = Number(cell.id.split('-')[0])
  const cellY = Number(cell.id.split('-')[1])

  const possibilities = [
    `${cellX - 1}-${cellY - 1}`,
    `${cellX - 1}-${cellY}`,
    `${cellX - 1}-${cellY + 1}`,
    `${cellX}-${cellY - 1}`,
    `${cellX}-${cellY + 1}`,
    `${cellX + 1}-${cellY - 1}`,
    `${cellX + 1}-${cellY}`,
    `${cellX + 1}-${cellY + 1}`
  ]

  cells.forEach((c) => {
    possibilities.forEach((possibility) => {
      if (c.id === possibility) {
        behaviors.push(c)
      }
    })
  })

  return behaviors
}

function isStayDead(behaviors) {
  let aliveBehaviors = 0

  behaviors.forEach((behavior) => {
    if (behavior.classList.contains('alive')) {
      aliveBehaviors = aliveBehaviors + 1
    }
  })

  if (aliveBehaviors != 3) return true
  else return false
}

function isStayAlive(behaviors) {
  let aliveBehaviors = 0

  behaviors.forEach((behavior) => {
    if (behavior.classList.contains('alive')) {
      aliveBehaviors = aliveBehaviors + 1
    }
  })

  if (aliveBehaviors > 1 && aliveBehaviors < 4) return true
  else return false
}

function playOne() {
  const allCells = getAllCells()

  allCells.forEach((cell) => {
    if (cell.classList.contains('alive')) {
      if (!isStayAlive(getBehaviors(cell, getAllCells()))) cell.classList.add('nextDead')
    } else {
      if (!isStayDead(getBehaviors(cell, getAllCells()))) cell.classList.add('nextAlive')
    }
  })

  document.querySelectorAll('.nextDead').forEach((e) => e.classList.remove('nextDead', 'alive'))
  document.querySelectorAll('.nextAlive').forEach((e) => {
    e.classList.remove('nextAlive')
    e.classList.add('alive')
  })

  counter.value = counter.value + 1
}

function playContinue() {
  if (!intervalID) {
    intervalID = setInterval(() => {
      playOne()
      counter.value = counter.value + 1
    }, 150)
  }
}

function stop() {
  clearInterval(intervalID)
  intervalID = null
}

function reset() {
  const aliveCells = getAliveCells(getAllCells())

  aliveCells.forEach((cell) => {
    cell.classList.remove('alive')
  })
  counter.value = 0
}
</script>

<template>
  <main>
    <table>
      <tbody>
        <tr v-for="row in gridHeight" :key="row">
          <td v-for="col in gridHeight" :key="col" :id="row + '-' + col" @click="setAlive"></td>
        </tr>
      </tbody>
    </table>

    <button @click="playOne">Play one</button>
    <br />
    <button @click="playContinue">Start</button>
    <br />
    <button @click="stop">Stop</button>
    <br />
    <button @click="reset">Reset</button>
    <p>
      {{ counter }}
    </p>
  </main>
</template>

<style scoped>
td {
  border: solid 1px black;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}
</style>
