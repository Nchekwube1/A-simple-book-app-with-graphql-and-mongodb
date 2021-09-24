import {graphql} from "react-apollo"
import { getBooks } from "./Queries/queries"
import "./scss/booklist.css"
type eachBook ={
  name:string,
  id:string,
  _typename:string
}
type bookRes = eachBook[]




const Booklist =(props:any)=> {
    const books:bookRes = props.data.books

   if(props.data.loading === true){
        return(
            <h1 className="loading">Books Loading...</h1>
        )
   }

   else{
    return (
       <div className="bookList">
           <ul className="bul">
             {books.map((book:any)=>{
                return  <li className="bli" key={book.id}>{book.name}</li>
             })}
           </ul>
       </div>
    )
   }
}

export default graphql(getBooks)(Booklist)
