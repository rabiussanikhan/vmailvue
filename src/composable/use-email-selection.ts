import {reactive} from "vue";
import {Email} from "@/types/email";
import axios from "axios";
const emails = reactive(new Set<Email>())
interface fnType {
    (e:Email): void
}
export const useEmailSelection = ()  => {
    const toggle = (email: Email) => {
        if(emails.has(email)) emails.delete(email)
        else emails.add(email)
    }
    const clear = () => {
        emails.clear()
    }
    const addMultiple = (newEmails:Email[]) => {
        newEmails.forEach((email) => {
            emails.add(email)
        })
    }

    const forSelected = (fn:fnType) => {
        emails.forEach(email => {
            fn(email)
            axios.put(`http://localhost:3000/emails/${email.id}`, email).then(r => console.log(r))
        })
    };
    const markRead = () => forSelected(e => e.read = true )
    const markUnread = () => forSelected(e => e.read = false )
    const archive = () => { forSelected(e => e.archived = true); clear()}

    return {emails, toggle, clear, addMultiple, markRead, markUnread, archive}
}
export default useEmailSelection