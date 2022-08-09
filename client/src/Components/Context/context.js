
import { createContext, useState } from "react";
export const AuthContext = createContext(null)

export default function Context ({children}) {
    const [userId,setUserId] = useState()

    return(
        <AuthContext.Provider value={{userId,setUserId}}>
            {children}
        </AuthContext.Provider>
    )
 }