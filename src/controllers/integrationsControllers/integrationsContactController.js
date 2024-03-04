const hubspot = require('@hubspot/api-client')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-7cb6c5c1-e502-4b5e-84b4-826a28dca2db" });

const createOrUpdateContact = async (req, res) => {
	try {
		await hubspotClient.crm.contacts.basicApi.getById(req.body.id)
		const properties = {
			properties: {
				character_id: req.body.properties.character_id,
				firstname: req.body.properties.firstname,
				lastname: req.body.properties.lastname,
				status_character: req.body.properties.status_character,
				character_species: req.body.properties.character_species,
				character_gender: req.body.properties.character_gender
			}
		}
		const updateContactResponse = await hubspotClient.crm.contacts.basicApi.update(req.body.id, properties);
		console.log(updateContactResponse);
		res.json({ success: true, message: 'Contact updated successfully' });
	} catch (error) {
		if (error && error.code === 404) {
			const properties = {
				properties: {
					character_id: req.body.properties.character_id,
					firstname: req.body.properties.firstname,
					lastname: req.body.properties.lastname,
					status_character: req.body.properties.status_character,
					character_species: req.body.properties.character_species,
					character_gender: req.body.properties.character_gender
				}
			}
			const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(properties);
			console.log(createContactResponse);
			res.json({ success: true, message: 'Contact created successfully' });
		} else {
			console.error(error);
			res.status(500).json({ success: false, message: "Internal Server Error" })
		}
	}
};

module.exports = {
	createOrUpdateContact
};