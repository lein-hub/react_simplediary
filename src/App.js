import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useState, useRef, useMemo } from 'react';
// import Lifecycle from './Lifecycle';
import { useEffect } from 'react';
import OptimizeTest from './OptimizeTest';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());

    const initData = res.slice(0, 20).map(item => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    });
    setData(initData);
  }

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data])
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((e) => e.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(data.map((e) => e.id === targetId ? {...e, content: newContent} : e))
  }

  const getDiaryAnalysis = useMemo(() => {
    let goodCount = 0;
    let badCount = 0;
    data.forEach((e) => {
      if (e.emotion > 2) {
        goodCount++;
      } else {
        badCount++;
      }
    });
    const goodRatio = goodCount / data.length * 100;

    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <Lifecycle></Lifecycle> */}
      <OptimizeTest></OptimizeTest>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 갯수: {goodCount}</div>
      <div>기분 나쁜 일기 갯수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}%</div>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit} />
    </div>
  );
}

export default App;
