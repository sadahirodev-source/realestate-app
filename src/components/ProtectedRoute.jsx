import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログインユーザーをログイン画面にリダイレクトするガード
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // 認証状態の読み込み中はスピナーを表示
  if (loading) {
    return (
      <div className="loading-wrapper">
        <p>読み込み中...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
