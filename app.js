const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors())

app.listen(3000, console.log ('Server is running'))

app.get('/api/test',(req, res) =>{
    return res.status(200).json({Code: 200, Msg: 'good', form: 'BEAU'})
})