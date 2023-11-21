const db = require("../../../database/databaseconfig");

const getAllVendas = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT nome from VENDEDORES where vendedorid = vendas.vendedorid)" +
        "FROM vendas where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getVendaByID = async (vendaIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT nome from VENDEDORES where vendedorid = vendas.vendedorid) " +
        "FROM vendas WHERE vendasid = $1 and deleted = false ORDER BY nome ASC",
      [vendaIDPar]
    )
  ).rows;
};

const insertVendas = async (vendaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO vendas " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          vendaREGPar.codigodebarras,
          vendaREGPar.produto,
          vendaREGPar.descricao,
          vendaREGPar.valor,
          vendaREGPar.datavenda,
          vendaREGPar.vendedorid,
          vendaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVendas|insertVendas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateVendas = async (vendaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE vendas SET " +
          "codigodebarras = $2, " +
          "produto = $3, " +
          "descricao = $4, " +
          "valor = $5, " +
          "datavenda = $6, " +
          "vendedorid = $7, " +
          "deleted = $8 " +
          "WHERE vendasid = $1",
        [
          vendaREGPar.vendasid, 
          vendaREGPar.codigodebarras,
          vendaREGPar.produto,
          vendaREGPar.descricao,
          vendaREGPar.valor,
          vendaREGPar.datavenda,
          vendaREGPar.vendedorid,
          vendaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVendas|insertVendas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteVendas = async (vendaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE vendas SET " + "deleted = true " + "WHERE vendasid = $1",
      [vendaREGPar.vendasid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlVendas|insertVendas] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllVendas,
  getVendaByID,
  insertVendas,
  UpdateVendas,
  DeleteVendas,
};
