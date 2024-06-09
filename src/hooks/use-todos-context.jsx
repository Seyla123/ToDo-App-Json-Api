import { useContext } from "react"
import TodosContext from "../contexts/todos"

function useTodosContext(){
    return useContext(TodosContext)
  }
export default useTodosContext