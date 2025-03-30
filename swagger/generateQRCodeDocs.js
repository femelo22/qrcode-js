// swagger/generateQRCodeDocs.js
/**
 * @swagger
 * /generate-qrcode:
 *   get:
 *     summary: Gera um QR Code com base no conteúdo fornecido
 *     description: Gera um QR Code a partir do parâmetro de conteúdo passado na query string.
 *     responses:
 *       200:
 *         description: QR Code gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCode:
 *                   type: string
 *                   description: URL do QR Code gerado em Base64
 *       400:
 *         description: Parâmetro "content" é obrigatório
 *       500:
 *         description: Erro ao gerar o QR Code
 */
