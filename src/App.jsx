/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import './App.css'
import { FaPlus  ,FaPencilAlt , FaTrashAlt } from "react-icons/fa";
import { db } from './firebase-config';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';







const App = () => {


const [todos , setTodos] = useState([]);
const [input , setInput] = useState('');
const [editIndex , setEditIndex] = useState(-1);

useEffect(()=> {
  const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
  setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo })));

  });
  return () => unsubscribe();
}, []);



const setEdit = (index) => {
  setInput(todos [index].todo);
  setEditIndex(index);
}


const addTodo = async () => {
  try{

    if (input.trim() !== '') {
      // setTodos([...todos, { id: new Date(), todo: input }]);
     await addDoc (collection(db, 'todos'), {todo: input });
      setInput('')
      
    }

  } catch (error){
    console.error(error.message);
  }
}

const updateTodo =async () => {

try{

  if(input.trim () !== '') {
   //const updatedTodos = [...todos];
   // updatedTodos[editIndex].todo = input;
   //setTodos(updatedTodos);

   const todoDocRef = doc(db, 'todos', todos [editIndex].id);
   await updateDoc(todoDocRef, {todo: input});
   setEditIndex(-1);
   setInput('')


  }
} catch (error) {

  console.error(error.message);
}

}


const removeTodo = async (id) => {

try{
  await deleteDoc(doc(db, 'todos', id));

} catch (error){
  console.error(error.message);
}

}




  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover bg-no-repeat'>
       <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
        <h1 className=' text-3xl font-bold text-center mb-4'>Todo App</h1>
        <div className='flex'>
          <input
           type="text"
           placeholder='Add a todo'
           className='py-2 px-4 border rounded w-full focus:outline-none mr-2'
           value={input} 
           onChange={(e) => setInput(e.target.value)}
           />

           <button onClick={editIndex === -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4  rounded-sm hover:from-red-400 hover:to-gray-700'>
           {editIndex === -1 ? <FaPlus/> : <FaPencilAlt /> }
           </button >
        </div>
       </div>
       
      {
        todos.length > 0 && (
          <div className=' bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
          <ul>
          {todos.map((todo, index) =>(
              <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-2'>
              <span className='text-lg'>{todo.todo}</span>
              <div className='flex gap-3'>
              <button onClick={() => setEdit(index)} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-sm hover:from-red-400 hover:to-gray-700'>
              <FaPencilAlt />
              </button>
              <button onClick={() => removeTodo(todo.id)} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-sm hover:from-red-400 hover:to-gray-700'>
              <FaTrashAlt />
              </button>
              </div>
             </li>
          ))}
          </ul>
         </div>
        )
      }

    </div>
  );
};

export default App;