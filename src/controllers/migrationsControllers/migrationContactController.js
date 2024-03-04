const rickAndMortyApi = require('rickmortyapi')
const hubspot = require('@hubspot/api-client');
const { isPrimeNumber, splitName, splitUrlLocation } = require('../../utils/utils')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-ebf942e1-2318-49ed-bc93-be76d2e9584c" });


const getContactsApi = async () => {
    try {
        const response = await rickAndMortyApi.getCharacters();
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
};

const filterContacts = async (contactsFilter) => {
    const contactsFiltered = new Array();
    for (const contactFilter of contactsFilter) {
        if (contactFilter.id == 1 || isPrimeNumber(contactFilter.id)) {
            contactsFiltered.push(contactFilter);
        }
    }
    return contactsFiltered;
}

const mapperContacts = (contactsMapper) => {
    const mappedContacts = contactsMapper.map(contactMap => {
        const names = splitName(contactMap.name)
        return {
            properties: {
                character_id: contactMap.id.toString(),
                firstname: names.at(0),
                lastname: names.at(1),
                status_character: contactMap.status,
                character_species: contactMap.species,
                character_gender: contactMap.gender,
                id_location: splitUrlLocation(contactMap.location.url)
            }
        }
    });

    return mappedContacts;
}


const createContactsHuspot = async (contactsSend) => {
    try {
        for (const contactSend of contactsSend) {delete contactSend.properties.id_location}
        const createContactResponse = await hubspotClient.crm.contacts.batchApi.create({ inputs: contactsSend });
        return createContactResponse.results;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getContactsApi,
    filterContacts,
    mapperContacts,
    createContactsHuspot
}