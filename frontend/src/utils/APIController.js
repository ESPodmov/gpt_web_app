import axios from "axios";


export class APIController {

    constructor(host, port) {
        this.endpoint = `http://${host}:${port}`;
    }

    async postSendMessage(message) {
        try {
            const response = await axios.post(
                `${this.endpoint}/api/send-message`,
                {
                    message
                }
            )
            return response.data.message;
        } catch (error) {
            console.log(error);
            if (error.response) {
                const error_message = `Sorry error ${error.response.status} occured while sinding your question. ${error.response.data.message}`
                return error_message
            } else {
                return `Sorry ${error.message} occured`
            }
        }
    }


}