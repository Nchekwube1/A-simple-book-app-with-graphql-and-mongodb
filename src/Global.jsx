import {createContext, useState } from "react"
export const globalContext = createContext()

const Global = ({children})=>{
     const [select,setSelect] = useState("")

     return(
          <globalContext.Provider value={
               {
                    select,
                    setSelect
               }
          }>
               {children}
          </globalContext.Provider>
         
     )
}

export default Global