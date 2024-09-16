import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { useTodoContext } from "../hook/useTodoContext"


function TodoForm() {
  const [text, setText] = useState('')
  const notifyCreated = () => toast.success('Created successfully')
  const notifyError = () => toast.error("Something is wrong")
  const { dispatch } = useTodoContext()
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault()


    const todo = {
      id: Date.now().toString(),
      text: text,
      completed: false
    }
   

    if (text.trim() === '') {
      return alert('Please fill the text input.')
    }

    const res = await axios.post('http://localhost:4000/todos', todo , {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (res.status === 201) {
      dispatch({ type: 'ADD_TODO', payload: todo})
      setText('')
      notifyCreated()
      
    } else {
      console.log(res)
      notifyError()
    }

     }

  return (
    <div className="mx-auto ">
          <form className="flex space-x-3 p-3"
           onSubmit={handleSubmit}
          >
        <input className="px-10 py-3 rounded text-xl border-2 border-gray-300 focus:border-teal-300 focus:outline-none "
          type="text"
          placeholder="Add new task.."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <motion.button
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: 'treen', stiffness: 130, delay: 1, duration: 0.5}}
          className="bg-white px-2 text-xl rounded hover:bg-teal-300 hover:text-white" type="submit">Add</motion.button>
         </form>
    </div>
  )
}

export default TodoForm
