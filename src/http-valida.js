import chalk from 'chalk';

function extrairLinks(arrLinks) {
  return arrLinks.map((link) => Object.values(link).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return `${response.status} - ${response.statusText}`;
      } catch (error) {
        return manejaErros(error);
      }
    })
  );
  return arrStatus;
}

function manejaErros(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'Endereço nao encontrado';
  } else {
    return 'Erro desconhecido';
  }
}

export default async function validaLinks(links) {
  const link = extrairLinks(links);
  const status = await checaStatus(link);
  return links.map((obj, indice) => ({
    ...obj,
    status: status[indice],
  }));
}
