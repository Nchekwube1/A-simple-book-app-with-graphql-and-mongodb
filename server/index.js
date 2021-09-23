import express from "express"
import schema from "./schema.js"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import cors from "cors"
const app = express()


app.use(cors())

mongoose.connect("mongodb://localhost:27017/graphqlbookapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("yay connectd successfully") })
    .catch(err => console.log(err))

let db = mongoose.connection

db.once("open", () => {
    console.log("connected to db")
})

db.on("error", () => {
    console.log("an error occured")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get("/graphql", (req, res) => { res.status(200).send("welcome") })
app.listen(5000, () => console.log("listening for requests on port 5000"))