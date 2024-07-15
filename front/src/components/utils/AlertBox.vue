<template>
  <div v-if="visible" :class="['alert-box', type]">
    <span>{{ message }}</span>
    <button @click="closeAlert">X</button>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info', // other types can be 'success', 'warning', 'error'
    },
    duration: {
      type: Number,
      default: 3000, // duration in milliseconds
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeAlert() {
      this.visible = false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  },
};
</script>

<style scoped>
.alert-box {
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
}

.alert-box.info {
  background-color: #d9edf7;
  color: #31708f;
}

.alert-box.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.alert-box.warning {
  background-color: #fcf8e3;
  color: #8a6d3b;
}

.alert-box.error {
  background-color: #f2dede;
  color: #a94442;
}

.alert-box button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
