const DiaryItem = ({diary}) => {
  return <div className="DiaryItem">
    <div className="info">
      <span>작성자: {diary.author} | 감정 점수: {diary.emotion}</span>
      <br />
      <span className="date">{new Date(diary.created_date).toLocaleString()}</span>
    </div>
    <div className="content">{diary.content}</div>
  </div>
}

export default DiaryItem;