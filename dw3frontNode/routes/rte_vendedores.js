var express = require('express');
var vendedoresApp = require("../app/vendedores/controller/ctlVendedores")

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
router.get('/', authenticationMiddleware, vendedoresApp.getAllVendedores);
router.get('/openVendedoresInsert', authenticationMiddleware, vendedoresApp.openVendedoresInsert);
router.get('/openVendedoresUpdate/:id', authenticationMiddleware, vendedoresApp.openVendedoresUpdate);

/* POST métodos */
router.post('/insertVendedores', authenticationMiddleware, vendedoresApp.insertVendedores);
router.post('/getDados', authenticationMiddleware, vendedoresApp.getDados);
router.post('/updateVendedores', authenticationMiddleware, vendedoresApp.updateVendedores);
router.post('/deleteVendedores', authenticationMiddleware, vendedoresApp.deleteVendedores);




module.exports = router;