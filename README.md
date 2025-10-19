# Dashboard Financeiro Pessoal (Full-Stack MERN)

Este é o front-end do projeto de Dashboard Financeiro Pessoal, construído com **React.js** e **Material-UI**. A aplicação consome uma API RESTful própria (construída com Node.js/Express/MongoDB) para criar, ler e deletar transações financeiras em tempo real.

**Back-End do Projeto:** https://github.com/RonaldoCodigos/dashboard-backend

## 🚀 Funcionalidades Principais

* **Dashboard Interativo:** Cards de balanço (Entradas, Saídas, Saldo Total) que se atualizam em tempo real.
* **CRUD Completo:**
    * **Create:** Adiciona novas transações (entradas ou saídas) através de um formulário.
    * **Read:** Lista todas as transações persistidas no banco de dados.
    * **Delete:** Remove transações com um pop-up de confirmação.
* **Feedback ao Usuário:** Notificações (Snackbar) de sucesso ou erro ao adicionar ou deletar itens.
* **Design Profissional:** Interface limpa e responsiva construída com **Material-UI**, incluindo Tema (Theming) global, AppBar, Cards e Lista.
* **Comunicação com API:** Utiliza **Axios** para todas as requisições (GET, POST, DELETE) à API back-end.

## 🛠️ Tecnologias Utilizadas

* React.js
* React Hooks (`useState`, `useEffect`)
* Axios (para requisições HTTP)
* Material-UI (MUI)
* MUI Icons

## 🏁 Como Rodar (Localmente)

**Pré-requisito:** O [servidor Back-End](https://github.com/RonaldoCodigos/dashboard-backend) deve estar rodando (`npm run dev`) na porta 3002.

1.  Clone este repositório:
    ```sh
    git clone [https://github.com/RonaldoCodigos/dashboard-frontend.git](https://github.com/RonaldoCodigos/dashboard-frontend.git)
    ```
2.  Entre na pasta:
    ```sh
    cd dashboard-frontend
    ```
3.  Instale as dependências:
    ```sh
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```

O aplicativo estará disponível em `http://localhost:3000`.