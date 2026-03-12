-- Enable the pgvector extension
create extension if not exists vector;

-- Knowledge base chunks with embeddings (OpenAI text-embedding-3-small = 1536 dimensions)
create table if not exists documents (
  id bigserial primary key,
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Similarity search function
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where 1 - (d.embedding <=> query_embedding) > match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
$$;

-- Question + answer log
create table if not exists questions (
  id bigserial primary key,
  question text not null,
  answer text not null,
  created_at timestamptz default now()
);
