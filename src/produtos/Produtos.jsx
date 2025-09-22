import React, { useEffect, useState } from "react";
import Dashboard from "../pages/dashboard/Dashboard"; 
import { getProdutos } from "../services/produtos.js";
import "../produtos/Produtos.scss";

import editSvg from "../assets/edit.svg";
import trashSvg from "../assets/trash.svg";
import moreSvg from "../assets/more.svg";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getProdutos();
        if (mounted) setProdutos(data || []);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        if (mounted) setError("Erro ao carregar produtos");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <Dashboard>
      <div className="produtos-page">
        <div className="page-header">
          <h1>Produtos</h1>
        </div>

        {loading && <p className="loading">Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="produtos-table-wrap" role="region" aria-label="Lista de produtos">
            <div className="table-scroll">
              <table className="produtos-table" role="table" aria-label="Produtos">
                <thead>
                  <tr>
                    <th className="th-name">Nome</th>
                    <th className="th-brand">Marca</th>
                    <th className="th-price">Preço</th>
                    <th className="th-validade">Validade</th>
                    <th className="th-actions" aria-hidden></th>
                  </tr>
                </thead>

                <tbody>
                  {produtos.map((p) => (
                    <tr key={p.id}>
                      <td className="td-name" title={p.name}>{p.name}</td>
                      <td className="td-brand" title={p.brand}>{p.brand}</td>
                      <td className="td-price">R$ {Number(p.price).toFixed(2)}</td>
                      <td className="td-validade">{p.validade || "-"}</td>

                      <td className="td-actions">
                        <div className="actions" role="group" aria-label={`Ações para ${p.name}`}>
                          <button
                            className="action-btn edit"
                            title="Editar"
                            aria-label={`Editar ${p.name}`}
                            onClick={() => {}}
                          >
                            <img src={editSvg} alt="" className="action-img" aria-hidden="true" />
                          </button>

                          <button
                            className="action-btn delete"
                            title="Deletar"
                            aria-label={`Deletar ${p.name}`}
                            onClick={() => {}}
                          >
                            <img src={trashSvg} alt="" className="action-img" aria-hidden="true" />
                          </button>

                          <button
                            className="action-btn more"
                            title="Mais"
                            aria-label={`Mais ações ${p.name}`}
                            onClick={() => {}}
                          >
                            <img src={moreSvg} alt="" className="action-img" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
}
