const express = require('express');
const cors = require('cors');
const apiRouter = require('./api/index.js');


const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3001;


app.use("/api", apiRouter)


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
