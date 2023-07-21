import pegaArquivo from './index.js';
import chalk from 'chalk';
import fs from 'fs';
import validaLinks from './http-valida.js';

const caminho = process.argv;

async function imprimeArquivos(valida, resultado, nomeDoAquivo = '') {
  if (valida) {
    console.log(
      chalk.yellow('Lista de Links'),
      chalk.black.bgGreen(nomeDoAquivo),
      await validaLinks(resultado)
    );
  } else {
    console.log(
      chalk.yellow('Lista de Links'),
      chalk.black.bgGreen(nomeDoAquivo),
      resultado
    );
  }
}

async function processaArquivo(caminhoDoArquivo) {
  const caminho = caminhoDoArquivo[2];
  const valida = caminhoDoArquivo[3] === 'valida';
  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(chalk.red('Arquivo ou Diretorio nao existe!'));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const links = await pegaArquivo(caminho);
    imprimeArquivos(valida, links);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (caminhoDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${caminhoDoArquivo}`);
      imprimeArquivos(valida, lista, caminhoDoArquivo);
    });
  }
}

processaArquivo(caminho);
