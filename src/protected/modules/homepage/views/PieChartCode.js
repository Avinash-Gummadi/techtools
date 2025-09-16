import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import DocumentMeta from 'react-document-meta';
import Header from './Header';
import Footer from './Footer';
import { useReactToPrint } from "react-to-print";

export default function PieChartCode() {
    const [heading, setheading] = useState('');
    const [title, settitle] = useState('');
    const [value, setvalue] = useState(0);
    const [color, setcolor] = useState('#e84545');
    const [dataMock, setdataMock] = useState([]);
    const [totalValue, settotalValue] = useState(0);
    const [shitindex, setshitindex] = useState(0);
    const [pietype, setpietype] = useState(0);
    const [labeltype, setlabeltype] = useState(0);
    const shiftSize = 7;
    const componentRef = React.useRef(null);

    const handleHeading = (e) => {
        if (!(/^\s/.test(e.target.value))) {
            setheading(e.target.value);
        }
    }
    const handleTitle = (e) => {
        console.log("handleTitle: ", e);
        if (!(/^\s/.test(e.target.value))) {
            settitle(e.target.value);
        }
    }
    const handlePieType = (e) => {
        setpietype(parseInt(e.target.value));
    }
    const handleLabels = (e) => {
        setlabeltype(parseInt(e.target.value));
    }
    const handleValue = (e) => {
        setvalue(e.target.value);
    }
    const handleColor = (e) => {
        setcolor(e.target.value);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        var r, g, b;
        r = parseInt("0x" + color.substring(1, 3));
        g = parseInt("0x" + color.substring(3, 5));
        b = parseInt("0x" + color.substring(5, 7));
        if (r > 200 && b > 200 && g > 200) {
            alert("For Users Experience close to white color is not allowed");
            setcolor("#e84545");
            return false;
        } else {
            const newData = {
                title: title,
                value: value,
                color: color
            }
            setdataMock([...dataMock, newData]);
            settitle(''); setvalue(0); setcolor('#e84545');
            dataMock.push(newData);
            var z = 0;
            dataMock.forEach(eachdetail => {
                z = z + parseInt(eachdetail.value);
                settotalValue(z);
            });
        }
    }
    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: `${heading.split(' ')[0]}_wlstore`,
        removeAfterPrint: true
    });
    const meta = {
        title: 'Pie Chart Techtools Store',
        description: 'List your Bucket of Works. You can edit, complete, delete the list',
        canonical: 'https://techtools.gummadii.com/piechart',
        meta: {
            name: {
                keywords: 'ToDo, Bucket, Works, Tasks'
            }
        }
    };
    return (
        <DocumentMeta {...meta}>
            <Header />
            <div className='container' style={{ marginTop: "100px" }}>
                <div className="unit-5 text-center">
                    <div className="unit-4-icon mr-4">
                        <span className="feather-pie-chart"></span>
                    </div>
                    <div>
                        <h3>Pie Chart</h3>
                        <p>Design Customized Pie Chart</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={formSubmit}>
                        <div className='form-group text-center d-flex align-items-center flex-nowrap gap-10'>
                            <input type="text" className="form-control" placeholder='Type the heading...' value={heading} onChange={handleHeading} required />
                            <select className="form-control" onChange={handlePieType}>
                                <option value="0">Default Pie</option>
                                <option value="1">Exploded Pie</option>
                                <option value="2">Donut Rounded Pie</option>
                                <option value="3">Donut Padded Pie</option>
                                <option value="4">Partial Pie</option>
                                <option value="5">90&#176; Pie</option>
                            </select>
                            <select className="form-control" onChange={handleLabels}>
                                <option value="0">Inside Labels</option>
                                <option value="1">Outside Labels</option>
                            </select>
                        </div>
                        <div className="form-group text-center d-flex align-items-center flex-nowrap gap-10">
                            <input type="text" className="form-control" placeholder='Type the title...' value={title} onChange={handleTitle} required />
                            <input type="number" className="form-control" placeholder='Type the value...' value={value} onChange={handleValue} required />
                            <input type="color" className="form-control" style={{ width: "100px" }} onChange={handleColor} value={color} required />
                            <button className="btn btn-primary" type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>Add</button>
                        </div>
                    </form>
                </div>
                {dataMock.length !== 0 &&
                    <>
                        <div>
                            <button onClick={handlePrint} className='btn-sm btn-secondary'><span className='feather-printer'></span> Print</button>
                        </div>
                        <div className='d-flex align-items-center w-90' style={{ margin: 'auto', height: "650px" }} id='printIdPie' ref={componentRef}>
                            <div className='m-auto' style={pietype === 4 || pietype === 5 ? { width: "500px", height: "350px", border: "1px solid #ccc" } : { width: "500px", height: "550px", border: "1px solid #ccc" }}>
                                <PieChart
                                    data={dataMock}
                                    // radius={pietype===5?60:pietype===3?40:PieChart.defaultProps.radius - shiftSize}
                                    radius={pietype === 5 ? 60 : 40}
                                    segmentsShift={(index) => (pietype === 1 && index === shitindex ? shiftSize : 0.5)}
                                    // onBlur={(e, index) => (console.log("onBlur: ", e, index))}
                                    // onClick={(e, index) => (seteachdetail(`${dataMock[index].title}: ${dataMock[index].value}`))}
                                    onClick={(e, index) => (setshitindex(index))}
                                    // onMouseOut={(e, index) => (seteachdetail(''))}
                                    // onFocus={(e, index) => (console.log("onFocus: ", e, index))}
                                    // onKeyDown={(e, index) => (console.log("onKeyDown: ", e, index))}
                                    // onMouseOut={(e, index) => (console.log("onMouseOut: ", e, index))}
                                    // onMouseOver={(e, index) => (console.log("onMouseOver: ", e, index))}
                                    lineWidth={pietype === 2 || pietype === 3 ? 15 : 100}
                                    rounded={pietype === 2 ? true : false}
                                    paddingAngle={pietype === 3 ? 5 : 0}
                                    startAngle={pietype === 4 ? 180 : pietype === 5 ? -180 : 0}
                                    lengthAngle={pietype === 4 ? 180 : pietype === 5 ? 90 : 360}
                                    viewBoxSize={pietype === 4 ? [100, 50] : [100, 100]}
                                    center={pietype === 5 ? [70, 80] : pietype === 4 ? [50, 40] : [50, 50]}
                                    totalValue={totalValue}
                                    animate
                                    animationDuration={1000}
                                    animationEasing={"ease-out"}
                                    // reveal={100}
                                    // background="#bfbfbf"
                                    // label={({ dataEntry }) => dataEntry.title + ' - ' + Math.round(dataEntry.percentage) + '%' + 'Value: ' + dataEntry.value}
                                    // label={({ dataEntry }) => `${dataEntry.title} - ${dataEntry.value}`}
                                    label={({ dataEntry }) => dataEntry.value}
                                    // label={({ x, y, dx, dy, dataEntry }) => (
                                    //     <text
                                    //         key={dx}
                                    //         x={x}
                                    //         y={y}
                                    //         dx={dx}
                                    //         dy={dy}
                                    //         dominantBaseline="central"
                                    //         textAnchor="middle"
                                    //         style={{
                                    //             fill: '#fff', pointerEvents: 'none', fontSize: '3px', fontFamily: 'sans-serif', fontWeight: '600'
                                    //         }}
                                    //     >
                                    //         <tspan x={x} y={y} dx={dx} dy={dy}>{dataEntry.title}</tspan>
                                    //         {/* <tspan x={x} y={y} dx={dx} dy={dy}>{`${Math.round(dataEntry.percentage)}%`}</tspan> */}
                                    //         <tspan x={x} y={y + 10} dx={dx} dy={dy}>Value: {dataEntry.value}</tspan>
                                    //     </text>
                                    // )}
                                    labelStyle={{
                                        fontSize: '3px',
                                        fontFamily: 'sans-serif',
                                        fill: '#000',
                                        fontWeight: '600',
                                        pointerEvents: 'none'
                                    }}
                                    // labelPosition={70}
                                    labelPosition={labeltype === 0 ? 70 : 105}
                                />
                                <i className='text-center d-block mt-3'>{heading}</i>
                            </div>
                            <div>
                                <div className='d-flex gap-10 align-items-center fw-800'><span style={{
                                    border: "2px solid #000000",
                                    background: "#fff",
                                    width: "15px",
                                    borderRadius: "50%",
                                    display: "block",
                                    height: "15px"
                                }}></span>
                                    <span>Total: {totalValue}</span>
                                </div>
                                {dataMock.map((eachSection, idx) => (
                                    <div key={idx} className='d-flex gap-10 align-items-center'><span style={{
                                        border: "1px solid #000000",
                                        background: `${eachSection.color}`,
                                        width: "15px",
                                        borderRadius: "50%",
                                        display: "block",
                                        height: "15px"
                                    }}></span>
                                        <span style={{ whiteSpace: 'nowrap', width: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{eachSection.title}: {eachSection.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </DocumentMeta>
    )
}
