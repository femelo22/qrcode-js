const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Importando as configurações do Swagger
const swaggerDefinition = require('./swagger/swaggerDefinition');
const generateQRCodeDocs = require('./swagger/generateQRCodeDocs');

const app = express();
const port = 3000;

const options = {
  swaggerDefinition,
  apis: ['./swagger/generateQRCodeDocs.js'], // Referencia os arquivos com as anotações
};

const swaggerSpec = swaggerJSDoc(options);

// Usando o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve arquivos estáticos (como o HTML) a partir da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate-qrcode', async (req, res) => {
  try {
    // Neste exemplo, o QR Code vai gerar uma URL de redirecionamento para a página de processamento
    const qrCodeUrl = `https://qrcode-js.onrender.com/processing?content=${encodeURIComponent(
      content,
    )}`;

    // Gera o QR Code com o link
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

    return res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao gerar o QR Code' });
  }
});

// Rota de processamento que exibe a tela de "Processando solicitação..."
app.get('/processing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'processing.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
