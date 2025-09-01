import React, { useState, useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import Header from './Header';
import Footer from './Footer';

const ToDo = () => {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [eachInput, seteachInput] = useState('');
    const [tasksChecked, settasksChecked] = useState(0);
    // const [editCheck, seteditCheck] = useState(false);
    useEffect(() => { settasksChecked(tasks.filter(task => task.completed).length) }, [tasks]);

    const handleChange = (e) => {
        if (!(/^\s/.test(e.target.value))) {
            setInputValue(e.target.value);
        }
    }

    const eachhandleChange = (e) => {
        if (!(/^\s/.test(e.target.value))) {
            seteachInput(e.target.value);
        }
    }

    const editableMark = (index) => {
        const newTasks = [...tasks];
        newTasks[index].editable = !newTasks[index].editable;
        setTasks(newTasks);
        window.localStorage.setItem('myTasks', JSON.stringify(newTasks))
    }

    const formSubmit = (e) => {
        e.preventDefault();
        if (inputValue !== '') {
            const newTask = {
                task: inputValue,
                completed: false,
                editable: false
            }
            setTasks([...tasks, newTask])
            setInputValue('')
            tasks.push(newTask)
            window.localStorage.setItem('myTasks', JSON.stringify(tasks))
        }
        else {
            console.log("Error in FormSubmit");
        }
    }

    const eachFormSubmit = (index) => {
        const newTasks = [...tasks];
        var temp = eachInput;
        if (temp === '') {
            temp = newTasks[index].task
        }
        newTasks[index].task = temp;
        newTasks[index].completed = false;
        newTasks[index].editable = false;
        setTasks(newTasks);
        setInputValue('');
        window.localStorage.setItem('myTasks', JSON.stringify(newTasks));
    }

    const handleDelete = (index) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
        window.localStorage.setItem('myTasks', JSON.stringify(newTasks))
    }

    const handleDeleteAll = () => {
        setTasks([])
        window.localStorage.setItem('myTasks', '')
    }

    const Checked = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
        window.localStorage.setItem('myTasks', JSON.stringify(newTasks))
    }

    useEffect(() => {
        const todoData = window.localStorage.getItem('myTasks');
        if (todoData) {
            let myLocalTasks = JSON.parse(todoData);
            setTasks(myLocalTasks);
        }
    }, [])
    const meta = {
        title: 'ToDo List in WebLaunch Store',
        description: 'List your Bucket of Works. You can edit, complete, delete the list',
        canonical: 'https://techtools.gummadii.com/todo',
        meta: {
            name: {
                keywords: 'ToDo, Bucket, Works, Tasks'
            }
        }
    };
    return (
        <DocumentMeta {...meta}>
            <Header />
            <div className="container">
                <div style={{ marginTop: "100px" }}>
                    <div className="unit-5 text-center">
                        <div className="unit-4-icon mr-4">
                            <span className="feather-list"></span>
                        </div>
                        <div>
                            <h3>ToDo your Bucket</h3>
                            <p>List your Bucket of Works. You can edit, complete, delete the list</p>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={formSubmit}>
                        <div className="form-group text-center">
                            <input type="text" className="form-control" placeholder='Type the work...' onChange={handleChange} value={inputValue} required />
                            <button className="btn btn-primary mt-3" type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>Submit</button>
                        </div>
                    </form>
                </div>
                {
                    tasks.length !== 0 ?
                        <div className='m-3'>
                            <button className="btn btn-primary" onClick={handleDeleteAll} style={{ padding: "10px 20px", fontSize: "16px" }}>Delete All</button>
                            <p className='mt-1 text-center'>No of works completed: {tasksChecked}</p>
                        </div>
                        : <p className='text-center'>No items in ToDo List</p>
                }
                <ul className=" list-group list-group-flush">
                    {
                        tasks.map((eachTask, idx) => (
                            <li key={idx} className='list-group-item'>
                                <div className='d-flex justify-content-between'>
                                    {eachTask.editable ?
                                        <>
                                            <form onSubmit={(e) => e.preventDefault()} style={{ width: "90%" }} className='d-flex align-items-center' id='eachFormList'>
                                                <span className='mr-2'>{idx + 1}.</span><input type="text" className="form-control" onChange={eachhandleChange} defaultValue={eachTask.task} required style={{ height: "39px" }} />
                                            </form>
                                            <div>
                                                <button title="cancel" style={{ padding: "5px 12px" }} className="border-0 btn-transition btn btn-outline-danger" onClick={() => editableMark(idx)}><span className="bi bi-x"></span></button>
                                                <button title="update" onClick={() => eachFormSubmit(idx)} style={{ padding: "5px 12px" }} className="border-0 btn-transition btn btn-outline-success"><span className="bi bi-send"></span></button>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div style={eachTask.completed ? { textDecoration: "line-through", color: "red" } : { fontWeight: "600" }}>
                                                <span className='mr-2'>{idx + 1}.</span>{eachTask.task}
                                            </div>
                                            <div>
                                                <button title="status" style={{ padding: "5px 12px" }} className={eachTask.completed ? "border-0 btn-transition btn btn-outline-danger" : "border-0 btn-transition btn btn-outline-success"} onClick={() => Checked(idx)}><span className={eachTask.completed ? "bi bi-x " : "bi bi-check"}></span></button>
                                                <button title="edit" style={{ padding: "5px 12px" }} className="border-0 btn-transition btn btn-outline-dark" onClick={() => editableMark(idx)}><span className="bi bi-pencil-square"></span></button>
                                                <button title="delete" style={{ padding: "5px 12px" }} className="border-0 btn-transition btn btn-outline-danger" onClick={() => handleDelete(idx)}><span className="bi bi-trash"></span></button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Footer />
        </DocumentMeta>
    )
}

export default ToDo