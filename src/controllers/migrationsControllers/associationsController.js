const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-ebf942e1-2318-49ed-bc93-be76d2e9584c" });

const associationCompanyContact = async (createContactResponse, contacts, createCompaniesHuspotResponse) => {

    try {
        for (const createdContact of createContactResponse) {
            const locationId = await contacts.find((contact) =>
                (contact.properties.character_id === createdContact.properties.character_id)).properties.id_location;
            if (locationId !== "" && locationId !== undefined) {
                const companyId = await createCompaniesHuspotResponse.find((createdCompany) => (createdCompany.properties.location_id === locationId)).id;
                const responseAssociations = await hubspotClient.crm.associations.v4.basicApi.create('companies', companyId, 'contacts', createdContact.id,
                    [
                        {
                            "associationCategory": "HUBSPOT_DEFINED",
                            "associationTypeId": 280
                        }
                    ]
                );
                console.log(responseAssociations);
            } 
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    associationCompanyContact
}