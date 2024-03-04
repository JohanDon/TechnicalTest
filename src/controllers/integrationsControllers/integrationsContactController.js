const hubspot = require('@hubspot/api-client')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-7cb6c5c1-e502-4b5e-84b4-826a28dca2db" });

const createOrUpdateContact = async (req, res) => {
	try {
		const responseContact = await hubspotClient.crm.contacts.basicApi.getById(req.body.vid)
		console.log(responseContact);
		const properties = {
			properties: {
				character_id: req.body.properties.character_id.value,
				firstname: req.body.properties.firstname.value,
				lastname: req.body.properties.lastname.value,
				status_character: req.body.properties.status_character.value,
				character_species: req.body.properties.character_species.value,
				character_gender: req.body.properties.character_gender.value
			}
		};
		const updateContactResponse = await hubspotClient.crm.contacts.basicApi.update(req.body.vid, properties);
		console.log(updateContactResponse);
		res.json({ success: true, message: 'Contact updated successfully' });
	} catch (error) {
		if (error && error.code === 404) {
			const properties = {
				properties: {
					character_id: req.body.properties.character_id.value,
					firstname: req.body.properties.firstname.value,
					lastname: req.body.properties.lastname.value,
					status_character: req.body.properties.status_character.value,
					character_species: req.body.properties.character_species.value,
					character_gender: req.body.properties.character_gender.value
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