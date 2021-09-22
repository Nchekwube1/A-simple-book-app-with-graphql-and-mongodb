import graphl from "graphql"
// import Book from "./models/book"
import Author from "./models/author.js"
import Book from "./models/book.js"
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphl

const books = [
    { name: "lost wonders", id: "1", genre: "Sci-Fi", authorId: "1" },
    { name: "Anabele creation", id: "2", genre: "Horror", authorId: "2" },
    { name: "lets go into the jungle", id: "3", genre: "Adventure", authorId: "3" }
]
const authors = [
    { name: "jason bourne", id: "1", age: 27 },
    { name: "mark henry", id: "2", age: 45 },
    { name: "Rio ferdinand", id: "3", age: 72 }
]


const BookType = new GraphQLObjectType({
    name: "book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: Authortype,
            resolve(parent, args) {
                const res = authors.filter((author) => {
                    return author.id === parent.authorId
                })

                return res[0]
            }
        }
    })
})

const Authortype = new GraphQLObjectType({
    name: "author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                let res = books.filter(book => { return book.id === parent.id })
                return res
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const val = books.filter((book) => { return book.id === args.id })
                return val[0]
            }
        },
        author: {
            type: Authortype,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const val = authors.filter((book) => { return book.id === args.id })
                return val[0]
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(Authortype),
            resolve(parent, args) {
                return authors
            }
        },

    }
})

export default new GraphQLSchema({ query: RootQuery })