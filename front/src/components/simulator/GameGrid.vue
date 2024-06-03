<script setup>
import { ref } from 'vue'
const gridHeight = 32

let isMouseDown = false

const counter = ref(0)
let intervalID

function setAlive(e) {
  e.target.classList.toggle('alive')
}

function setSeriesAlive(e) {
  if (isMouseDown) {
    e.target.classList.toggle('alive')
  }
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

// get 8 neighbours of a cell
function getNeighbours(cell, cells) {
  const neighbours = []
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
        neighbours.push(c)
      }
    })
  })

  return neighbours
}

function isStayDead(neighbours) {
  let aliveNeighbours = 0

  neighbours.forEach((neighbour) => {
    if (neighbour.classList.contains('alive')) {
      aliveNeighbours = aliveNeighbours + 1
    }
  })

  if (aliveNeighbours != 3) return true
  else return false
}

function isStayAlive(neighbours) {
  let aliveNeighbours = 0

  neighbours.forEach((neighbours) => {
    if (neighbours.classList.contains('alive')) {
      aliveNeighbours = aliveNeighbours + 1
    }
  })

  if (aliveNeighbours > 1 && aliveNeighbours < 4) return true
  else return false
}

function playOne() {
  const allCells = getAllCells()

  allCells.forEach((cell) => {
    if (cell.classList.contains('alive')) {
      if (!isStayAlive(getNeighbours(cell, allCells))) {
        cell.classList.add('nextDead')
      }
    } else {
      if (!isStayDead(getNeighbours(cell, allCells))) cell.classList.add('nextAlive')
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
    }, 300)
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
      <tbody @mousedown="isMouseDown = !isMouseDown" @mouseup="isMouseDown = !isMouseDown">
        <tr v-for="row in gridHeight" :key="row">
          <td
            v-for="col in gridHeight"
            :key="col"
            :id="row + '-' + col"
            @mouseenter="setSeriesAlive"
            @click="setAlive"
          ></td>
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
