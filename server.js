const { verify } = require("crypto")
const express = require("express")
const app = express()
const PORT = 3000
const jwt = require("jsonwebtoken")

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Hi"
    })
})

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        name: "Chijioke Ewuzie",
        email: "Ceejay@gmail.com"
    }

    jwt.sign({ user }, "secretkey", (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: " Post created...",
                authData
            })
        }
    })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {

     // Get auth header value
    const bearerHeader = req.headers['authorization']

    // Check if bearer is undefined

    if (typeof bearerHeader !== "undefined") {

        // Split at the space
        const bearer = bearerHeader.split(" ")

          // Get token from array
        const bearerToken = bearer[1]

          // Set the token
        req.token = bearerToken
    } else {
        res.sendStatus(403)
    }

      // Next middleware

    next()
}


app.listen((PORT || process.env.PORT), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App is listening on port ${PORT}`);
    }
})
