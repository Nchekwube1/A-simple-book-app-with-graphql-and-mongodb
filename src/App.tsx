import Booklist from "./Booklist"
import "./scss/App.css"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Addbook from "./Addbook"
import Header from "./Header"
import Details from "./Details"
import Global from "./Global.jsx"
const client = new ApolloClient({
  uri:"http://localhost:5000/graphql"
})

function App() {
  
  return (
   <Global>
     <ApolloProvider client={client}>
    <Header/>
    <div className="body">

      <div className="left">
   <Addbook/>
     <Booklist/>
      </div>

      <div className="right">

        <Details />
      </div>
  
    </div>
  
  </ApolloProvider>
   </Global>
  );
}

export default App;
