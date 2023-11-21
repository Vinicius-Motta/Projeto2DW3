const db = require("../../../database/databaseconfig");

const GetAllVendedores = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM vendedores where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const GetVendedorByID = async (vendedorIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM vendedores WHERE vendedorid = $1 and deleted = false ORDER BY nome ASC",
      [vendedorIDPar]
    )
  ).rows;
};

const InsertVendedores = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO vendedores " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.nome,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVendedores|insertVendedores] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateVendedores = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE vendedores SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +          
          "WHERE vendedorid = $1",
        [
            registroPar.vendedorid,
            registroPar.codigo,
            registroPar.nome,
            registroPar.ativo,
            registroPar.deleted,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVendedores|UpdateVendedores] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteVendedores = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE vendedores SET " + "deleted = true " + "WHERE vendedorid = $1",
      [registroPar.vendedorid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlVendedores|DeleteVendedores] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllVendedores,
  GetVendedorByID,
  InsertVendedores,
  UpdateVendedores,
  DeleteVendedores,
};
