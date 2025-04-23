import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import './App.css';
import List from './components/List'
import Alert from './components/Alert';

function App() {

  const getLocalList = () => {
    let storedList = localStorage.getItem("todo-list");
    if (storedList) {
      return JSON.parse(storedList);
    } else {
      return [];
    }
  }

  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalList)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const [checkEditItem, setCheckEditItem] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const submitData = (e) => {
    e.preventDefault()
    if (!name) {
      setAlert({ show: true, msg: "Please input title", type: "error" })
    } else if (checkEditItem && name) {
      const result = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }
        }
        return item
      })
      setList(result)
      setName('')
      setCheckEditItem(false)
      setEditId(null)
      setAlert({ show: true, msg: 'Edited', type: 'success' })
    } else {
      const newItem = {
        id: uuidv4(),
        title: name,
        checked: false
      }
      setList([...list, newItem])
      setName('')
      setAlert({ show: true, msg: "Saved !!", type: "success" })
    }
  }

  const checkBoxItem = (id) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newCheckedStatus = !item.checked;
  
        setAlert({
          show: true,
          msg: `${item.title} is ${newCheckedStatus ? 'Succeed !!' : 'Unsuccess !!'}`,
          type: newCheckedStatus ? 'success' : 'error'
        });
  
        return { ...item, checked: newCheckedStatus };
      }
      return item;
    });
  
    setList(updatedList);
  };

  const removeItem = (id) => {
    const result = (list.filter((item) => item.id !== id))
    setList(result)
    setAlert({ show: true, msg: "Deleted !!", type: "error" })
  }

  const editItem = (id) => {
    setCheckEditItem(true)
    setEditId(id)
    const searchItem = list.find((item) => item.id === id)
    setName(searchItem.title)
  }

  return (
    <section className='container'>
      <h1>Todolist App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className='form-group' onSubmit={submitData}>
        <div className='form-control'>
          <input type='text' className='text-input'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type='submit' className='submit-btn'>
            {checkEditItem ? "Edit title" : "Add"}
          </button>
        </div>
      </form>
      <section className='list-container'>
        {list.map((data, index) => {
          return <List key={index} {...data} removeItem={removeItem} editItem={editItem} checkBoxItem={checkBoxItem} />
        })}
      </section>
    </section>
  );
}

export default App;