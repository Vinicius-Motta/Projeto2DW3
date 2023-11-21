const mdlVendedores = require("../model/mdlVendedores");

const GetAllVendedores = (req, res) =>
  (async () => {
    let registro = await mdlVendedores.GetAllVendedores();
    res.json({ status: "ok", registro: registro });
  })();

const GetVendedorByID = (req, res) =>
  (async () => {
    const vendedorID = parseInt(req.body.vendedorid);
    let registro = await mdlVendedores.GetVendedorByID(vendedorID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertVendedores = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlVendedores.InsertVendedores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateVendedores = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlVendedores.UpdateVendedores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteVendedores = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlVendedores.DeleteVendedores(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllVendedores,
  GetVendedorByID,
  InsertVendedores,
  UpdateVendedores,
  DeleteVendedores
};
