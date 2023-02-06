import {defineStore} from "pinia";
import {Email} from "@/types/email";
import axios from "axios";
export const useEmailStore = defineStore('emailStore', {
    state: () => ({
        emails: [] as Email[],
        loader: false as boolean
    }),
    getters: {
        sortedEmails(state):Email[] {
            return state.emails.sort((e1, e2) => {
                return e1.sentAt < e2.sentAt ? 1 : -1
            })
        },
        loadingStatus(state): boolean {
            return state.loader
        }
    },
    actions: {
        async fetchEmail() {
            this.loader = true
            axios.get('http://localhost:3000/emails').then(r => {
                setTimeout(() => {
                    this.emails = r.data
                    this.loader = false;
                }, 500)
            })
        },
        async updateEmail(email:Email) {
            axios.put(`http://localhost:3000/emails/${email.id}`, email).then((r) => {
                console.log(r)
            })
        }
    }
})

export default useEmailStore