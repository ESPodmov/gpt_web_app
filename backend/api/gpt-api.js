const axios = require("axios");
const OpenAI = require("openai");


class OpenAIController {

    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
    }

    async getGptResponse(question) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: [{
                    role: "user",
                    content: question
                }],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

module.exports = OpenAIController

