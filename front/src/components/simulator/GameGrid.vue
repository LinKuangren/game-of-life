<script setup>
const gridHeight = 16

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

function playOne() {
  const allAliveCells = getAliveCells(getAllCells())

  allAliveCells.forEach((cell) => {
    // get behaviors for each alive cell
    getBehaviors(cell, getAllCells())
  })
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
