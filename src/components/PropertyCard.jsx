// 物件情報を表示するカード。編集・削除ボタン付き
export default function PropertyCard({ property, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`「${property.name}」を削除してもよろしいですか？`)) {
      onDelete(property.id)
    }
  }

  return (
    <div className="property-card">
      <h2 className="property-name">{property.name}</h2>
      <div className="property-details">
        <p className="property-area">
          <span className="label">エリア</span>
          <span>{property.area}</span>
        </p>
        <p className="property-layout">
          <span className="label">間取り</span>
          <span>{property.layout}</span>
        </p>
        <p className="property-rent">
          <span className="label">家賃</span>
          <span className="rent-amount">
            ¥{property.rent.toLocaleString('ja-JP')}<small>/月</small>
          </span>
        </p>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(property)}>編集</button>
        <button className="btn-delete" onClick={handleDelete}>削除</button>
      </div>
    </div>
  )
}
