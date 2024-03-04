const hubspot = require('@hubspot/api-client')
const { formatDate } = require('../../utils/utils')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-7cb6c5c1-e502-4b5e-84b4-826a28dca2db" });

const createOrUpdateCompany = async (req, res) => {
	try {
		const responseCompany = await hubspotClient.crm.companies.basicApi.getById(req.body.vid);
		console.log(responseCompany);
		const properties = {
			properties: {
				location_id: req.body.properties.location_id.value,
				name: req.body.properties.name.value,
				location_type: req.body.properties.location_type.value,
				dimension: req.body.properties.dimension.value,
				creation_date: formatDate(req.body.properties.creation_date.value)
			}
		}
		const updateContactResponse = await hubspotClient.crm.companies.basicApi.update(req.body.vid, properties);
		console.log(updateContactResponse);
		res.json({ success: true, message: 'Company updated successfully' });
	} catch (error) {
		if (error && error.code === 404) {
			const properties = {
				properties: {
					location_id: req.body.properties.location_id.value,
					name: req.body.properties.name.value,
					location_type: req.body.properties.location_type.value,
					dimension: req.body.properties.dimension.value,
					creation_date: formatDate(req.body.properties.creation_date.value)
				}
			}
			const createContactResponse = await hubspotClient.crm.companies.basicApi.create(properties);
			console.log(createContactResponse);
			res.json({ success: true, message: 'Company created successfully' });
		} else {
			console.error(error);
			res.status(500).json({ success: false, message: "Internal Server Error" })
		}
	}
};

module.exports = {
	createOrUpdateCompany
};