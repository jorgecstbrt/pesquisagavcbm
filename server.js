const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const dbFile = process.env.DB_FILE || path.join(__dirname, 'data', 'voz-ativa.json');

const seed = { instrutores: [{ id: 1, nome: 'SD BM Anderson Tito dos Anjos', email: 'instrutor@cbmmt.gov.br' }], materias: [{ id: 2, nome: 'Operação e deslocamento da viatura ATC', instrutorId: 1 }], links: [{ id: 3, titulo: 'Avaliação de instrução ATC 2026', url: 'https://forms.google.com/', materiaId: 2, acessos: 0, acessados: [] }], respostas: {} };
fs.mkdirSync(path.dirname(dbFile), { recursive: true });
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify(seed, null, 2));
const readData = () => JSON.parse(fs.readFileSync(dbFile, 'utf8'));

app.use(express.json({ limit: '1mb' }));
app.get('/api/data', (_req, res) => res.json(readData()));
app.put('/api/data', (req, res) => {
  if (!req.body || !Array.isArray(req.body.links) || !Array.isArray(req.body.instrutores) || !Array.isArray(req.body.materias)) return res.status(400).json({ error: 'Formato de dados inválido' });
  fs.writeFileSync(dbFile, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});
app.get('/health', (_req, res) => res.type('text').send('ok'));
app.use(express.static(__dirname));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(port, () => console.log(`Voz Ativa rodando na porta ${port}`));
