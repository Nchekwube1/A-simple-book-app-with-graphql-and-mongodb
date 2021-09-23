import {graphql} from "react-apollo"
import{gql} from "apollo-boost"
type eachAuthor ={
  name:string,
  id:string,
  _typename:string
}
type authorRes = eachAuthor[]


const getAuthors = gql`
{
    authors{
        name
        id
    }
}
`

const Addbook = (props:any)=>{
    if(props.data.loading === true){
        return(
                      <option disabled>loading Authors...</option>

        )
    }

    else{
        console.log(props)
return(
     <form action="" className="addbook">
  <div className="field">
      <input type="text" placeholder="book name" />
  </div>

  <div className="field">
      <input type="text" placeholder="genre" />
  </div>

  <div className="field">
      <label className="authlabel">Author:</label>
      <select>
          <option>Select Author</option>
          {/* {return ()} */}
      </select>
  </div>
  <button  type="submit">Add</button>
 </form>
)
    }
}

export default graphql(getAuthors)(Addbook)