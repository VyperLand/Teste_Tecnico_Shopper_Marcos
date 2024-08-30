# Use a imagem base do Node.js na versão 20.15.1
FROM node:20.15.1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação para o container
COPY . .

# Compila o código TypeScript usando o script definido no package.json
RUN npm run compile

# Expõe a porta que a API está rodando (substitua pela porta correta se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]