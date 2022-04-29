import React, { useState, useEffect } from "react";
import './App.scss';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106")
      .then((r) => r.json())
      .then((obj) => {
        //確認抓到資料
        // console.log(obj.responseData);

        //行政區分類
        obj.responseData.forEach(e => {
          if (data.includes(e.site_id)) {
            return
          } else {
            data.push(e.site_id)
          }
        });
        console.log('data', data);
        setData(data);
      });
  }, []);



  return (
    <>
      <div className="container">
        <div className="logoArea">
          <div className="logo"></div>
          <p>106年<br />人口戶數及性別</p>
        </div>
        <div className="select">
          <select>
            <option value="1">選擇行政區</option>
            {data.map((v, i) => {
              return <option value={v} key={i}>{v}</option>
            })}
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
