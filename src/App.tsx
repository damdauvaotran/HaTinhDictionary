import { useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';
import { BiArrowFromTop, BiArrowFromBottom } from 'react-icons/bi';

const hatinhMap: { [key: string]: string } = data;
function App() {
  const [hatinh, setHaTinh] = useState('');
  const [tiengViet, setTiengViet] = useState('');

  const mapNguoc = useMemo(() => {
    return Object.keys(hatinhMap).reduce((acc, key) => {
      acc[hatinhMap[key]] = key;
      return acc;
    }, {} as { [key: string]: string });
  }, []);

  const chui = () => {
    let tiengVietHaTinh = tiengViet.toLowerCase();

    const keyList = Object.keys(mapNguoc).sort((a, b) => b.length - a.length);
    for (const key of keyList) {
      tiengVietHaTinh = tiengVietHaTinh.replace(
        new RegExp(`(?<=^|\\s)${key}(?=$|\\s)`, 'gu'),
        mapNguoc[key]
      );
    }
    setHaTinh(tiengVietHaTinh);
  };

  const chuiNguoc = () => {
    let tiengVietHaTinh = hatinh.toLowerCase();

    const keyList = Object.keys(hatinhMap).sort((a, b) => b.length - a.length);
    for (const key of keyList) {
      tiengVietHaTinh = tiengVietHaTinh.replace(
        new RegExp(`(?<=^|\\s)${key}(?=$|\\s)`, 'gu'),
        hatinhMap[key]
      );
    }
    setTiengViet(tiengVietHaTinh);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
          style={{ width: '100%' }}
        ></textarea>
      </div>
      <button onClick={chui}>
        <BiArrowFromTop />
        Dịch
      </button>
      <button onClick={chuiNguoc}>
        <BiArrowFromBottom />
        Dịch lại
      </button>
      <div>
        <div>
          <label>Tiếng Nghệ Tĩnh</label>
        </div>
        <textarea
          rows={10}
          value={hatinh}
          style={{ width: '100%' }}
          onChange={(e) => {
            setHaTinh(e.target.value);
          }}
        ></textarea>
      </div>
    </>
  );
}

export default App;
