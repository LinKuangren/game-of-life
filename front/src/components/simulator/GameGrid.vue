<script setup>
import { onMounted, ref } from 'vue'
import ButtonPerso from '../ui/ButtonPerso.vue'
const gridHeight = 40
const gridWidth = 50
let gridTable = ref([])
let nextTable = []

let isMouseDown = false

const counter = ref(0)
let intervalID

onMounted(() => {
  let row = 0
  for (row; row < gridHeight; row++) {
    let col = 0
    gridTable.value.push([])
    nextTable.push([])
    for (col; col < gridWidth; col++) {
      gridTable.value[row].push(0)
      nextTable[row].push(0)
    }
  }
})

function setAlive(row, col) {
  if (gridTable.value[row][col] === 0) {
    gridTable.value[row][col] = 1
  } else gridTable.value[row][col] = 0
}

function setSeriesAlive(row, col) {
  if (isMouseDown) {
    if (gridTable.value[row][col] === 0) {
      gridTable.value[row][col] = 1
    }
  }
}

function playOne() {
  nextTable = []
  for (let row = 0; row < gridHeight; row++) {
    nextTable.push([])
    for (let col = 0; col < gridWidth; col++) {
      nextTable[row].push(0)
    }
  }

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      let possibilities = [
        `${row - 1}_${col - 1}`,
        `${row - 1}_${col}`,
        `${row - 1}_${col + 1}`,
        `${row}_${col - 1}`,
        `${row}_${col + 1}`,
        `${row + 1}_${col - 1}`,
        `${row + 1}_${col}`,
        `${row + 1}_${col + 1}`
      ]
      let aliveNeighbours = 0

      possibilities.forEach((possibility) => {
        const [r, c] = possibility.split('_')
        if (r >= 0 && r < gridHeight && c >= 0 && c < gridWidth && gridTable.value[r][c] === 1) {
          aliveNeighbours += 1
        }
      })

      let nextState = 0
      if (gridTable.value[row][col] === 0 && aliveNeighbours === 3) {
        nextState = 1
      }
      if (gridTable.value[row][col] === 1 && aliveNeighbours > 1 && aliveNeighbours < 4) {
        nextState = 1
      }

      nextTable[row][col] = nextState

      // if (!isStayAlive(aliveNeighbours)) {
      //   nextTable[row][col] = 0
      // } else {
      //   if (!isStayDead(aliveNeighbours)) {
      //     nextTable[row][col] = 1
      //   }
      // }
    }
  }

  gridTable.value = nextTable

  // const allCells = getAllCells()
  // const aliveCells = getAliveCells()

  // aliveCells.forEach((cell) => {
  //   getNeighbours(cell)
  // })

  // allCells.forEach((cell) => {
  //   if (cell.classList.contains('alive')) {
  //     if (!isStayAlive(getNeighbours(cell, allCells))) {
  //       cell.classList.add('nextDead')
  //     }
  //   } else {
  //     if (!isStayDead(getNeighbours(cell, allCells))) cell.classList.add('nextAlive')
  //   }
  // })

  // document.querySelectorAll('.nextDead').forEach((e) => e.classList.remove('nextDead', 'alive'))
  // document.querySelectorAll('.nextAlive').forEach((e) => {
  //   e.classList.remove('nextAlive')
  //   e.classList.add('alive')
  // })

  // counter.value = counter.value + 1
}

function playContinue() {
  if (!intervalID) {
    intervalID = setInterval(() => {
      playOne()
      counter.value = counter.value + 1
    }, 100)
  }
}

function stop() {
  clearInterval(intervalID)
  intervalID = null
}

function reset() {
  gridTable.value = []
  let row = 0
  for (row; row < gridHeight; row++) {
    let col = 0
    gridTable.value.push([])
    for (col; col < gridWidth; col++) {
      gridTable.value[row].push(0)
    }
  }
  counter.value = 0
}
</script>

<template>
  <main class="py-12 grid grid-cols-8">
    <section class="max-w-screen-xl m-auto flex gap-8 col-span-7">
      <div class="max-h-[80vh] max-w-screen-lg overflow-scroll">
        <table>
          <tbody @mousedown="isMouseDown = !isMouseDown" @mouseup="isMouseDown = !isMouseDown">
            <tr v-for="row in gridTable.length" :key="'row-' + row">
              <td
                v-for="(col, index) in gridTable[row]"
                :key="'col-' + row + '-' + index"
                :class="col === 1 ? 'alive' : ''"
                @mouseover="setSeriesAlive(row, index)"
                @click="setAlive(row, index)"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div class="flex flex-col gap-4 sticky top-8">
          <ButtonPerso @click="playOne">Play One</ButtonPerso>
          <ButtonPerso @click="playContinue">Start</ButtonPerso>
          <ButtonPerso @click="stop" type="alert">Stop</ButtonPerso>
          <ButtonPerso @click="reset">Reset</ButtonPerso>
          <ButtonPerso type="neutral">{{ counter }}</ButtonPerso>
        </div>
      </div>
    </section>
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
