import { Todo } from "../components/TodoType";
export type ActionType = 
    | { type: 'SET_TODOS'; payload: Todo[] }
    | { type: 'ADD_TODO'; payload: Todo}
    | { type: 'DELETE_TODO'; payload: string }
    |  { type: 'UPDATE_TODO'; payload: Todo}
    |  { type: 'COMPLETE_TODO'; payload: Todo}
       