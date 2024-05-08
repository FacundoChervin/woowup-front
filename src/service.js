export default class EmailService {

    constructor(url, apiKey) {
        this.url = url + '/emails';
        this.apiKey = apiKey;
    }

    setHeaders = () => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.apiKey}`);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers
    }

    send = async (data) => {

        try {
            const response = await fetch(this.url + '/send', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: this.setHeaders()
            })

            if (response.status > 202) {
                console.log("error sending email")
            }
            const responseData = await response.json();
            return responseData.data;

        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    }


    fetchMailData = async (fetchId) => {
        try {
            const response = await fetch(`${this.url}/${fetchId}`, {
                headers: this.setHeaders()
            });
            if (!response.ok && response.status === 404) {
                const data = await response.json();
                alert(data.message);
            }
            else {
                const data = await response.json();
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

