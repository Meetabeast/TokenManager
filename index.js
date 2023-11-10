const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const TokenModel = require("./models/TokenModel");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'ok',
    });
});

app.post('/tokens/generate', (req, res) => {
    const { tokendata } = req.body;

    if(!tokendata) {
        return res.status(404).json({
            status: 404,
            message: 'No valid data found in the body.'
        })
    }

    const token =  jwt.sign({ data: tokendata }, process.env.SECRET_KEY);
    TokenModel.create({ token: token }).catch(err => {
        if(err) {
            return res.status(500).json({ status: 500, error: 'Token generation failed!'});
        }
    }).then(data => res.status(200).json({ status: 200, token: data }));
});

app.get('/tokens/validate', (req, res) => {
    const token = req.query.token;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({ status: 401, error: 'Invalid token.'});
        }
        res.status(200).json({ status: 200, message: 'Token is valid', data: decoded.data})
    })
});

mongoose.connect(
    process.env.MONGO_DB
).then(() => console.log(`[SERVER] MongoDB is running up!`));
app.listen(process.env.PORT ?? 3000, () => console.log(`[TOKEN MANAGER] - Manager is running at: http://localhost:${process.env.PORT ?? 3000}`))