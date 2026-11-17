/* ==========================================================================
   apoio.js — funções usadas pelos scripts de auditoria e de capturas de tela

   - lista das páginas e dos temas do site;
   - um servidor local mínimo, para os scripts abrirem o site sem depender
     de nenhum programa externo.

   Nada disto faz parte do site: é só ferramenta de teste.
   ========================================================================== */
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');   // pasta do projeto

// id: nome curto, sem acento, usado nos nomes dos arquivos de captura de tela
const PAGINAS = [
  { id: 'inicio', arquivo: 'index.html', nome: 'Início' },
  { id: 'projetos', arquivo: 'projetos.html', nome: 'Projetos' },
  { id: 'contato', arquivo: 'contato.html', nome: 'Contato' },
  { id: 'entrar', arquivo: 'login.html', nome: 'Entrar' }
];

const TEMAS = [
  { id: 'claro', nome: 'Claro', tema: 'claro', contraste: false },
  { id: 'escuro', nome: 'Escuro', tema: 'escuro', contraste: false },
  { id: 'alto-contraste-claro', nome: 'Alto contraste claro', tema: 'claro', contraste: true },
  { id: 'alto-contraste-escuro', nome: 'Alto contraste escuro', tema: 'escuro', contraste: true }
];

const LARGURAS = [
  { id: 'computador', nome: 'Computador (1366px)', largura: 1366, altura: 800 },
  { id: 'celular', nome: 'Celular (390px)', largura: 390, altura: 800 }
];

// Preferências que o site guarda em localStorage (as mesmas de js/preferencias.js).
// animacoes: true deixa o carrossel parado, para a página não mudar no meio de um teste.
function preferencias(tema, extras) {
  return Object.assign(
    { tema: tema.tema, fonte: '100', contraste: tema.contraste, animacoes: true, links: false },
    extras
  );
}

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

// Sobe um servidor local que entrega os arquivos do projeto.
// Devolve { url, fechar }. A porta é escolhida pelo sistema (porta 0 = "qualquer uma livre").
function iniciarServidor() {
  const servidor = http.createServer(function (pedido, resposta) {
    let caminho = decodeURIComponent(pedido.url.split('?')[0]);
    if (caminho === '/') caminho = '/index.html';

    const arquivo = path.join(RAIZ, caminho);
    // Segurança: nunca entrega nada de fora da pasta do projeto
    if (!arquivo.startsWith(RAIZ + path.sep)) {
      resposta.writeHead(403);
      resposta.end();
      return;
    }

    fs.readFile(arquivo, function (erro, conteudo) {
      if (erro) {
        resposta.writeHead(404);
        resposta.end('Não encontrado');
        return;
      }
      resposta.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream' });
      resposta.end(conteudo);
    });
  });

  return new Promise(function (resolver) {
    servidor.listen(0, '127.0.0.1', function () {
      resolver({
        url: 'http://127.0.0.1:' + servidor.address().port + '/',
        fechar: function () { servidor.close(); }
      });
    });
  });
}

// Grava um arquivo dentro de docs/, criando a pasta se for preciso.
function gravarDoc(nome, linhas) {
  const destino = path.join(RAIZ, 'docs', nome);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, linhas.join('\n') + '\n', 'utf8');
  console.log('docs/' + nome + ' gerado.');
}

module.exports = { RAIZ, PAGINAS, TEMAS, LARGURAS, preferencias, iniciarServidor, gravarDoc };
