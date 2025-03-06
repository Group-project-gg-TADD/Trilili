import { createContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance";


const UserContext = createContext({
    user: [],
    setUser: () => { },
})

export default UserContext;

export function UserProvider({ children }) {
    const [user, setUser] = useState([]);

    async function fecthUser() {
        try {

            const { data } = await axios({
                method: "GET",
                url: "/user",
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
            console.log(data, "<<< data user");
            setUser(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );


}