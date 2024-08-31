#Teste_Tecnico_Shopper_Marcos
Desenvolvido por: Marcos Paulo

#Comando para suubir e rodar o projeto no docker:
docker-compose up -d

#O projeto de teste tecnico foi desenvolvido usando as tecnologias requisitadas:
NodeJs
TypeScript
Gemini: Vision e GenerativeAI

#Banco de dados:
SQLite (local)

Projeto composto por:
[Raiz]
Arquivos de configuração (ts,docker,sequelize)

[src]
Entry point: server.ts (server.js)
Controller ( processar requisições)
DTO (manipular os dados)
routes (gerenciar as rotas, arquivo index como ponto de entrada para todas rotas)
services (manipular acessos ao banco de dados e serviços da gemini)
utils (funções de auxilio)