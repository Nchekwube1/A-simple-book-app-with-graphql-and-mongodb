import {graphql} from "react-apollo"
import {flowRight as compose} from "lodash"
import { useState } from "react"
import {getAuthors,addBook, getBooks} from "./Queries/queries"
import "./scss/Addbook.css"
type eachAuthor ={
  name:string,
  id:string,
  _typename:string
}
type authorRes = eachAuthor[]




const Addbook = (props:any)=>{
const [name,setName] =useState("")
const [genre,setGenre]= useState("")
const [authorId, setAuthorid] = useState("")
  const formSubmit = (e:any)=>{
      e.preventDefault()
      props.addBook({
          variables:{
            name,
            genre,
            authorId

          },
          refetchQueries:()=>[{query:getBooks}]
      })
      setName("")
      setAuthorid("")
     setGenre("")
  }
    if(props.getAuthors.loading === true){
        return(
                      <option disabled>loading Authors...</option>

        )
    }

    else{
        const authorsArr:authorRes =props.getAuthors.authors
return(
     <form action="" className="addbook" onSubmit={formSubmit}>
      <input type="text"  className="field"  placeholder="book name" value={name} onChange={e=> setName(e.target.value)}/>

      <input type="text" className="field"  placeholder="genre" value={genre} onChange={e=> setGenre(e.target.value)} />

      <select className="select" onChange={
          (e)=>{ setAuthorid(e.target.value)}
         }>
          <option className="select">Select Author</option>
          {authorsArr.map((author:eachAuthor)=>{
              return (
                  <option className="select" key={author.id} value={author.id}>{author.name}</option>
              )
          })}
      </select>
  <button  className="button" type="submit">Add book</button>
 </form>
)
    }
}

export default compose(
    graphql(getAuthors, {name:"getAuthors"}),
    graphql(addBook,{name:"addBook"})
)(Addbook)