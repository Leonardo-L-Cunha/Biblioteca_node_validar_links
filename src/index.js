import fs from 'fs';
import chalk from 'chalk';

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const consultas = [...texto.matchAll(regex)];
  const result = consultas.map((consulta) => ({ [consulta[1]]: consulta[2] }));
  return result.length !== 0 ? result : 'Não há links no arquivo';
}

function tratarErro(erro) {
  throw new Error(chalk.red(erro.code, 'Nao há arquivo no diretorio'));
}

async function pegaArquivo(caminho) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminho, encoding);
    return extrairLinks(texto);
  } catch (error) {
    tratarErro(error);
  }
}

export default pegaArquivo;
