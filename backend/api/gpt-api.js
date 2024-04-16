const axios = require("axios");
const OpenAI = require("openai");




class OpenAIController {


    constructor(apiKey, max_tokens) {
        this.openai = new OpenAI({ apiKey });
        this.max_tokens = max_tokens
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
                max_tokens: this.max_tokens,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

module.exports = OpenAIController

