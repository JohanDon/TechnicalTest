const express = require('express');
const router = express.Router();
const integrationContactController = require('../controllers/integrationsControllers/integrationsContactController');
const integrationCompanyController = require('../controllers/integrationsControllers/integrationsCompanyController');
const migrationController = require('../controllers/migrationsControllers/migrationController');


router.get("/", (req, res) => {res.end("Technical Test On the Fuze")});


router.get("/migration",  migrationController.migrationsProcess);


router.post("/integration/contacts",  integrationContactController.createOrUpdateContact);


router.post("/integration/companies",  integrationCompanyController.createOrUpdateCompany);





module.exports = router;