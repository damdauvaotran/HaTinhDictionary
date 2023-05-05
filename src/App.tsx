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
    setHaTinh(translate(tiengViet, hatinhMap));
  };

  const chuiNguoc = () => {
    setTiengViet(translate(hatinh, mapNguoc));
  };

  const translate = (
    str: string,
    mapLanguage: { [key: string]: string }
  ): string => {
    const tiengVietHaTinh = str.toLowerCase();
    const tiengVietHaTinhArr = tiengVietHaTinh.split(' ');
    let unTranslatedWords = [];
    let translatedWords = [];
    const keyList = Object.keys(mapLanguage).sort(
      (a, b) => b.length - a.length
    );
    for (const word of tiengVietHaTinhArr) {
      unTranslatedWords.push(word);
      const unTranslatedString = unTranslatedWords.join(' ');
      for (const key of keyList) {
        if (unTranslatedString.includes(key)) {
          const translatedString = unTranslatedString.replace(
            new RegExp(`(?<=^|\\s|\\W)${key}(?=$|\\s|\\W)`, 'gu'),
            mapLanguage[key]
          );
          unTranslatedWords = [];
          translatedWords.push(translatedString);
          break;
        }
      }
    }
    translatedWords = [...translatedWords, ...unTranslatedWords];
    return translatedWords.join(' ');
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

      <span style={{padding: 10 }}></span>
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
