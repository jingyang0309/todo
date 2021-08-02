import React, { useEffect, useRef, useState } from 'react'

function App() {
  const [todo, setTodo] = useState('')
  const [todoArr, setTodoArr] = useState([])
  const todoInput = useRef()

  let todoList = []

  // 處理送出
  function handleSumit() {
    if (todo === '') return
    todoList = [localStorage.getItem('todoArr')]
    let arr = []
    arr.push(todo)
    console.log(arr)
    // 若無資料改寫入第一筆
    if (todoList[0] === '') {
      todoList = todo
    } else {
      todoList.push(arr)
    }

    console.log(todoList)
    localStorage.setItem('todoArr', todoList)
    setTodoArr(localStorage.getItem('todoArr').split(','))
    setTodo('')
  }

  // const todoInput = document.getElementById('todoInput')
  // 載入畫面存入todoArr
  useEffect(() => {
    if (localStorage.getItem('todoArr')) {
      todoList = localStorage.getItem('todoArr').split(',')
      setTodoArr(todoList)
    }
    todoInput.current.focus()
  }, [])

  // 刪除
  function deleteTodo(id) {
    console.log(id)
    todoList = localStorage.getItem('todoArr').split(',')
    // todoList.splice(i, 2)
    // console.log(todoList)
    const newList = todoList.filter((v, i) => {
      return v !== id
    })
    console.log(newList)
    localStorage.setItem('todoArr', newList)
    setTodoArr(localStorage.getItem('todoArr').split(','))
  }

  const display = todoArr.map((v, i) => (
    <>
      <div className="todo">
        <p>{todoArr[i]}</p>
        <button
          onClick={() => {
            deleteTodo(todoArr[i])
          }}
        >
          X
        </button>
      </div>
    </>
  ))

  return (
    <>
      <div className="box">
        <h2
          onClick={() => {
            console.log(todoArr)
          }}
        >
          今日工作清單
        </h2>
        <input
          id="todoInput"
          type="text"
          placeholder="請輸入今日工作事項"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value)
          }}
          ref={todoInput}
          onKeyPress={(e) => {
            console.log(e.which)
            if (e.which === 13) {handleSumit()}
          }}
        ></input>
        <button
          className="sumit"
          onClick={() => {
            handleSumit()
          }}
        >
          確定
        </button>
        {todoArr.length === 0 || todoArr[0] === '' ? (
          <div className="noTodo">
            <p>目前尚無定義工作事項!</p>
          </div>
        ) : (
          <div className="todoList">{display}</div>
        )}
      </div>
    </>
  )
}

export default App
