import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンシャインマンション 101号室', rent: 85000, area: '東京都新宿区' },
  { id: 2, name: 'グリーンヒルズ 203号室', rent: 72000, area: '東京都渋谷区' },
  { id: 3, name: 'リバーサイドアパート 305号室', rent: 65000, area: '神奈川県横浜市' },
  { id: 4, name: 'シティタワー 502号室', rent: 120000, area: '東京都港区' },
  { id: 5, name: 'パークサイドレジデンス 104号室', rent: 58000, area: '埼玉県さいたま市' },
  { id: 6, name: 'ハーバービュー 701号室', rent: 95000, area: '神奈川県川崎市' },
]

export default function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="properties-wrapper">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button className="btn-logout" onClick={handleSignOut}>
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <div key={property.id} className="property-card">
            <h2 className="property-name">{property.name}</h2>
            <div className="property-details">
              <p className="property-area">
                <span className="label">エリア</span>
                <span>{property.area}</span>
              </p>
              <p className="property-rent">
                <span className="label">家賃</span>
                <span className="rent-amount">
                  ¥{property.rent.toLocaleString('ja-JP')}<small>/月</small>
                </span>
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
