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
        return (
            <h1>{gres?.name}</h1>
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
