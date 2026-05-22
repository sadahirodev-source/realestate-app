import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../lib/properties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

export default function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  // 初回マウント時にSupabaseから物件一覧を取得
  useEffect(() => {
    const load = async () => {
      const { data, error } = await fetchProperties()
      if (!error) setProperties(data)
      setLoading(false)
    }
    load()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  // 新規登録フォームを開く
  const handleOpenAdd = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  // 編集フォームを開く（選択した物件データをセット）
  const handleOpenEdit = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  // モーダルを閉じる
  const handleCancel = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  // 登録または更新を実行し、ローカル状態を更新
  const handleSubmit = async (formData) => {
    if (editingProperty) {
      // 既存物件を更新
      const { data, error } = await updateProperty(editingProperty.id, formData)
      if (!error) {
        setProperties((prev) => prev.map((p) => (p.id === editingProperty.id ? data : p)))
        setShowForm(false)
        setEditingProperty(null)
      }
      return { error }
    } else {
      // 新規物件を登録
      const { data, error } = await createProperty(formData, user.id)
      if (!error) {
        setProperties((prev) => [data, ...prev])
        setShowForm(false)
      }
      return { error }
    }
  }

  // 物件を削除し、ローカル状態から除去
  const handleDelete = async (id) => {
    const { error } = await deleteProperty(id)
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="properties-wrapper">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button className="btn-add" onClick={handleOpenAdd}>＋ 新規登録</button>
          <button className="btn-logout" onClick={handleSignOut}>ログアウト</button>
        </div>
      </header>

      {loading ? (
        <div className="loading-wrapper"><p>読み込み中...</p></div>
      ) : properties.length === 0 ? (
        // 物件が0件のときは空状態を表示
        <div className="empty-state">
          <p className="empty-text">登録されている物件がありません</p>
          <button className="btn-primary" onClick={handleOpenAdd}>
            最初の物件を登録する
          </button>
        </div>
      ) : (
        <main className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </main>
      )}

      {/* 新規登録・編集モーダル */}
      {showForm && (
        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingProperty}
        />
      )}
    </div>
  )
}
