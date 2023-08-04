import React from 'react';
import Home from './home/index';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
function App() {
  return (
    <div style={{

    }}>
      <div style={{
        display:'flex',
        height:'72px',
        backgroundColor:"white",
        alignItems:'center'
      }}>
        <img 
        style={{
          marginLeft:"72px",
          height:'51px',
          width:'33px',
        }}
        src={require('./loho.png')}></img>
        <img 
        style={{
          marginLeft:"8px",
          height:'28px',
        }}
        src={require('./logot.png')}></img>

      </div>
      
      <Home></Home>
      
    </div>
    
  );
}

export default App;
