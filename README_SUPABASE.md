# Configuração do Supabase para LogiCheck

Para que o aplicativo funcione corretamente com o Supabase, siga os passos abaixo:

## 1. Criar o Banco de Dados
Copie o conteúdo do arquivo `supabase_schema.sql` e execute-o no **SQL Editor** do seu painel do Supabase. Isso criará todas as tabelas necessárias (`products`, `stocks`, `inventory_batches`, etc.) e inserirá alguns dados iniciais.

## 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (ou renomeie o `.env.example`) e adicione suas credenciais:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

Você pode encontrar essas informações em **Project Settings > API** no dashboard do Supabase.

## 3. Autenticação (Opcional)
Atualmente, o app usa uma chave "anon" para facilitar o teste. Em produção, recomenda-se configurar o Row Level Security (RLS) e usar o Supabase Auth.

## 4. Estrutura de Tabelas
- `products`: Cadastro de itens.
- `logistics_rules`: Regras de conversão (Ex: unidades por caixa).
- `stocks`: Locais de estoque (Depósito, Docas, etc).
- `inventory_batches`: Cabeçalho das contagens (DTs).
- `inventory_items`: Itens específicos sendo contados em cada lote.
