const hubspot = require('@hubspot/api-client')

const hubspotClient = new hubspot.Client({ accessToken: "pat-na1-7cb6c5c1-e502-4b5e-84b4-826a28dca2db" });


const createSearchContact = (value) => {
	return searchContact = {
		filterGroups: [{
			filters: [{
				propertyName: "character_id",
				operator: "EQ",
				value: value
			}]
		}]
	}
}

const createPropertiesContact = (bodyProperties) => {
	return properties = {
		properties: {
			character_id: bodyProperties.character_id.value,
			firstname: bodyProperties.firstname.value,
			lastname: bodyProperties.lastname.value,
			status_character: bodyProperties.status_character.value,
			character_species: bodyProperties.character_species.value,
			character_gender: bodyProperties.character_gender.value
		}
	}
}

const createOrUpdateContact = async (req, res) => {
	try {
		const searchContact = createSearchContact(req.body.properties.character_id.value);
		const properties = createPropertiesContact(req.body.properties);
		
		const responseContact = await hubspotClient.crm.contacts.searchApi.doSearch(searchContact)
		console.log(responseContact);

		if (responseContact.results.length > 0) {
			const updateContactResponse = await hubspotClient.crm.contacts.basicApi.update(req.body.vid, properties);
			console.log(updateContactResponse);
			res.json({ success: true, message: 'Contact updated successfully' });
		} else {
			const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(properties);
			console.log(createContactResponse);
			res.json({ success: true, message: 'Contact created successfully' });
		}

	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
};

module.exports = {
	createOrUpdateContact
};