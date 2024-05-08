import Email from './Email.js';
import EmailService from './service.js';

const emailService = new EmailService(process.env.BACKEND_URL, process.env.API_KEY);

async function sendEmail() {
    const form = document.getElementById('emailForm');
    const formData = new FormData(form);

    const senderName = formData.get('senderName');
    const senderEmail = formData.get('senderEmail');
    const subject = formData.get('subject');
    const content = formData.get('content');

    const recipients = collectReceipts();
    const email = new Email(senderName, senderEmail, recipients, subject, content);


    const sendStatusMessage = document.getElementById('sendStatusMessage');
    const textToCopy = document.getElementById('textToCopy')

    try {
        const response = await emailService.send(email.getEmail())
        cleanForm(form)

        if (response) {
            sendStatusMessage.textContent = 'Email sent successfully! Batch ID ===> '
            sendStatusMessage.style.color = 'green';
            textToCopy.textContent = response.batchID;
            const stringTextToCopy = textToCopy.textContent;
            textToCopy.classList.remove('no-display');
            textToCopy.addEventListener('click', () => {
                navigator.clipboard.writeText(stringTextToCopy)
                    .then(() => {
                        alert('Text has been copied to clipboard');
                    })
                    .catch(err => {
                        console.error('Unable to copy text: ', err);
                        alert('Failed to copy text to clipboard');
                    });
            });
        }
        else{
            sendStatusMessage.textContent = 'Error sending the email';
        }
    } catch (error) {
        sendStatusMessage.textContent = 'Error sending the email';
        sendStatusMessage.style.color = 'red';
    }


}

const fetchMailData = async () => {
    const fetchId = document.getElementById('fetchId')
    const fetchIdValue = fetchId.value;
    const data = await emailService.fetchMailData(fetchIdValue);
    if (data) {
        displayMailData(data);
    } else {
        fetchId.value = ""
    }
}

const collectReceipts = () => {
    const senders = [];
    const receiverDivs = document.querySelectorAll('.recipient');
    receiverDivs.forEach(senderDiv => {
        const name = senderDiv.querySelector('.recipientName').value;
        const email = senderDiv.querySelector('.recipientEmail').value;
        senders.push({ name, email });
    });
    return senders;
}

const cleanForm = (form) => {
    const recipientsContainer = document.getElementById('recipientsContainer');
    recipientsContainer.innerHTML = '';
    form.reset();
}
const createRecipientInput = () => {
    const recipientsContainer = document.getElementById('recipientsContainer');
    const recipient = document.createElement('div');
    recipient.classList.add('recipient');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    recipient.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'recipientName';
    nameInput.classList.add('recipientName');
    nameInput.placeholder = 'Name';
    nameInput.setAttribute("required", "");
    recipient.appendChild(nameInput);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    recipient.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.classList.add('recipientEmail');
    emailInput.name = 'recipientEmail';
    emailInput.setAttribute("required", "");
    recipient.appendChild(emailInput);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.type = 'button';
    removeButton.classList.add('btn', 'btn-remove')
    removeButton.addEventListener('click', () => {
        recipientsContainer.removeChild(recipient);
    });
    recipient.appendChild(removeButton);

    recipientsContainer.appendChild(recipient);
}

const displayMailData = (data) => {
    const mailList = document.getElementById('mailList');
    mailList.innerHTML = '';

    data.emails.forEach(mail => {
        const mailItem = document.createElement('div');
        mailItem.classList.add('mail-item');

        const sender = document.createElement('div');
        sender.textContent = `Sender: ${mail.from.name} - ${mail.from.email}`;
        mailItem.appendChild(sender);

        const recipient = document.createElement('div');
        recipient.textContent = `Recipient: ${mail.recipient}`;
        mailItem.appendChild(recipient);

        const subject = document.createElement('div');
        subject.textContent = `Subject: ${mail.subject}`;
        mailItem.appendChild(subject);

        const sentStatus = document.createElement('div');
        sentStatus.textContent = `Sent: ${mail.status ? 'Yes' : 'No'}`;
        mailItem.appendChild(sentStatus);

        mailList.appendChild(mailItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('sendButton');
    const emailForm = document.getElementById('emailForm');
    const fetchSection = document.getElementById('fetchSection');

    sendButton.addEventListener('click', () => {
        emailForm.reportValidity();
        if (emailForm.checkValidity()) {
            sendEmail();
        }
    });
    const addRecipientButton = document.getElementById('addRecipientButton')
    addRecipientButton.addEventListener('click', () => {
        createRecipientInput();
    })
    const fetchDataButton = document.getElementById('fetchDataButton')

    fetchDataButton.addEventListener('click', () => {
        fetchSection.reportValidity();
        if (fetchSection.checkValidity()) {
            fetchMailData();
        }
    });

    document.getElementById('textToCopy').classList.add('no-display');
});