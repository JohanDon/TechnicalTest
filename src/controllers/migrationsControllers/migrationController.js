const migrationContact = require("./migrationContactController");
const migrationCompany = require("./migrationCompanyController");
const migrationAssociations = require("./associationsController");

const migrationsProcess = async (req, res) => {
    try {
        const contactsApi = await migrationContact.getContactsApi();
        const contactsFiltered = await migrationContact.filterContacts(contactsApi);
        const contacts = await migrationContact.mapperContacts(contactsFiltered);
        const contactsSend = await migrationContact.mapperContacts(contactsFiltered);
        console.log(contacts);

        const companiesApi = await migrationCompany.getCompaniesApi(contacts);
        const companies = await migrationCompany.mapperCompanies(companiesApi);
        console.log(companies);

        const createContactResponse = await migrationContact.createContactsHuspot(contactsSend);
        console.log(createContactResponse);

        const createCompaniesHuspotResponses = await migrationCompany.createCompaniesHuspot(companies);
        console.log(createCompaniesHuspotResponses)

        await migrationAssociations.associationCompanyContact(createContactResponse, contacts, createCompaniesHuspotResponses);

        res.json({ success: true, message: 'Migration successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

module.exports = {
    migrationsProcess
}