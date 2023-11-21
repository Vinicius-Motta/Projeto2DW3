const express = require("express");
const routerApp = express.Router();

const appVendas = require("../apps/vendas/controller/ctlVendas");
const appVendedores = require("../apps/vendedores/controller/ctlVendedores");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Vendas
routerApp.get("/getAllVendas", appVendas.getAllVendas);
routerApp.post("/getVendaByID", appLogin.AutenticaJWT, appVendas.getVendaByID);
routerApp.post("/insertVendas", appLogin.AutenticaJWT, appVendas.insertVendas);
routerApp.post("/updateVendas", appVendas.updateVendas);
routerApp.post("/DeleteVendas", appVendas.DeleteVendas);

//Rotas de Vendedores
routerApp.get("/GetAllVendedores", appVendedores.GetAllVendedores);
routerApp.post("/GetVendedorByID", appVendedores.GetVendedorByID);
routerApp.post("/InsertVendedores", appVendedores.InsertVendedores);
routerApp.post("/UpdateVendedores", appVendedores.UpdateVendedores);
routerApp.post("/DeleteVendedores", appVendedores.DeleteVendedores);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
