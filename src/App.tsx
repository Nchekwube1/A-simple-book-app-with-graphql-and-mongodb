import Booklist from "./Booklist"
import "./scss/App.css"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Addbook from "./Addbook"
const client = new ApolloClient({
  uri:"http://localhost:5000/graphql"
})

function App() {
  return (
  <ApolloProvider client={client}>
     <>
   <h1 className="newFont">GraphQL is Awesome</h1>

   <Booklist/>
   <Addbook/>
     </>
  </ApolloProvider>
  );
}

export default App;
