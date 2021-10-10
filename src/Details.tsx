import { getBook } from "./Queries/queries"
import {graphql} from "react-apollo" 
import { useContext,FC } from "react"
import ApolloClient from "apollo-boost"
import { globalContext } from "./Global"
import{gql} from "apollo-boost"
import "./scss/details.css"

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
})

const Details:FC = ( props:any)=> {
    const {select} = useContext(globalContext)
    if(select ===""){
        return(
            <h1 className="click">click on a book panel to display details here</h1>
        )
    }
    else{
      
         client.query({
             query:gql`
             {
    book(id:"${select}"){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
                genre
            }
        }
    }
}
             `
         }).then(res=>
            
            console.log(res.data.book)
            
            )

          return (
        <div className="details">
            <h1>{select}</h1>
            
        </div>
    )
    }
  
}

export default graphql(getBook,{
    options:()=>{
        return{
            variables:{
                id:null
            }
        }
    }
})(Details)
