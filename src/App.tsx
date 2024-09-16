import  { Toaster } from 'react-hot-toast';
import TodoForm from "./components/TodoForm"
import { TodoList } from "./components/TodoList"
import { motion } from 'framer-motion';


function App() {
 
  return (
    <div className="mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.5 }}
        className="text-center text-4xl font-bold my-2 mt-10 text-white ">TodoList App</motion.h1>
      <div className="flex flex-col mx-auto">
      <TodoForm />
      <TodoList />
      </div>
      <Toaster />
   </div>
  )
}

export default App
