const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

// Serve arquivos estáticos (como o HTML) a partir da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para gerar o QR Code
app.get('/generate-qrcode', async (req, res) => {
  const { content } = req.query;

  if (!content) {
    return res.status(400).json({ error: 'Parâmetro "content" é obrigatório' });
  }

  try {
    // Neste exemplo, o QR Code vai gerar uma URL de redirecionamento para a página de processamento
    const qrCodeUrl = `http://localhost:3000/processing?content=${encodeURIComponent(
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
