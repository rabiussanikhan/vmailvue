<template>
    <button @click="selectedScreen = 'inbox'"
            :disabled="selectedScreen === 'inbox'">Inbox</button>
    <button @click="selectedScreen = 'archive'"
            :disabled="selectedScreen === 'archive'">Archived</button>
    <BulkActionBar :emails="filteredEmails" />
    <table class="mail-table">
        <tbody>
        <tr v-for="email in filteredEmails"
            :key="email.id"
            @click="openEmail(email)"
            :class="['clickable', email.read ? '' : 'read' ]">
            <td>
                <input
                    @click="$event.stopPropagation(), toggleEmail(email)"
                    :checked="selectedEmail.has(email)"
                    type="checkbox"/>
            </td>
            <td>{{ email.from }}</td>
            <td>
                <p><strong>{{ email.subject }}</strong> - {{ email.body }}</p>
            </td>
            <td class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
            <td v-if="selectedScreen === 'inbox'"><button @click="$event.stopPropagation(),archivedEmail(email)">Archive</button></td>
        </tr>
        </tbody>
    </table>
    <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
        <MailView :email="openedEmail"  @changeEmail="changeEmail" />
    </ModalView>
</template>

<script setup lang="ts">
import MailView from "@/components/MailView.vue"
import ModalView from "@/components/ModalView.vue"
import BulkActionBar from "@/components/BulkActionBar"
import {format} from "date-fns"
import {ref, computed} from "vue";
import {ChangeEmailParamType, Email} from "@/types/email";
import useEmailStore from "@/store/email";
import useEmailSelection from "@/composable/use-email-selection";

const {emails: selectedEmail, toggle: toggleEmail} = useEmailSelection();

const emailStore = useEmailStore()

const openedEmail = ref<Email|null>(null);
const selectedScreen = ref<string>('inbox')

const filteredEmails = computed(() => {
    if(selectedScreen.value == 'inbox') {
        return  emailStore.sortedEmails.filter(e => !e.archived)
    } else {
        return  emailStore.sortedEmails.filter(e => e.archived)
    }
})

const readEmail = (email: Email) => {
    email.read = true;
    emailStore.updateEmail(email)
}

const openEmail = (email:Email) => {
    openedEmail.value = email
    if(email) {
        readEmail(email);
    }
}

const archivedEmail = (email: Email) => {
    email.archived= true;
    emailStore.updateEmail(email)
}

const changeEmail = ({toggleRead, toggleArchive, save, closeModal, changeIndex}:ChangeEmailParamType) => {
    let email = openedEmail.value
    if(toggleRead) { email.read = !email.read }
    if(toggleArchive) { email.archived = !email.archived }
    if(save) { emailStore.updateEmail(email) }
    if(closeModal) { openedEmail.value = null }
    if(changeIndex) {
        let emails = filteredEmails.value
        let currentIndex = emails.indexOf(openedEmail.value)
        let newEmail = emails[currentIndex + changeIndex]
        openEmail(newEmail)
    }
}
</script>