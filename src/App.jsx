import axios from 'axios'
import React, {useState, useCallback} from 'react';
import {Tabs} from 'antd';

const GATEWAY_URL = "https://app.dev.aws.abraham.fun"; //"https://gateway-test.abraham.ai";
const MINIO_URL = "https://minio.aws.abraham.fun";
const MINIO_BUCKET = "creations-stg";


function App() {
  // const [images, setImages] = useState([]);

  async function onClickCreateKey() {
    const apiKey = document.querySelector("input[name=apiKey]").value;
    const apiSecret = document.querySelector("input[name=apiSecret]").value;
    const note = document.querySelector("input[name=note]").value;
    const balance = document.querySelector("input[name=balance]").value;

    if (!apiKey || !apiSecret) {
      alert("Please enter your API key and secret in the first tab");
      return;
    }

    if (note.length === 0) {
      alert('Note required');
      return;
    }

    if (balance < 1) {
      alert('Balance required');
      return;
    }

    const request = {
      adminKey: apiKey, 
      adminSecret: apiSecret, 
      note: note,
      balance: balance   
    }

    // make request
    let responseR = await axios.post(GATEWAY_URL+'/create_key', request)
    document.querySelector(`#resultKey`).innerHTML = `<b>key</b>: ${responseR.data.key}`;
    document.querySelector(`#resultSecret`).innerHTML = `<b>key</b>: ${responseR.data.secret}`;
  }

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="API Key" key="1">
          <div>
            <br/>&nbsp;<br/>
            API Key: <input type="text" style={{fontSize: "1.05em", width: "300px"}} name="apiKey" placeholder="API Key" required />
            <br/>&nbsp;<br/>
            API Secret: <input type="text" style={{fontSize: "1.05em", width: "300px"}} name="apiSecret" placeholder="API Secret" required />
            <br/>&nbsp;<br/>
            <hr/>
            Note: <input type="text" style={{fontSize: "1.05em", width: "300px"}} name="note" placeholder="Note" required />
            <br/>&nbsp;<br/>
            Balance: <input type="text" style={{fontSize: "1.05em", width: "300px"}} name="balance" placeholder="1000" required />
            <br/>&nbsp;<br/>
            <button style={{fontSize: "1.1em", width: "200px"}} onClick={onClickCreateKey}>Create new key</button>
            <br/>&nbsp;<br/>
            <hr/>
            <br/>&nbsp;<br/>
            <br/><span id="resultKey"></span>
            <br/>&nbsp;<br/>
            <br/><span id="resultSecret"></span>
            
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Balances" key="2">
          <div>
            <br/>&nbsp;<br/>
            TBD
            <br/>&nbsp;<br/>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
