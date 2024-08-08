import * as XLSX from "xlsx";

export function exportarParaExcel(dados: any) {
  // Crie uma nova planilha
  const wb = XLSX.utils.book_new();

  // Crie uma nova planilha com os dados da tabela
  const ws = XLSX.utils.json_to_sheet(dados);

  // Adicione a planilha ao arquivo
  XLSX.utils.book_append_sheet(wb, ws, "Dados");

  // Gere o arquivo Excel
  const nomeDoArquivo = "dados.xlsx";
  XLSX.writeFile(wb, nomeDoArquivo);
}
