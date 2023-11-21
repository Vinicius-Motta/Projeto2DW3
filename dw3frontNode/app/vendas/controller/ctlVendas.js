const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de vendas
const getAllVendas = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllVendas", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("vendas/view_manutencao", {
        title: "Manutenção de vendas",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlVendas.js|getAllVendas] Try Catch:Erro de requisição");
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  //@ *** Regra de validação
  //@ Como todos os campos podem ter valor nulo, vou me preocupar
  //@ com campo datavenda. Caso ele tenha valor "", vou atribuir null a ele.

  if (regFormPar.datavenda == "") {
    regFormPar.datavenda = null;
  }

  return regFormPar;
}

//@ Abre e faz operações de CRUD no formulário de cadastro de vendas
const insertVendas = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var vendedors = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        vendedors = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllVendedores",
          {}
        );
        //console.log("[crlVendas|insertVendas] valor de vendedors:", vendedors.data.registro);
        registro = {
          vendasid: 0,
          codigodebarras: "",
          produto: "",
          descricao: "",
          valor: "0.00",
          datavenda: "",
          vendedorid: 0,
          deleted: false,
        };

        res.render("vendas/view_cadVendas", {
          title: "Cadastro de vendas",
          data: registro,
          vendedor: vendedors.data.registro,
          oper: oper,
          userName: userName,
        });
      } else {
        oper = "c";
        const vendaREG = validateForm(req.body);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertVendas",
          {
            vendasid: 0,
            codigodebarras: vendaREG.codigodebarras,
            produto: vendaREG.produto,
            descricao: vendaREG.descricao,
            valor: vendaREG.valor,
            datavenda: vendaREG.datavenda,
            vendedorid: vendaREG.vendedorid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("[ctlVendas|insertVendas] resp:", resp.data);
        if (resp.data.status == "ok") {
          registro = {
            vendasid: 0,
            codigodebarras: "",
            produto: "",
            descricao: "",
            valor: "0.00",
            datavenda: "",
            vendedorid: 0,
            deleted: false,
          };
        } else {
          registro = vendaREG;
        }
        vendedors = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllVendedores",
          {}
        );
        oper = "c";
        res.render("vendas/view_cadVendas", {
          title: "Cadastro de vendas",
          data: registro,
          vendedor: vendedors.data.registro,
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

//@ Abre o formulário de cadastro de vendas para futura edição
const viewVendas = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var vendedors = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getVendaByID",
          {
            vendasid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
          registro.datavenda = moment(registro.datavenda).format(
            "YYYY-MM-DD"
          );
          vendedors = await axios.get(
            process.env.SERVIDOR_DW3 + "/GetAllVendedores",
            {}
          );
          console.log("[ctlVendas|viewVendas] GET oper:", oper);

          res.render("vendas/view_cadVendas", {
            title: "Cadastro de vendas",
            data: registro,
            vendedor: vendedors.data.registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        // Código vai entrar quando o usuário clicar no botão Alterar e requisição for POST
        oper = "vu";
        console.log("[ctlVendas|viewVendas] POST oper:", oper);
        const vendaREG = validateForm(req.body);
        console.log("[ctlVendas|viewVendas] POST id:", vendaREG.id);
        const id = parseInt(vendaREG.vendasid);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateVendas",
          {
            vendasid: id,
            codigodebarras: vendaREG.codigodebarras,
            produto: vendaREG.produto,
            descricao: vendaREG.descricao,
            valor: vendaREG.valor,
            datavenda: vendaREG.datavenda,
            vendedorid: vendaREG.vendedorid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlVendas.js|viewVendas] Venda não pode ser alterado" });
      console.log(
        "[ctlVendas.js|viewVendas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de vendas
const DeleteVendas = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      oper = "v";
      const id = parseInt(req.body.id);
    
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteVendas",
        {
          vendasid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    } catch (erro) {
      console.log(
        "[ctlVendas.js|DeleteVendas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllVendas,
  //cadVendas,
  // getVendaByID,
  viewVendas,
  insertVendas,
  // updateVendas,
  DeleteVendas,
};