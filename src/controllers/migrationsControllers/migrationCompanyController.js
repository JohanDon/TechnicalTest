const rickAndMortyApi = require('rickmortyapi')
const hubspot = require('@hubspot/api-client');
const { formatDate } = require('../../utils/utils')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-ebf942e1-2318-49ed-bc93-be76d2e9584c" });


const getCompaniesApi = async (contacts) => {
    const idLocationsCreated = new Array();
    const CompaniesApi = new Array();
    try {
        for (const contact of contacts) {
            if (contact.properties.id_location !== "" && !idLocationsCreated.includes(contact.properties.id_location)) {
                idLocationsCreated.push(contact.properties.id_location)
                const response = await rickAndMortyApi.getLocation(parseInt(contact.properties.id_location));
                CompaniesApi.push(response.data);
            }
        }
        return CompaniesApi;
    } catch (error) {
        console.log(error);
    }
}

const mapperCompanies = (mapperCompanies) => {
    const mappedCompanies = mapperCompanies.map(CompanyMap => {
        return {
            properties: {
                location_id: CompanyMap.id.toString(),
                name: CompanyMap.name,
                location_type: CompanyMap.type,
                dimension: CompanyMap.dimension,
                creation_date: formatDate(CompanyMap.created)
            }
        }
    });

    return mappedCompanies;
}

const createCompaniesHuspot = async (companies) => {
    try {
        const createCompaniesResponse = await hubspotClient.crm.companies.batchApi.create({ inputs: companies });
        return createCompaniesResponse.results;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCompaniesApi,
    mapperCompanies,
    createCompaniesHuspot,
}