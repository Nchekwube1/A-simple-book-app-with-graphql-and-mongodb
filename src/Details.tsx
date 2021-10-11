import { getBook } from "./Queries/queries"
import {graphql} from "react-apollo" 
import { useContext,FC,useState } from "react"
import ApolloClient from "apollo-boost"
import { globalContext } from "./Global"
import{gql} from "apollo-boost"
import "./scss/details.css"
interface booktype {
             name:string
                id:string
                genre:string  
}
interface detailRes{
             name:string
                id:string
                genre:string  
        author?:{
            id:string
            name:string
            age:number
            books: booktype[]
        }
    }

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
})

const Details:FC = ( )=> {
    const {select} = useContext(globalContext)
    const [gres,setGres] = useState<detailRes|null>(null)
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
         }).then((res:any) =>
        { 
            let ion:detailRes|null = res.data.book
            setGres(ion)
               }
            
            )
      
        if(gres === null){
            return(
                <h1 className="loading">loading details... </h1>
            )
        }
        console.log(gres.author?.books)
        return (

            <div className="res">
                <div className="name"><h1>{gres.name}</h1></div>
                <div className="aname"><h1>{gres.author?.name}</h1></div>
                <div className="genre"><h1>{gres.genre}</h1></div>
              <div className="others">
                  <h1>other books by this author: </h1>
                   {gres.author?.books? gres.author?.books.map((book)=>{
                      return (
                          <li key={book.id} className="list">{book.name}</li>
                      )
                  }) :   <h1 className="err">oops author details not available</h1>}
              </div>
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
