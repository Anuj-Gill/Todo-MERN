import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Todos() {
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState({
    task: "",
    description: "",
    status: ""
  })
  const [addTodoStatus, setAddTodoStatus] = useState(false)
  const [addTodoResponse, setAddTodoResponse] = useState("")
  const [todoList,setTodoList] = useState([])
  const [loading, setLoading] = useState(true)

  async function getTodosList() {
    setAddTodoStatus(false)
    console.log("inside get todo")
    try{
      const fetchTodos = async () => {
        const reqT = await fetch("http://localhost:3000/todoG/home",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept":  "application/json",
            "Authorization" : localStorage.getItem("todoUserToken")
          }
        })
        const resT =  await reqT.json();
        console.log(resT)
        setTodoList(resT)
      }
      fetchTodos()
    }
    catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTodosList().finally(() => setLoading(false));
  },[addTodoStatus]);
  console.log(todoList)

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try{
      const req = await fetch("http://localhost:3000/todoG/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":  "application/json",
          "Authorization" : localStorage.getItem("todoUserToken")
        },
        body: JSON.stringify(todoData)
      })
      const res = await req.json();
      setAddTodoStatus(res.status)
      setAddTodoResponse(res.message)
      console.log(res)
    }
    catch(error) {
      console.log(error)
    }
  }

  function handleLogout() {
    localStorage.removeItem("todoUserToken");
    navigate('/login')
  }

  return(
    <>
      <div>Todos Page</div>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="Task" onChange={(e) => {setTodoData({...todoData, task: e.target.value})}} />
        <input type="text" placeholder="Description" onChange={(e) => {setTodoData({...todoData, description: e.target.value})}}  />
        <input type="text" onChange={(e) => {setTodoData({...todoData, status: e.target.value})}} placeholder="status" />
        <button type="submit">Add todo</button>
      </form>
      {addTodoStatus && (
        <div>{addTodoResponse}</div>
      )}
      {loading && <div>Loading...</div>}
      {!loading && (
        todoList.map((t) => (
          <div key={t._id}>
            <div>{t.task}</div>
            <div>{t.description}</div>
          </div>
        ))
      )}
    </>
  )
}