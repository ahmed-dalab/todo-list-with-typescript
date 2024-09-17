import { createContext, useReducer } from "react"
import { Todo } from "../components/TodoType"
import { ActionType } from "./actionTypes"

type TodoContextProps = {
    children: React.ReactNode
}
 
// define state type 
interface TodoState {
        todos: Todo[] | null
}
// initial state
const initialState: TodoState = {
    todos: null
} 

// create context
export const TodoContext = createContext<{ state: TodoState, dispatch: React.Dispatch<ActionType>
} | undefined>(undefined)

// reducer
const todoReducer = (state: TodoState, action: ActionType): TodoState => {
    switch (action.type) {
        case 'SET_TODOS': 
            return {
                todos: action.payload
            }
        case 'ADD_TODO': 
            return {
                todos: [action.payload, ...(state.todos || [])]
            }
        case 'UPDATE_TODO': 
            return {
                todos: state.todos?.map((todo) => 
                 todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo 
                ) || null
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos?.filter((todo)=> todo.id !== action.payload ) || null
            }
        case 'COMPLETE_TODO':
            return {
                todos: state.todos?.map((todo)=> todo.id === action.payload.id ? {...todo, completed: action.payload.completed } : todo) || null
            }
        default:
            return state
    }
}
export const TodoContextProvider = ({ children }: TodoContextProps) => {
    const [state, dispatch] = useReducer(todoReducer,initialState)
    return (
        <TodoContext.Provider value={{state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}