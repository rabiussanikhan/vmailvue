<template>
    <div class="email-display">
        <div>
            <button @click="toggleArchive">{{email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
            <button @click="toggleRead">{{email.read ? 'Mark Unread (r)' : 'Mark Read (r)'}}</button>
            <button @click="goNewer">Newer (k)</button>
            <button @click="goOlder">Older (j)</button>
        </div>
        <h2 class="mb-0">Subject: <strong>{{ email.subject }}</strong></h2>
        <div><em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em></div>
        <div>{{ email.body }}</div>
    </div>
</template>
<script lang="ts" setup>
import {Email} from "@/types/email";
import {format} from "date-fns";
import useKeydown from "@/composable/use-keydown";
import {defineProps, defineEmits} from "vue"

interface Props {
    email: Email
}
defineProps<Props>()
const emit = defineEmits(['changeEmail'])


const toggleRead = () => {
    emit('changeEmail', {toggleRead: true, save: true})
}
const toggleArchive = () => {
    emit('changeEmail', {toggleArchive: true, save: true, closeModal: true})
}
const goNewer = () => {
    emit('changeEmail', {changeIndex: -1})
}
const goOlder = () => {
    emit('changeEmail', {changeIndex: 1})
}
useKeydown([
    {key: 'r', fn: toggleRead},
    {key: 'e', fn: toggleArchive},
    {key: 'k', fn: goNewer},
    {key: 'j', fn: goOlder}
])
</script>
