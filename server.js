import app from './app';
require('dotenv').config();
import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
  console.log("Conectei a base de dados.");
  app.emit("pronto");
}).catch(e => console.log('Erro Na Conexão do Banco de Dados.',e));



const port = 3001;
app.listen(port, () => {
   console.log(`\nEscutando na porta ${port}`);
   console.log(`CTRL + Clique em http://localhost:${port}`)
});


