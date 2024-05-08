export default class EmailAddress {
    constructor(name, email) {
        this.name = name
        this.email = email
    }

    getEmailAddress = () => {
        return {
            name: this.name,
            email: this.email
        }
    }
}
