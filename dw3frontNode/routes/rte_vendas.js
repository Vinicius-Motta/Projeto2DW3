var express = require('express');
var vendasApp = require("../app/vendas/controller/ctlVendas")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, vendasApp.getAllVendas);
router.get('/insertVendas', authenticationMiddleware, vendasApp.insertVendas);
router.get('/viewVendas/:id/:oper', authenticationMiddleware, vendasApp.viewVendas);

/* POST métodos */
router.post('/insertVendas', authenticationMiddleware, vendasApp.insertVendas);
router.post('/deleteVendas', authenticationMiddleware, vendasApp.DeleteVendas);
router.post('/updateVendas', authenticationMiddleware, vendasApp.insertVendas);
router.post('/viewVendas', authenticationMiddleware, vendasApp.viewVendas);


module.exports = router;
