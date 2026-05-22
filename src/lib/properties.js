import { supabase } from './supabase'

// 物件一覧を取得（RLSにより自分の物件のみ返却）
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

// 物件を新規登録
export async function createProperty({ name, rent, area, layout }, userId) {
  const { data, error } = await supabase
    .from('properties')
    .insert({ name, rent, area, layout, user_id: userId })
    .select()
    .single()
  return { data, error }
}

// 物件情報を更新
export async function updateProperty(id, { name, rent, area, layout }) {
  const { data, error } = await supabase
    .from('properties')
    .update({ name, rent, area, layout })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

// 物件を削除
export async function deleteProperty(id) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)
  return { error }
}
