const express = require('express')
const app = express()

const port = 3000




app.get('/', (req, res) => {
    res.type('text/plain; charset=utf8');
    res.send('Strona główna\n');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
