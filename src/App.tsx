import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';

const hatinhMap: { [key: string]: string } = data;
function App() {
  const [hatinh, setHaTinh] = useState('');
  const [tiengViet, setTiengViet] = useState('');

  const chui = () => {
    let tiengVietHaTinh = tiengViet.toLowerCase();
    const keyList = Object.keys(hatinhMap).sort((a, b) => b.length - a.length);
    for (const key of keyList) {
      tiengVietHaTinh = tiengVietHaTinh.replace(
        new RegExp(`(?<=^|\\s)${key}(?=$|\\s)`, 'gu'),
        hatinhMap[key]
      );
    }
    setHaTinh(tiengVietHaTinh);
  };

  return (
    <>
      <div>
        <div>
          <label>Tiếng Việt</label>
        </div>
        <textarea
          rows={10}
          value={tiengViet}
          onChange={(e) => {
            setTiengViet(e.target.value);
          }}
          style={{width: '100%'}}
        ></textarea>
      </div>
      <button onClick={chui}>Chửi</button>
      <div>
        <div>
          <label>Tiếng Nghệ Tĩnh</label>
        </div>
        <textarea rows={10} value={hatinh}  style={{width: '100%'}}></textarea>
      </div>
    </>
  );
}

export default App;
