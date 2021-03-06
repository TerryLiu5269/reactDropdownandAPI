
import React, { useState, useEffect } from "react";
import './App.scss';
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




function App() {

  const [src, setSrc] = useState([]);
  const [data, setData] = useState([]);

  //num for chart
  const [HOMNum, setHOMNum] = useState(0);
  const [HOFNum, setHOFNum] = useState(0);
  const [HSMNum, setHSMNum] = useState(0);
  const [HSFNum, setHSFNum] = useState(0);
  // console.log(HOMNum, HOFNum, HSMNum, HSFNum)

  //for <bar/>
  const labels = ['共同生活戶', '獨立生活戶'];


  useEffect(() => {
    fetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106")
      .then((r) => r.json())
      .then((obj) => {
        //確認抓到資料
        // console.log(obj.responseData);

        //存原始資料
        setSrc(obj.responseData);

        //行政區分類 (for option)
        const data = [];
        obj.responseData.forEach(e => {
          //e.site_id.slice(3) > ex: '台北市大安區' 變成 '大安區'
          if (data.includes(e.site_id.slice(3))) {
            return
          } else {
            data.push(e.site_id.slice(3));
          }
        });
        //篩選為台北市行政區
        setData(data.slice(29, 41));
      });


  }, []);



  return (
    <>
      <div className="container">
        <div className="logoArea">
          <div className="logo"></div>
          <p>106年<br />人口戶數及性別</p>
        </div>
        <div className="showArea">
          <div className="select">
            <select onChange={(e) => {
              // household_ordinary_m(共同生活戶_男)
              // household_ordinary_f(共同生活戶_女)
              // household_single_m(單獨生活戶_男)
              // household_single_f(單獨生活戶_女)

              let HOMArr = []
              let HOFArr = []
              let HSMArr = []
              let HSFArr = []

              src.forEach(el => {
                if (e.target.value === '選擇行政區') {
                  setHOMNum(0);
                  setHOFNum(0);
                  setHSMNum(0);
                  setHSFNum(0);
                }
                if (el.site_id.includes(e.target.value)) {
                  HOMArr.push(parseInt(el.household_ordinary_m));
                  HOFArr.push(parseInt(el.household_ordinary_f));
                  HSMArr.push(parseInt(el.household_single_m));
                  HSFArr.push(parseInt(el.household_single_f));
                  setHOMNum(HOMArr.reduce((a, b) => a + b));
                  setHOFNum(HOFArr.reduce((a, b) => a + b));
                  setHSMNum(HSMArr.reduce((a, b) => a + b));
                  setHSFNum(HSFArr.reduce((a, b) => a + b));
                } else {
                  return
                }
              });
            }}>
              <option value="選擇行政區">選擇行政區</option>
              {data.map((v, i) => {
                return <option value={v} key={i}>{v}</option>
              })}
            </select>
          </div>
          <div className="chartArea">
            <Bar className="barstyle"
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                    text: 'Chart.js Bar Chart',
                  }
                }
              }}
              data={{
                labels,
                datasets: [
                  {
                    label: '女',
                    data: [HOFNum, HSFNum],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: '男',
                    data: [HOMNum, HSMNum],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              }} />
          </div>
        </div>
      </div>
    </>
  );
}


export default App;