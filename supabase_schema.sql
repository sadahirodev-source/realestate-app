-- ============================================================
-- 不動産管理アプリ：物件テーブルとRLSポリシー
-- Supabase ダッシュボード > SQL Editor で実行してください
-- ============================================================

-- 物件テーブルの作成
create table if not exists properties (
  id         uuid        default gen_random_uuid() primary key,
  user_id    uuid        references auth.users(id) on delete cascade not null,
  name       text        not null,
  rent       integer     not null check (rent >= 0),
  area       text        not null,
  layout     text        not null,
  created_at timestamptz default now() not null
);

-- Row Level Security を有効化
alter table properties enable row level security;

-- SELECT：自分が登録した物件のみ取得可能
create policy "自分の物件のみ表示" on properties
  for select
  using (auth.uid() = user_id);

-- INSERT：user_id が自分の UID である場合のみ登録可能
create policy "自分の物件のみ登録" on properties
  for insert
  with check (auth.uid() = user_id);

-- UPDATE：自分が登録した物件のみ更新可能
create policy "自分の物件のみ更新" on properties
  for update
  using (auth.uid() = user_id);

-- DELETE：自分が登録した物件のみ削除可能
create policy "自分の物件のみ削除" on properties
  for delete
  using (auth.uid() = user_id);
