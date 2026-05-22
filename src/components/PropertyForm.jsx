import { useState, useEffect } from 'react'

// 間取りの選択肢
const LAYOUT_OPTIONS = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK', '4LDK以上']

// 物件の新規登録・編集を行うモーダルフォーム
// initialData が null のとき新規登録、値があるとき編集モード
export default function PropertyForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState({ name: '', rent: '', area: '', layout: '1LDK' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 編集モード時：既存データをフォームにセット
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        rent: String(initialData.rent),
        area: initialData.area,
        layout: initialData.layout,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await onSubmit({ ...form, rent: parseInt(form.rent, 10) })
    if (error) {
      setError('保存に失敗しました。もう一度お試しください。')
    }
    setLoading(false)
  }

  return (
    // オーバーレイ背景クリックでモーダルを閉じる
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{initialData ? '物件を編集' : '物件を登録'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>物件名</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例：サンシャインマンション 101号室"
              required
            />
          </div>
          <div className="form-group">
            <label>家賃（円）</label>
            <input
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              placeholder="例：85000"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>エリア</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="例：東京都新宿区"
              required
            />
          </div>
          <div className="form-group">
            <label>間取り</label>
            <select name="layout" value={form.layout} onChange={handleChange}>
              {LAYOUT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : '保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
