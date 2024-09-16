import axios from "axios"
import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import { GET_API_URL } from "../services/api"
import { useTodoContext } from "../hook/useTodoContext"


export const TodoList = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { state, dispatch } = useTodoContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(GET_API_URL)
                // setTodos(res.data)
                dispatch({ type: 'SET_TODOS', payload: res.data })
                setLoading(false)
                
                
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        fetchData()
    }, [dispatch])
    
    
    return (
        <div className="mx-auto">
            {loading && <div className="text-xl" >loading...</div>}
            {state.todos?.map((todo) => (
               <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}