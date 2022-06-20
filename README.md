# Resolução do desafio de consulta da Linha Digitável de um boleto

## Como iniciar o projeto

- Docker Compose:
  A aplicação foi construída utilizando o Docker e docker-compose. Para iniciar o projeto através dessa ferramenta, basta executar o comando:
  ```sh
  docker-compose up
  ```
- Com `yarn` ou `npm`:
  Também é possível iniciar o projeto através dos comandos:
  ```sh
  yarn install && yarn dev
  # ou
  npm install && npm run dev
  ```

## Testes Unitários

Todos os testes estão presentes no diretório `src/__tests__`

Para executa-los, basta rodar o comando:

```sh
  yarn test
  # ou
  npm run test
```

Todos os testes geram porcentagens de cobertura do código (test coverage).

Após rodar os testes, é possível verificar a cobertura do código já no terminal ou na pasta `coverage/lcov-report`

## Tecnologias Utilizadas

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [TypeScript](https://www.typescriptlang.org/)
