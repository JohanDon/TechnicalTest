const rickAndMortyApi = require('rickmortyapi')
const hubspot = require('@hubspot/api-client');
const { isPrimeNumber, splitName, getLastNumberUrl, splitArrayByBatch } = require('../../utils/utils')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-ebf942e1-2318-49ed-bc93-be76d2e9584c" });


const getContactsApi = async () => {
    try {
        const response = await rickAndMortyApi.getCharacters();
        let nextUrlPage = response.data.info.next;
        let contactsApi = response.data.results;
        while (nextUrlPage !== null) {
            const page = getLastNumberUrl(nextUrlPage, "=");
            const responsePage = await rickAndMortyApi.getCharacters({ page: page });
            contactsApi = contactsApi.concat(responsePage.data.results);
            nextUrlPage = responsePage.data.info.next;
        }
        console.log(`Next url ==> ${nextUrlPage}`)
        return contactsApi;
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
                id_location: getLastNumberUrl(contactMap.location.url, "/")
            }
        }
    });

    return mappedContacts;
}


const createContactsHuspot = async (contactsSend) => {

    try {
        let createContactResponse = new Array();
        for (const contactSend of contactsSend) { delete contactSend.properties.id_location }

        if (contactsSend.length > 100) {
            const contactsSplitted = splitArrayByBatch(contactsSend, 100);
            console.log(contactsSplitted);
    
            for (const contactSplitted of contactsSplitted) {
                createContactResponse = createContactResponse.concat((await hubspotClient.crm.contacts.batchApi.create({ inputs: contactSplitted })).results);
            }
        } else {
            createContactResponse = (await hubspotClient.crm.contacts.batchApi.create({ inputs: contactsSend })).results
        }

        return createContactResponse;
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