# Utiliza a imagem oficial do Node.js 22 Alpine
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os ficheiros de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte da API para o container
COPY . .

# Expõe a porta que a API vai utilizar
EXPOSE 3000

# Define as variáveis de ambiente para produção
ENV PORT=3000
ENV NODE_ENV=production

# Comando para iniciar a API
CMD ["npm", "start"]