import axios from "../config/axiosInstance"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import ListCard from "../components/ListCard";


export default function Board() {

  const [list, setList] = useState([]);
  const { id } = useParams();
  // console.log(id, '', 'ini id');

  async function fetchList() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/list/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // console.log(data, '', 'ini data');

      setList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);


  return (

    <>

      <div className="container mx-auto p-4">
        <div className="flex gap-4 overflow-x-auto">
          {list.map((el) => (
            <ListCard key={el.id} el={el} />
          ))}
        </div>
      </div>



    </>

  )
}