const hubspot = require('@hubspot/api-client')
const { formatDate } = require('../../utils/utils')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-7cb6c5c1-e502-4b5e-84b4-826a28dca2db" });


const createSearchCompany = (value) => {
	return searchContact = {
		filterGroups: [{
			filters: [{
				propertyName: "location_id",
				operator: "EQ",
				value: value
			}]
		}]
	}
}

const createPropertiesCompany = (bodyProperties) => {
	return properties = {
		properties: {
			location_id: bodyProperties.location_id.value,
			name: bodyProperties.name.value,
			location_type: bodyProperties.location_type.value,
			dimension: bodyProperties.dimension.value,
			creation_date: formatDate(bodyProperties.creation_date.value)
		}
	}
}

const createOrUpdateCompany = async (req, res) => {
	try {
		const searchCompany = createSearchCompany(req.body.properties.location_id.value)
		const properties = createPropertiesCompany(req.body.properties);

		const responseCompany = await hubspotClient.crm.companies.searchApi.doSearch(searchCompany);
		console.log(responseCompany);

		if (responseCompany.results.length > 0) {
			const updateContactResponse = await hubspotClient.crm.companies.basicApi.update(responseCompany.results.at(0).id, properties);
			console.log(updateContactResponse);
			res.json({ success: true, message: 'Company updated successfully' });
		} else {
			const createContactResponse = await hubspotClient.crm.companies.basicApi.create(properties);
			console.log(createContactResponse);
			res.json({ success: true, message: 'Company created successfully' });
		}

	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
};

module.exports = {
	createOrUpdateCompany
};