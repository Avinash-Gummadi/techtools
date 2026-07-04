import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import './ViewStyles.css';
import html2pdf from 'html2pdf.js';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState(() => {
        const storedExpenses = window.localStorage.getItem('myExpenses');
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    });
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const t = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        setTotal(t);
        window.localStorage.setItem('myExpenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description && amount) {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            const newExpense = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                date: formattedDate
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

    const downloadPDF = () => {
        const element = document.createElement('div');
        element.innerHTML = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="text-align: center; color: #333;">Expense Report</h1>
                <p style="text-align: center; color: #666;">Generated on: ${new Date().toLocaleDateString('en-GB')}</p>
                <hr style="border: 1px solid #eee;" />
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Description</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Date</th>
                            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${expenses.map(exp => `
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">${exp.description}</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">${exp.date}</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${exp.amount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold; background-color: #f8f9fa;">
                            <td colspan="2" style="padding: 12px; text-align: right;">Total Spent:</td>
                            <td style="padding: 12px; text-align: right;">₹${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        const opt = {
            margin: 1,
            filename: `expenses_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
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
                    <div className="text-center mb-2">
                        <div className="mb-2">
                            <span className="bi bi-wallet2 text-primary" style={{ fontSize: '2.5rem' }}></span>
                        </div>
                        <h3 className="font-weight-bold">Expense Tracker</h3>
                        <p className="text-muted mb-0">Track your daily spending and stay on budget</p>
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
                            <div className="d-flex align-items-center">
                                <span className="text-muted mr-3">Total Spent</span>
                                <h3 className="text-primary font-weight-bold mb-0">₹{total.toFixed(2)}</h3>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-light text-primary mr-2" onClick={downloadPDF}>
                                    <span className="bi bi-download mr-1"></span>
                                </button>
                                <button className="btn btn-sm btn-light text-danger" onClick={clearAll}>Clear All</button>
                            </div>
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
