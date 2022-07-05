import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useRef, useMemo, useCallback, useReducer, useEffect } from 'react';
// import Lifecycle from './Lifecycle';
// import OptimizeTest from './OptimizeTest';

// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return [...action.data];
    case 'CREATE':
      return [action.data, ...state];
    case 'REMOVE':
      return state.filter(e => e.id !== action.id);
    case 'EDIT':
      return state.map(e => e.id === action.id ? {...e, content: action.content} : e);
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

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
    // setData(initData);
    dispatch({type: 'INIT', data: initData});
  }

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    // setData(data => [newItem, ...data]);
    dispatch({type: 'CREATE', data: newItem});
  }, []);

  const onRemove = useCallback((targetId) => {
    // setData(data => data.filter((e) => e.id !== targetId));
    dispatch({type: 'REMOVE', id: targetId});
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    // setData(data => data.map((e) => e.id === targetId ? {...e, content: newContent} : e))
    dispatch({type: 'EDIT', id: targetId, content: newContent});
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit};
  }, []);
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <Lifecycle></Lifecycle> */}
          {/* <OptimizeTest></OptimizeTest> */}
          <DiaryEditor />
          <div>전체 일기: {data.length}</div>
          <div>기분 좋은 일기 갯수: {goodCount}</div>
          <div>기분 나쁜 일기 갯수: {badCount}</div>
          <div>기분 좋은 일기 비율: {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
