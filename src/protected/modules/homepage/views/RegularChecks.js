import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import DocumentMeta from 'react-document-meta';

// Helper function to get the current date as a string (e.g., "2025-09-16")
const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const RegularChecks = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(new Set());
    const [inputValue, setInputValue] = useState('');
    const [editingTask, setEditingTask] = useState(null); // { id, text }
    const [isLoaded, setIsLoaded] = useState(false); // To prevent premature saving

    // Effect to load all data from localStorage on mount
    useEffect(() => {
        // Load the master list of tasks
        try {
            const storedTasks = localStorage.getItem('regularChecksTasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Failed to parse tasks from localStorage", error);
        }

        // Load completion status for today
        try {
            const storedCompletionData = localStorage.getItem('dailyChecks');
            if (storedCompletionData) {
                const { date, completed } = JSON.parse(storedCompletionData);
                if (date === getTodayDateString()) {
                    setCompletedTasks(new Set(completed));
                } else {
                    // It's a new day, reset completion status
                    localStorage.setItem('dailyChecks', JSON.stringify({ date: getTodayDateString(), completed: [] }));
                }
            }
        } catch (error) {
            console.error("Failed to parse daily checks from localStorage", error);
        }
        setIsLoaded(true); // Mark loading as complete
    }, []); // Empty dependency array ensures this runs only once on mount

    // Effect to save completion status to localStorage whenever it changes
    useEffect(() => {
        // Only save to localStorage after initial loading is complete
        if (isLoaded) {
            const dataToStore = {
                date: getTodayDateString(),
                completed: [...completedTasks],
            };
            localStorage.setItem('dailyChecks', JSON.stringify(dataToStore));
        }
    }, [completedTasks, isLoaded]);

    // Effect to save the master task list whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('regularChecksTasks', JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    // Handle adding a new task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newTask = { id: Date.now(), text: inputValue.trim() };
        setTasks([...tasks, newTask]);
        setInputValue(''); // Clear input field
    };

    // Handle deleting all tasks
    const handleDeleteAll = () => {
        if (window.confirm('Are you sure you want to delete all tasks?')) {
            setTasks([]);
            setCompletedTasks(new Set());
        }
    };

    // Handle deleting a task
    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        // Also remove it from the completed set if it was completed
        setCompletedTasks(prevCompletedTasks => {
            const newCompletedTasks = new Set(prevCompletedTasks);
            newCompletedTasks.delete(taskId);
            return newCompletedTasks;
        });
    };

    // Handle checkbox clicks to toggle task completion
    const handleTaskToggle = (taskId) => {
        setCompletedTasks(prevCompletedTasks => {
            const newCompletedTasks = new Set(prevCompletedTasks);
            if (newCompletedTasks.has(taskId)) {
                newCompletedTasks.delete(taskId); // Uncheck task
            } else {
                newCompletedTasks.add(taskId); // Check task
            }
            return newCompletedTasks;
        });
    };

    // Handle saving an edited task
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editingTask || editingTask.text.trim() === '') return;
        setTasks(tasks.map(task => (task.id === editingTask.id ? { ...task, text: editingTask.text.trim() } : task)));
        setEditingTask(null); // Exit editing mode
    };

    const meta = {
        title: 'Techtools Daily Regular Checks',
        description: 'Keep track of your daily repetitive tasks.',
        canonical: 'https://techtools.gummadii.com/regularchecks',
        meta: {
            name: {
                keywords: 'daily checklist, tasks, regular checks, productivity'
            }
        }
    };

    return (
        <DocumentMeta {...meta}>
            <Header />
            <div className="container" style={{ marginTop: "100px", marginBottom: "100px" }}>
                <div className="unit-5 text-center">
                    <div className="unit-4-icon mr-4">
                        <span className="feather-check-square"></span>
                    </div>
                    <div>
                        <h3>Daily Checks</h3>
                        <p>Add your repetitive tasks. The checklist will reset everyday.</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {/* Form to add new tasks */}
                        <form onSubmit={handleAddTask} className="d-flex mb-4 align-items-start">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a new daily task"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoComplete="on"
                            />
                            <button type="submit" className="btn btn-primary ml-2" style={{ padding: ".55rem 1.2rem", fontSize: "1rem" }}>Add</button>
                        </form>

                        {/* Controls and Counter */}
                        {tasks.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <button className="btn btn-danger" onClick={handleDeleteAll} style={{ padding: "10px 20px", fontSize: "16px" }}>
                                        Delete All
                                    </button>
                                </div>
                                <div className="flex-grow-1 text-center">
                                    <p className='my-0'>
                                        Completed: {completedTasks.size} / {tasks.length}
                                    </p>
                                </div>
                                <div style={{ width: '88.81px' }}>{/* Spacer to balance the layout */}</div>
                            </div>
                        )}

                        {/* List of tasks */}
                        {tasks.length > 0 ? (
                            <ul className="list-group">
                                {tasks.map(task => {
                                    const isCompleted = completedTasks.has(task.id);
                                    const isEditing = editingTask && editingTask.id === task.id;

                                    return (
                                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {isEditing ? (
                                                <form onSubmit={handleSaveEdit} className="d-flex flex-grow-1 align-items-center">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editingTask.text}
                                                        onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                                                        autoFocus
                                                    />
                                                    <button title="Cancel" type="button" className="btn btn-sm btn-outline-secondary border-0 ml-2" onClick={() => setEditingTask(null)}>
                                                        <span className="bi bi-x-lg"></span>
                                                    </button>
                                                    <button title="Save" type="submit" className="btn btn-sm btn-outline-success border-0">
                                                        <span className="bi bi-check-lg"></span>
                                                    </button>
                                                </form>
                                            ) : (
                                                <>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={isCompleted}
                                                            id={`task-${task.id}`}
                                                            onChange={() => handleTaskToggle(task.id)}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`task-${task.id}`}
                                                            style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                                                        >
                                                            {task.text}
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <button title="Edit Task" className="btn btn-sm btn-outline-dark border-0" onClick={() => setEditingTask({ id: task.id, text: task.text })}>
                                                            <span className="bi bi-pencil-square"></span>
                                                        </button>
                                                        <button title="Delete Task" className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteTask(task.id)}>
                                                            <span className="bi bi-trash"></span>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-center text-muted">No tasks added yet. Add your daily tasks above.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </DocumentMeta>
    );
};

export default RegularChecks;