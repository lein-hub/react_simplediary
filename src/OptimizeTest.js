import React, {useState, useEffect} from 'react';

// const TextView = React.memo(({text}) => {
//   useEffect(() => {
//     console.log(`Update :: Text : ${text}`);
//   });
//   return <div>{text}</div>
// })

// const CountView = React.memo(({count}) => {
//   useEffect(() => {
//     console.log(`Update :: Count : ${count}`);
//   })
//   return <div>{count}</div>
// })

const CounterA = React.memo(({count}) => {
  useEffect(() => {
    console.log(`Update :: CounterA : ${count}`);
  })
  return <div>{count}</div>
})

const CounterB = ({object}) => {
  useEffect(() => {
    console.log(`Update :: CounterB : ${object.count}`);
  });
  return <div>{object.count}</div>
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.object.count === nextProps.object.count) {
    return true; // 이전 프롭스와 현재 프롭스가 같다 -> 리렌더링을 일으키지 않게됩니다.
  }
  return false; // 이전 프롭스와 현재 프롭스가 다르다 -> 리렌더링을 일으키게됩니다.
}

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [object, setObject] = useState({
    count: 1,
  });

  return <div style={{ padding: 50 }}>
    {/* <div>
      <h2>count</h2>
      <CountView count={count}></CountView>
      <button onClick={()=>setCount(count+1)}>+</button>
    </div>
    <div>
      <h2>text</h2>
      <TextView text={text}></TextView>
      <input value={text} onChange={e=>setText(e.target.value)}/> 
    </div>*/}
    <div>
      <h2>Counter A</h2>
      <CounterA count={count}></CounterA>
      <button onClick={() => setCount(count)}>A button</button>
    </div>
    <div>
      <h2>Counter B</h2>
      <MemoizedCounterB object={object}></MemoizedCounterB>
      <button onClick={() => setObject({ count: object.count })}>B button</button>
    </div>
  </div>
}

export default OptimizeTest;