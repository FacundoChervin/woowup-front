import EmailAddress from "./EmailAddress.js"

export default class Email {
    constructor(senderName, senderEmail, recipients, subject, content) {
        this.senderEmail = new EmailAddress(senderName, senderEmail)
        this.subject = subject
        this.content = content


        this.recipients = recipients.map(value => {
            return new EmailAddress(value.name, value.email)
        })


    }

    getEmailDestinations = () => {
        return this.recipients.map(value => {
            return value.getEmailAddress()
        })
    }

    getEmail = () => {
        return {
            from: this.senderEmail.getEmailAddress(),
            destinations: this.getEmailDestinations(),
            subject: this.subject,
            plainContent: this.content
        }
    }
}
