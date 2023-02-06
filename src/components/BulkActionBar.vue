<template>
    <div class="bulk-action-bar">
        <span class="checkbox">
            <input type="checkbox"
                   :checked="allEmailsSelected"
                   :class="[someEmailsSelected ? 'partial-check' : '']"
                   @click="bulkSelect"/>
         </span>
        <span class="buttons">
          <button @click="emailSelection.markRead()"
                  :disabled="[...emailSelection.emails].every(e => e.read)">
            Mark Read
          </button>
          <button @click="emailSelection.markUnread()"
                  :disabled="[...emailSelection.emails].every(e => !e.read)">
            Mark Unread
          </button>
          <button @click="emailSelection.archive()"
                  :disabled="numberSelected === 0">
            Archive
          </button>
        </span>
    </div>
</template>

<script setup lang="ts">
import useEmailSelection from "@/composable/use-email-selection";
import {computed, defineProps} from 'vue';
import {Email} from "@/types/email";

interface Props {
    emails: Email[]
}

const props = defineProps<Props>()
let emailSelection = useEmailSelection();
let numberSelected = computed(() => emailSelection.emails.size)
let allEmailsSelected = computed(() => numberSelected.value === props.emails.length && numberSelected.value != 0)
let someEmailsSelected = computed(() => {
    return numberSelected.value > 0 && numberSelected.value < props.emails.length
})
const bulkSelect = () => {
    if (allEmailsSelected.value) {
        emailSelection.clear()
    } else {
        emailSelection.addMultiple(props.emails)
    }
}
</script>