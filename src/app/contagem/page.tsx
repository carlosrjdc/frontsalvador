"use client";
import React, { useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { exportarParaExcel } from "../../funcoes/index";

interface iContagem {
  id: number;
  caixa?: number;
  data: string;
  lote: string;
  endereco: string;
  sku?: string;
  unidade?: number;
  peso?: number;
}

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dados, setDados] = useState<iContagem[]>([]);

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
    console.log(moment(selectedDate).format("DD/MM/YYYY"));
  };

  console.log(dados);

  const buscarDados = async () => {
    try {
      return await axios
        .get(`https://contagemrecife.vercel.app/buscarregistros?data=${moment(selectedDate).format("DD/MM/YYYY")}`)
        .then((response) => setDados(response.data));
    } catch (erro) {
      console.log(erro);
    }
  };

  const data = [
    {
      endereco: "Rua A,123",
      sku: "540425376",
      lote: "12345",
      caixa: "Caixa 1",
      unidade: 10,
      data: "2023-08-07",
      peso: "1.5 kg",
    },
    {
      endereco: "Rua B, 456",
      sku: "540425402",
      lote: "67890",
      caixa: "Caixa 2",
      unidade: 20,
      data: "2023-08-08",
      peso: "2.0 kg",
    },
    // Adicione mais itens de exemplo conforme necessário
  ];

  return (
    <div>
      <div>
        <input
          type="date"
          className="border rounded px-2 py-1"
          placeholder="YYYY-MM-DD"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={buscarDados} className="bg-slate-500 m-2 p-2 rounded-lg text-white">
          BUSCAR
        </button>
        <button onClick={() => exportarParaExcel(dados)} className="bg-slate-500 m-2 p-2 rounded-lg text-white">
          EXPORTAR
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Tabela de Produtos</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Endereço</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Lote</th>
              <th className="px-4 py-2">Caixa</th>
              <th className="px-4 py-2">Unidade</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Peso</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2">{item.endereco}</td>
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.lote}</td>
                <td className="px-4 py-2">{item.caixa}</td>
                <td className="px-4 py-2">{item.unidade}</td>
                <td className="px-4 py-2">{item.data}</td>
                <td className="px-4 py-2">{item.peso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
