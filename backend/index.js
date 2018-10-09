const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const CLIENT_RESOURCES = 'frontend'
app.use('/resources',express.static(`${CLIENT_RESOURCES}/resources`))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,`../${CLIENT_RESOURCES}/index.html`))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))