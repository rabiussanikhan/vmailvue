<template>
    <h1>VMail Inbox</h1>
    <h1>{{useEmailSelection().emails.size}} emails selected</h1>
    <div v-if="emailStore.loader">Loading...</div>

    <MailTable v-else/>


</template>

<script setup lang="ts">
import useEmailStore from "@/store/email";
import MailTable from "@/components/MailTable.vue";
import useEmailSelection from "@/composable/use-email-selection";
const emailStore = useEmailStore()
emailStore.fetchEmail();
</script>