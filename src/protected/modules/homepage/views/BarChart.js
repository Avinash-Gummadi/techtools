// import React from 'react';
import React, { useState } from "react";
import DocumentMeta from 'react-document-meta';
import Header from './Header';
import Footer from './Footer';
// import BarChartCompt from "./components/BarChartCompt";
import { useReactToPrint } from "react-to-print";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function BarChart() {
  const [heading, setheading] = useState('');
  const [dataset, setdataset] = useState('');
  const [eachlabel, seteachlabel] = useState('');
  const [labels, setlabels] = useState([]);
  const [datasetsarr, setdatasetsarr] = useState([]);
  const [data, setdata] = useState('');
  const [color, setcolor] = useState('#23ca02');
  const [colorarr, setcolorarr] = useState([]);
  const [valuearr, setvaluearr] = useState([]);
  const [dataMock, setdataMock] = useState([]);
  const [count, setcount] = useState(0);
  const componentRef = React.useRef(null);

  const handleHeading = (e) => {
      if (!(/^\s/.test(e.target.value))) {
          setheading(e.target.value.toUpperCase());
      }
  }
  const handleDataSet = (e) => {
      if (!(/^\s/.test(e.target.value))) {
          setdataset(e.target.value);
      }
  }
  const handleLabel = (e) => {
      if (!(/^\s/.test(e.target.value))) {
          seteachlabel(e.target.value);
      }
  }
  const handleData = (e) => {
      if (e.target.value !== '' && e.target.value !== ' ' && e.target.value !== 'undefined') {
          setdata(e.target.value);
      } else {
          setdata('');
      }
  }
  const handleColor = (e) => {
      setcolor(e.target.value);
  }
  const eachFormData = (e) => {
      e.preventDefault();
      setcolorarr([...colorarr, color]);
      const valuesplit = data.replaceAll(' ', '').split(',');
      var valueint = []
      valuesplit.forEach(val => {
          valueint.push(val);
      });
      setvaluearr([...valuearr, [valueint]]);
      setcount(count + 1);
      setcolor('#23ca02');
      setdata('');
  }
  const finalBar = () => {
      var allDataMock = [];
      datasetsarr.map((eachdataset, idx) => {
          const newData = {
              label: eachdataset,
              data: valuearr[idx][0],
              backgroundColor: colorarr[idx],
          }
          console.log("newData: ", newData);
          allDataMock = [...allDataMock, newData];
          return false;
      });
      setdataMock(allDataMock);
  }
  const formSubmit = (e) => {
      e.preventDefault();
      const labelsplit = eachlabel.replaceAll(' ', '').split(',');
      const datasetsplit = dataset.replaceAll(' ', '').split(',');
      setlabels(labelsplit);
      setdatasetsarr(datasetsplit);
  }
  const urlParams = new URLSearchParams(window.location.search);
  var options = {};
  switch (urlParams.get('type')) {
      case 'vertical': {
          options = {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: heading,
                  },
              },
          };
          break;
      }
      case 'horizontal': {
          options = {
              indexAxis: 'y',
              elements: {
                  bar: {
                      borderWidth: 2,
                  },
              },
              responsive: true,
              plugins: {
                  legend: {
                      position: 'right',
                  },
                  title: {
                      display: true,
                      text: heading,
                  },
              },
          };
          break;
      }
      case 'stacked': {
          options = {
              plugins: {
                  title: {
                      display: true,
                      text: heading,
                  },
              },
              responsive: true,
              scales: {
                  x: {
                      stacked: true,
                  },
                  y: {
                      stacked: true,
                  },
              },
          };
          break;
      }
      default:
          break;
  }
  const dataSet = {
      labels,
      datasets: dataMock,
  };
  const reactToPrintContent = React.useCallback(() => {
      return componentRef.current;
  }, [componentRef]);
  const handlePrint = useReactToPrint({
      content: reactToPrintContent,
      documentTitle: `${heading.split(' ')[0]}_wlstore`,
      removeAfterPrint: true
  });
  const meta = {
    title: 'Bar Chart Techtools Store',
    description: 'List your Bucket of Works. You can edit, complete, delete the list',
    canonical: 'https://techtools.gummadii.com/barchart',
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
                    <span className="feather-bar-chart-2"></span>
                </div>
                <div>
                    <h3>Bar Chart</h3>
                    <p>Design Customized Bar Chart</p>
                </div>
            </div>
            {dataMock.length === 0 &&
                <div className="text-center">
                    {datasetsarr.length === 0 && <form onSubmit={formSubmit}>
                        <div>
                            <div className='form-group text-center d-flex align-items-center flex-nowrap gap-10'>
                                <input type="text" className="form-control" placeholder='Type the heading...' value={heading} onChange={handleHeading} required /><br />
                                {/* <select className="form-control" onChange={handlePieType}>
                                <option value="0">Default Pie</option>
                                <option value="1">Exploded Pie</option>
                                <option value="2">Donut Rounded Pie</option>
                                <option value="3">Donut Padded Pie</option>
                                <option value="4">Partial Pie</option>
                                <option value="5">90&#176; Pie</option>
                            </select> */}
                                <input type="text" className="form-control" placeholder='Type Dataset1, Dataset1, Dataset1......' value={dataset} onChange={handleDataSet} required /><br />
                            </div>
                            <div className="form-group text-center d-flex align-items-center flex-nowrap flex-column">
                                <input type="text" className="form-control" placeholder='Type label1, label2, label3, label4......' value={eachlabel} onChange={handleLabel} required /><br />
                                <button className="btn btn-primary" type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>Submit</button>
                            </div>
                        </div>
                    </form>}
                    {datasetsarr.length > count && <form onSubmit={eachFormData}>
                        <div>
                            {/* {datasetsarr.map((y, idx) => (
                                <div key={idx} className='form-group text-center d-flex align-items-center flex-nowrap gap-10'>
                                    <p className="m-0">{y}: </p>
                                    <input type="color" className="form-control" style={{ width: "100px" }} onChange={handleColor} required />
                                    <input type="text" className="form-control" placeholder={`value1, value2, value3...... for ${y}`} value={data} onChange={handleData} required /><br />
                                    <button className="btn btn-primary" type="button" style={{ padding: "10px 20px", fontSize: "16px" }} onClick={eachFormData}>Add</button>
                                </div>
                            ))} */}
                            <div className='form-group text-center d-flex align-items-center flex-nowrap gap-10'>
                                <p className="m-0 text-capitalize font-weight-bold font-italic text-black">{datasetsarr[count]}: </p>
                                <input type="color" className="form-control" style={{ width: "100px" }} value={color} onChange={handleColor} required />
                                <input type="text" className="form-control" placeholder={`Label values for ${datasetsarr[count]}`} value={data} onChange={handleData} required /><br />
                                <button className="btn btn-primary" type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>Add</button>
                            </div>

                        </div>
                    </form>
                    }
                    {datasetsarr.length !== 0 && datasetsarr.length === count && <button className="btn btn-primary" type="button" style={{ padding: "10px 20px", fontSize: "16px" }} onClick={finalBar}>Everything is Ready</button>}
                </div>}
            {dataMock.length !== 0 &&
                <>
                    <div>
                        <button onClick={handlePrint} className='btn-sm btn-secondary'><span className='feather-printer'></span> Print</button>
                    </div>
                    <div id='printIdBar' style={{ margin: '50px', border: '1px solid #ccc', padding: '50px', borderRadius: '3px' }} ref={componentRef}>
                        <Bar options={options} data={dataSet} />
                    </div>
                </>
            }
        </div>
      <Footer />
    </DocumentMeta>
  );
}
