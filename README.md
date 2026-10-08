# Voz Ativa

Aplicacao estatica servida por Nginx, pronta para deploy no EasyPanel.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm install
npm run server
```

Acesse `http://localhost:3000` e `http://localhost:3000/admin`.

Para trabalhar com hot reload no frontend, use dois terminais: `npm run server` e `npm run dev`. Nesse caso, abra `http://localhost:5173`.

Para gerar a versao de producao localmente:

```bash
npm run build
npm run preview
```

## Docker local

```bash
docker build -t voz-ativa .
docker run --rm -p 8080:80 voz-ativa
```

Acesse `http://localhost:8080` e `http://localhost:8080/admin`.

## EasyPanel

1. Crie um servico do tipo **App** a partir deste repositorio.
2. Selecione **Dockerfile** como metodo de build.
3. Use a porta interna `80`.
4. Configure o dominio e publique.

O endpoint de health check e `/health`.

O Tailwind, Chart.js e html2pdf sao carregados por CDN diretamente no HTML; por isso nao existe instalacao de dependencias NPM necessaria para esta versao estatica.

Os dados agora ficam no arquivo persistente `data/voz-ativa.json`. No EasyPanel, monte um volume em `/app/data` para preservar os dados durante redeploys.
