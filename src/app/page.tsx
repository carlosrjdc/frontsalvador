"use client";
import React, { useState } from "react";
import axios from "axios";
import { exportarParaExcel } from "../funcoes/index";

interface iDevolucao {
  Sku: string;
  descricao: string;
  ean: string;
  quantidade: string;
  unidadeMedida: string;
}

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Definindo o tipo File[]
  const [dados, setDados] = useState<iDevolucao[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Selecione pelo menos um arquivo para fazer upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("arquivo", file);
    });

    try {
      await axios
        .post("https://devolucaorecife.vercel.app/uploadxml", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        })
        .then((response) => setDados(response.data));

      alert("Upload concluído com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="m-2">Upload de Arquivos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button className="bg-slate-500 m-2 p-2 rounded-lg" onClick={handleUpload}>
        Fazer Upload
      </button>
      <button className="bg-slate-500 m-2 p-2 rounded-lg" onClick={() => exportarParaExcel(dados)}>
        Imprimir
      </button>
      {dados?.map((item: iDevolucao) => {
        return (
          <div className="flex gap-8 text-sm">
            <div>{item.Sku}</div>
            <div>{item.ean}</div>
            <div>{item.descricao}</div>
            <div>{item.quantidade}</div>
            <div>{item.unidadeMedida}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
