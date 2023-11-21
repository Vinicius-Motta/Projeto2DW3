const axios = require("axios");

//@ Abre o formulário de manutenção de vendedores
const getAllVendedores = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllVendedores", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("vendedores/view_manutencao", {
        title: "Manutenção de Vendedores",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlVendedores.js|getAllVendedores] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de vendedores
const openVendedoresInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("vendedores/view_cadVendedores", {
          title: "Cadastro de Vendedores",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlVendas.js|insertVendas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.vendedorid == "") {
    regFormPar.vendedorid = 0;
  } else {
    regFormPar.vendedorid = parseInt(regFormPar.vendedorid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de vendedores
const openVendedoresUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("vendedores/view_cadVendedores", {
          title: "Cadastro de Vendedores",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlVendas.js|insertVendas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos vendedores
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlVendedores.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/GetVendedorByID",
        {
          vendedorid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (error) { 
      console.log(
        "[ctlVendedores.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza inserção de vendedores
const insertVendedores = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.vendedorid = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/InsertVendedores",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Vendedor inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir vendedor!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlVendas.js|insertVendas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

 
  
//@ Realiza atualização de vendedores
///@ console.log("[ctlVendas.js|updateVendedores] Valor regPost: ", regPost);
const updateVendedores = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/UpdateVendedores",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Vendedor atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar vendedor!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlVendas.js|updateVendedores] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de vendedores
//@ "[ctlVendas.js|deleteVendedores] Try Catch: Erro não identificado", erro);
const deleteVendedores = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.vendedorid = parseInt(regPost.vendedorid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteVendedores",
        {
          vendedorid: regPost.vendedorid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Vendedor removido com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover vendedor!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlVendas.js|deleteVendedores] Try Catch: Erro não identificado", erro);
  }
})();
module.exports = {
  getAllVendedores,
  openVendedoresInsert,
  openVendedoresUpdate,
  getDados,
  insertVendedores,
  updateVendedores,
  deleteVendedores,
};