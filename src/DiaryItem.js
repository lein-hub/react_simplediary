import React, {useEffect, useState, useRef, useContext} from 'react';
import {DiaryDispatchContext} from './App';

const DiaryItem = ({diary}) => {
  useEffect(()=> {
    console.log(`${diary.id}번째 DiaryItem 렌더`)});

  const {onRemove, onEdit} = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(diary.content);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const localContentInput = useRef()

  const handleRemove = () => {
    if (window.confirm(`${diary.id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(diary.id);
    }
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${diary.id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(diary.id, localContent);
      setIsEdit(false);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(diary.content);
  }

  return <div className="DiaryItem">
    <div className="info">
      <span>작성자: {diary.author} | 감정 점수: {diary.emotion}</span>
      <br />
      <span className="date">{new Date(diary.created_date).toLocaleString()}</span>
    </div>
    <div className="content">{isEdit ? <><textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)} /></> : diary.content}</div>
    {isEdit ? 
      <>
        <button className="saveBtn" onClick={handleEdit}>저장</button>
        <button className="cancelBtn" onClick={handleQuitEdit}>취소</button>
      </> : 
      <>
        <button className="removeBtn" onClick={handleRemove}>삭제</button>
        <button className="editBtn" onClick={toggleIsEdit}>수정</button>
      </>}
  </div>
}

export default React.memo(DiaryItem);