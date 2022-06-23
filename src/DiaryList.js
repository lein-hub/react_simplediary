import DiaryItem from "./DiaryItem"

const DiaryList = ({diaryList, onRemove, onEdit}) => {

  return <div className="DiaryList">
    <h2>일기 리스트</h2>
    <h4>{diaryList.length}개의 일기가 있습니다</h4>
    <div>
      {diaryList.map((diary) => {
        return <DiaryItem key={diary.id} diary={diary} onRemove={onRemove} onEdit={onEdit} />
      })}
    </div>
  </div>
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;