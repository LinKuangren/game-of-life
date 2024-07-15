<script>
export default {
  props: ['modelValue', 'required', 'type'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    class="border-black border-2 text-lg px-4 py-2"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :required="required ? true : false"
  />
</template>
