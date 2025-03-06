import { createContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useParams } from "react-router";

const ListCardContext = createContext({
    list: [],
    setList: () => { },
    newListName: [],
    setNewListName: () => { },
})

export default ListCardContext;

export function ListCardProvider({ children }) {
    const [list, setList] = useState([]);
    const [newListName, setNewListName] = useState("");
    // const { id } = useParams()

    async function fetchList(id) {
        try {
            const { data } = await axios({
                method: "GET",
                url: `/list/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log(data, "tessss<<<<");

            setList(data);
        } catch (error) {
            console.log(error);
        }
    }


    async function addList(id) {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/list/${id}`,
                data: { name: newListName },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setList([...list, { ...data, Cards: [] }]);
            setNewListName("");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);
    return (
        <ListCardContext.Provider
            value={{
                list,
                setList,
                fetchList,
                newListName,
                setNewListName,
                addList,
            }}
        >
            {children}
        </ListCardContext.Provider>
    );
}

