import Booklist from "./Booklist"
import "./scss/App.css"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Addbook from "./Addbook"
import Header from "./Header"
import Details from "./Details"
const client = new ApolloClient({
  uri:"http://localhost:5000/graphql"
})

function App() {
  return (
  <ApolloProvider client={client}>
    <Header/>
    <div className="body">

      <div className="left">
   <Addbook/>
     <Booklist/>
      </div>

      <div className="right">

        <Details/>
      </div>
  
    </div>
  
  </ApolloProvider>
  );
}

export default App;
