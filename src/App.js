import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useState } from 'react';


function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
