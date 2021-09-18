import express from "express"
import schema from "./schema.js"
import { graphqlHTTP } from "express-graphql"
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get("/graphql", (req, res) => { res.status(200).send("welcome") })
app.listen(5000, () => console.log("listening for requests on port 5000"))