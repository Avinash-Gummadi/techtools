import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import './ViewStyles.css';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedExpenses = window.localStorage.getItem('myExpenses');
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
    }, []);

    useEffect(() => {
        const t = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        setTotal(t);
        window.localStorage.setItem('myExpenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description && amount) {
            const newExpense = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                date: new Date().toLocaleDateString()
            };
            setExpenses([newExpense, ...expenses]);
            setDescription('');
            setAmount('');
        }
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all expenses?')) {
            setExpenses([]);
        }
    };

    return (
        <div>
            <SEO
                title="Smart Expense Tracker | Techtools Store"
                description="Track your daily spending and stay on budget with our free online expense tracker."
                canonical="https://techtools.gummadii.com/expense-tracker"
                keywords="expense tracker, budget tracker, personal finance tool"
            />
            <Header />
            <div className="container">
                <div className="view-container">
                    <div className="text-center mb-5">
                        <div className="mb-3">
                            <span className="bi bi-wallet2 text-primary" style={{ fontSize: '2.5rem' }}></span>
                        </div>
                        <h3 className="font-weight-bold">Smart Expense Tracker</h3>
                        <p className="text-muted">Track your daily spending and stay on budget.</p>
                    </div>

                    <div className="card border-0 shadow-sm p-4 mb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <input
                                        type="text"
                                        className="form-control premium-input"
                                        placeholder="Description (e.g. Coffee)"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3 mb-md-0">
                                    <input
                                        type="number"
                                        className="form-control premium-input"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                        step="0.01"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="premium-btn premium-btn-primary w-100">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {expenses.length > 0 && (
                        <div className="summary-bar mb-4">
                            <span className="text-muted">Total Spent</span>
                            <h3 className="text-primary font-weight-bold mb-0">₹{total.toFixed(2)}</h3>
                            <button className="btn btn-sm btn-light text-danger" onClick={clearAll}>Clear All</button>
                        </div>
                    )}

                    <ul className="list-unstyled">
                        {expenses.map(expense => (
                            <li key={expense.id} className="list-card">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-2 mr-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                            <span className="bi bi-receipt text-secondary"></span>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 font-weight-bold">{expense.description}</h6>
                                            <small className="text-muted">{expense.date}</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="font-weight-bold mr-3 text-dark">-₹{expense.amount.toFixed(2)}</span>
                                        <button className="btn btn-sm text-danger p-0" onClick={() => deleteExpense(expense.id)}>
                                            <span className="bi bi-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {expenses.length === 0 && (
                            <div className="text-center text-muted mt-5">
                                <p>No expenses logged yet.</p>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ExpenseTracker;
