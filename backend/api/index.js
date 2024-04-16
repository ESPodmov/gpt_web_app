const express = require('express');
const OpenAIController = require('./gpt-api.js')

const apiRouter = express.Router();

const API_KEY = process.env.OPENAI_API_KEY

const gptController = new OpenAIController(API_KEY);



apiRouter.post("/send-message", async (req, res) => {
    const { message } = req.body;
    const response = await gptController.getGptResponse(message);
    const status = response.status
    console.log(response)
    status < 400 ? res.json({ message: response }) : res.status(status).json({ message: response.error.message })
})


apiRouter.get("/", (req, res) => {
    res.json({ message: "Hello" })
})


module.exports = apiRouter