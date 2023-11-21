const mdlVendas = require("../model/mdlVendas");

const getAllVendas = (req, res) =>
  (async () => {
    let registro = await mdlVendas.getAllVendas();
    res.json({ status: "ok", "registro": registro });
  })();

const getVendaByID = (req, res) =>
  (async () => {
    const vendasID = parseInt(req.body.vendasid);
    let registro = await mdlVendas.getVendaByID(vendasID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertVendas = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const vendasREG = request.body;    
    let { msg, linhasAfetadas } = await mdlVendas.insertVendas(vendasREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateVendas = (request, res) =>
  (async () => {
    const vendasREG = request.body;
    let  { msg, linhasAfetadas } = await mdlVendas.UpdateVendas(vendasREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteVendas = (request, res) =>
  (async () => {
    const vendasREG = request.body;
    let { msg, linhasAfetadas } = await mdlVendas.DeleteVendas(vendasREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllVendas,
  getVendaByID,
  insertVendas,
  updateVendas,
  DeleteVendas
};
