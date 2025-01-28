import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { resolvers } from './graphql/resolvers.js';
import fs from 'fs';
import './services/firebase.js';
import authRoutes from './routes/auth.js';
import indexRoutes from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const TOKEN_API = process.env.TOKEN_API;

const typeDefs = fs.readFileSync('./src/graphql/schema.graphql', { encoding: 'utf-8' });

const app = express();

// Middleware para JSON
app.use(express.json()); // Middleware embutido do Express
app.use(bodyParser.json()); // Adicional, se necessário

// Configuração do Apollo Server com autenticação no contexto
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    if (!token || token !== `Bearer ${TOKEN_API}`) {
      throw new Error('Unauthorized: Invalid or missing token');
    }
    return { user: 'authenticated' };
  },
});

// Inicia o Apollo Server
await server.start();

// Rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/graphql', bodyParser.json(), expressMiddleware(server));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
