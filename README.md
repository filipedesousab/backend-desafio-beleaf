# Backend do Desafio Beleaf

Aplicação web para visualização e gerenciamento de Marmitas.

O Backend foi construído em nodejs com express e utiliza o banco de dados MySQL.
Está disponível no endereço: https://filipebotelho-desafio-beleaf.herokuapp.com/

O acesso ao usuario administrador pode ser feito pelo usuário "admin" e senha "admin". Mas podem ser criados novos usuários.

O Banco de dados MySQL está em uma hospedagem compartilhada.

Os arquivos contidos na pasta "public" são gerados na compilação do frontend: https://github.com/filipedesousab/frontend-desafio-beleaf

## Tecnologias utilizadas
- NodeJS
- Express
- Json Web Token
- MySQL

## Implantação
- Deploy na plataforma Heroku
- Arquivos do Frontend compilados preveamente na pasta "public"

## API Rest

Métodos utilizados: GET, POST, PUT

### Endpoints da API

***HOST** pode ser o endereço local ou remoto do servidor*

#### Login de usuário:
- **URL:** HOST/user/login
- **Método:** POST
- **JSON:** { username: 'nomedeusuario', password: 'senha' }
- **Resposta:** { id: 'id do usuario no banco de dados', name: 'Nome Completo', username: 'nomedeusuario', jwt: 'Hash do Token' }
- **Resposta de usuário ou senha inválida:** Código HTTP 401 { error: { message: 'Wrong username or password!' } }

#### Registro de usuário:
- **URL:** HOST/user/insert
- **Método:** POST
- **JSON:** { name: 'Nome Completo', username: 'nomedeusuario', password: 'senha' }
- **Resposta:** { id: 'id do usuario no banco de dados', name: 'Nome Completo', username: 'nomedeusuario', jwt: 'Hash do Token' }
- **Resposta de usuário duplicado:** Código HTTP 401 { error: { message: 'Duplicate username!' } }

#### Obter lista de marmitas em estoque:
- **URL:** HOST/lunchbox
- **Método:** GET
- **Resposta:** Array com { id: 'id da marmita no banco de dados', name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to get lunch boxes!' } }

#### Obter lista com todas as marmitas:
- **URL:** HOST/api/lunchbox
- **Método:** GET
- **Header:** { Authorization: 'JWT retornado no ato do login' }
- **Resposta:** Array com { id: 'id da marmita no banco de dados', name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to get lunch boxes!' } }

#### Adicionar marmita
- **URL:** HOST/api/lunchbox
- **Método:** POST
- **JSON:** { name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Header:** { Authorization: 'JWT retornado no ato do login' }
- **Resposta:** { id: 'id da marmita no banco de dados', name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to register lunch box!' } }

#### Selecionar uma marmita
- **URL:** HOST/lunchbox/id (id da marmita a ser seleconada)
- **Método:** GET
- **Resposta:** { id: 'id da marmita no banco de dados', name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to get lunch box!' } }

#### Alterar dados da marmita
*Cada campo a ser alterado deve ser passado no JSON junto ao id, podendo passar um único ou vários campos.*

Os campos são:
- name: Nome da marmita a ser atualizado
- price: Preço da marmita a ser atualizado
- discount: Desconto da marmita a ser atualizado
- quantity: Quantidade da marmita a ser atualizada
- image: Data URL da marmita a ser atualizada
- description: Descrição da marmita a ser atualizada
- ingredients: Ingredientes da marmita a serem atualizados

Requisição:
- **URL:** HOST/api/lunchbox
- **Método:** PUT
- **JSON:** { id: 'id da marmita a ser alterada', campo: 'valor do campo a ser atualizado' }
- **Header:** { Authorization: 'JWT retornado no ato do login' }
- **Resposta:** { id: 'id da marmita no banco de dados', name: 'Nome da marmita', price: 'preço', discount: 'desconto', quantity: 'quantidade', image: 'Data URL da imagem', description: 'Descrição', ingredients: 'Ingredientes' }
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to update lunch box!' } }

#### Excluir marmita
- **URL:** HOST/api/lunchbox/delete
- **Método:** PUT
- **JSON:** { id: 'id da marmita no banco de dados' }
- **Header:** { Authorization: 'JWT retornado no ato do login' }
- **Resposta:** true
- **Resposta de erro:** Código HTTP 401 { error: { message: 'Failed to remove lunch box!' } }

## Tebelas do banco de dados

### Tabela de usuário
- **Nome:** user
- **Campos:**
  - **user_id:** int(4), NOT NULL, AUTO_INCREMENT, PRIMARY KEY
  - **name:** varchar(255), NOT NULL
  - **username:** varchar(100), NOT NULL, UNIQUE
  - **hash:** varchar(100), NOT NULL

### Tabela de marmitas
- **Nome:** lunchbox
- **Campos:**
  - **lunchbox_id:** int(4), NOT NULL, AUTO_INCREMENT, PRIMARY KEY
  - **name:** varchar(255), NOT NULL
  - **price:** varchar(10), NOT NULL, DEFAULT '0'
  - **discount:** varchar(3), NOT NULL, DEFAULT '0'
  - **quantity:** varchar(10), NOT NULL, DEFAULT '0'
  - **image:** text, NULL
  - **description:** text, NULL
  - **ingredients:** text, NULL

## Funcionalidades ainda a serem desenvolvida
- Paginação da lista de marmitas
- Ordeneçã da lista de marmitas

## Melhorias a serem desenvolvidas
- Melhorar a máscara de dinheiro
- Gestão de usuários
- Melhorar estrutura do banco de dados
- Design mais indicado aos usuários não administradores

## Instalação

O backend pode ser executado diretamente pois os arquivos estáticos do frontend se encontram no reposiório. Caso deseje compilar os arquivos do frontend o backend deve ser instalado em uma pasta pararela ao pasta do frontend, pos o frontend compila os arquivos estáticos direto na pasta do public dentro do backend.

Exemplo:

Pasta do Projeto\
|_ backend (pasta desse repositório)\
|_ frontend (pasta do outro repositório)

- Criar pasta para todo o projeto
- Clonar repositório
- Renomear pasta do repositório para "backend"
- Entrar na pasta backend e instalar dependenciar com "yarn" ou "npm install"

## Execução
- Entrar na pasta do backend
- Para servidor de desenvolvimento executar "yarn dev" ou "npm run dev"
- Para servidor de produção executar "yarn start" ou "npm run start"
- Acessar o servidor local na porta 8080 (localhost:8080)
