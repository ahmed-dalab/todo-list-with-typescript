import { Trash2,PencilOff  } from "lucide-react"
import { Todo } from "./TodoType"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTodoContext } from "../hook/useTodoContext"


type TodoItemProps = {
   todo: Todo,
}
function TodoItem({ todo }: TodoItemProps) {
   const [isEdit, setIsEdit]=useState(false)
  const [newText, setNextText] = useState(todo.text)
  const { dispatch } = useTodoContext()

  // delete todo
  const deleteTodo = async (id: string) => {
    try {
      const res = await axios.delete('http://localhost:4000/todos/'+id);
  
      if (res.status === 200) {
        // If the response status is OK (200), show a success toast
        dispatch({ type: 'DELETE_TODO', payload: id})
        toast.success("Deleted successfully");
       
      } else {
        // For other response status codes, show an error toast
        toast.error(`Failed to delete. Status: ${res.statusText}`);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error("An error occurred while deleting the item");
      console.error(error);
    }
  };

  // update todo
  const handleUpdate = async() => {
   
    try {
      const updatedTodo = { ...todo };
    const res = await axios.put('http://localhost:4000/todos/' + todo.id, {
      text: newText
    })
    if (res.status === 200) {
      // If the response status is OK (200), show a success toast
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo})
      toast.success("Updated successfully");
      setIsEdit(false)
    } else {
      // For other response status codes, show an error toast
      toast.error(`Failed to update. Status: ${res.statusText}`);
    }
  } catch (error) {
    toast.error("An error occurred while updating the item");
    console.log(error)
  }
    // todo.text = newText;
  }


  /// toggle completed 
  const completedTodo = async(id: string) => {
    try {
      const updatedCompleted = { ...todo, completed: !todo.completed }
      const res = await axios.put('http://localhost:4000/todos/' + id, updatedCompleted)
      if (res.status === 200) {
       dispatch({ type: 'COMPLETE_TODO', payload: updatedCompleted})
        console.log(res)
      } else {
        // For other response status codes, show an error toast
        console.log(res.statusText)
      }
    } catch (error) {
      toast.error("An error occurred while completing the item");
      console.log(error)
    }
   
  }
  return (
    <ul className="flex justify-between gap-20 px-16 py-6 text-2xl bg-white m-2 rounded shadow-xl  ">
      {isEdit ? (<input
        type="text"
        name="text"
        className="border-2  focus:border-teal-300 focus: outline-none text-left px-6 py-3 rounded text-2xl"
        value={newText}
        onChange={(e)=> setNextText(e.target.value)}
      />) : (<li onClick={()=> completedTodo(todo.id)} className={`${todo.completed ? 'line-through text-green-400' : ''}`}>{todo.text}</li>)}
    
      <div className="flex gap-10">
        {isEdit ? (
          <button
            onClick={() => handleUpdate()}
            className="text-sky-600 cursor-pointer ">Save
          </button>)
          : (
            <motion.button
            whileHover={{
              scale: 1.2
            }}
              onClick={() => setIsEdit(true)}
              className="text-sky-600 cursor-pointer "> <PencilOff />
            </motion.button>
          )}
    
    
        <motion.button
          whileHover={{
           scale: 1.2
         }}
          onClick={() => deleteTodo(todo.id)} className="text-red-400 cursor-pointer "><Trash2 /></motion.button>
    </div>
</ul>
  )
}

export default TodoItem
