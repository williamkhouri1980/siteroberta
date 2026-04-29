-- Adiciona coluna draft à tabela site_content
-- Rodar no Supabase → SQL Editor

ALTER TABLE site_content ADD COLUMN IF NOT EXISTS draft JSONB;
