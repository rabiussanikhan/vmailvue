<template>
    <div class="modal">
        <div class="overlay" @click="emit('closeModal')"></div>
        <div class="modal-card">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import useKeydown from "@/composable/use-keydown";


// eslint-disable-next-line no-undef
const emit = defineEmits(['closeModal'])


useKeydown([
    {key: 'Escape', fn: () => emit('closeModal')}
])

</script>