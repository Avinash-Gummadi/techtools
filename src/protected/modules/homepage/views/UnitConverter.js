import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import './ViewStyles.css';

const UnitConverter = () => {
    const [category, setCategory] = useState('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('kilometer');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const categories = {
        length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'],
        weight: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'],
        temperature: ['celsius', 'fahrenheit', 'kelvin']
    };

    // Default units when category changes
    useEffect(() => {
        if (category === 'length') { setFromUnit('meter'); setToUnit('kilometer'); }
        if (category === 'weight') { setFromUnit('kilogram'); setToUnit('pound'); }
        if (category === 'temperature') { setFromUnit('celsius'); setToUnit('fahrenheit'); }
        setInputValue('');
        setResult('');
    }, [category]);

    useEffect(() => {
        convert();
    }, [inputValue, fromUnit, toUnit]);

    const convert = () => {
        if (inputValue === '') {
            setResult('');
            return;
        }
        const val = parseFloat(inputValue);
        if (isNaN(val)) return;

        let res = 0;

        if (category === 'length') {
            const meters = toMeters(val, fromUnit);
            res = fromMeters(meters, toUnit);
        } else if (category === 'weight') {
            const grams = toGrams(val, fromUnit);
            res = fromGrams(grams, toUnit);
        } else if (category === 'temperature') {
            res = convertTemp(val, fromUnit, toUnit);
        }

        setResult(res.toFixed(4).replace(/\.?0+$/, '')); // Clean trailing zeros
    };

    // Helper Conversion Functions
    const toMeters = (val, unit) => {
        const rates = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 };
        return val * rates[unit];
    };
    const fromMeters = (val, unit) => {
        const rates = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 };
        return val / rates[unit];
    };

    const toGrams = (val, unit) => {
        const rates = { gram: 1, kilogram: 1000, milligram: 0.001, pound: 453.592, ounce: 28.3495 };
        return val * rates[unit];
    };
    const fromGrams = (val, unit) => {
        const rates = { gram: 1, kilogram: 1000, milligram: 0.001, pound: 453.592, ounce: 28.3495 };
        return val / rates[unit];
    };

    const convertTemp = (val, from, to) => {
        if (from === to) return val;
        let celsius = val;
        if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9;
        if (from === 'kelvin') celsius = val - 273.15;

        if (to === 'celsius') return celsius;
        if (to === 'fahrenheit') return (celsius * 9 / 5) + 32;
        if (to === 'kelvin') return celsius + 273.15;
        return val;
    };

    return (
        <div>
            <SEO
                title="Unit Converter | Techtools Store"
                description="Instantly convert between common units of measurement like Length, Weight, and Temperature."
                canonical="https://techtools.gummadii.com/unit-converter"
                keywords="unit converter, online converter, length converter, weight converter, temperature converter"
            />
            <Header />
            <div className="container">
                <div className="view-container">
                    <div className="text-center mb-5">
                        <div className="mb-3">
                            <span className="bi bi-arrow-repeat text-primary" style={{ fontSize: '2.5rem' }}></span>
                        </div>
                        <h3 className="font-weight-bold">Unit Converter</h3>
                        <p className="text-muted">Instantly convert between common units of measurement.</p>
                    </div>

                    <div className="card border-0 shadow-sm p-4">
                        {/* Category Tabs */}
                        <div className="d-flex justify-content-center mb-4">
                            {Object.keys(categories).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`btn btn-sm mx-1 ${category === cat ? 'btn-primary' : 'btn-light text-secondary'}`}
                                    style={{ textTransform: 'capitalize', borderRadius: '20px', padding: '8px 20px' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="row align-items-center">
                            {/* From Section */}
                            <div className="col-md-5 mb-3 mb-md-0">
                                <label className="text-muted small font-weight-bold">From</label>
                                <input
                                    type="number"
                                    className="form-control premium-input mb-2"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter value"
                                    autoFocus
                                />
                                <select
                                    className="form-control premium-input"
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {categories[category].map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Divider Icon */}
                            <div className="col-md-2 text-center my-3 my-md-0">
                                <span className="bi bi-arrow-right d-none d-md-inline text-muted h4"></span>
                                <span className="bi bi-arrow-down d-inline d-md-none text-muted h4"></span>
                            </div>

                            {/* To Section */}
                            <div className="col-md-5">
                                <label className="text-muted small font-weight-bold">To</label>
                                <div className="p-3 bg-light rounded premium-input mb-2 d-flex align-items-center" style={{ minHeight: '52px' }}>
                                    <span className={`font-weight-bold h5 mb-0 ${result ? 'text-primary' : 'text-muted'}`}>
                                        {result || '---'}
                                    </span>
                                </div>
                                <select
                                    className="form-control premium-input"
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {categories[category].map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UnitConverter;
