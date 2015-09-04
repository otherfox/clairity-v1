
export function eventConvertLead(contact) {
  return contact;
}

export function eventInsertContact(contact) {
  let {
    name, company, phone, extension, cell, email, fax, comments
  } = contact;
  let result = {
    name, company, phone, extension, cell, email, fax, comments
  };
  return result;
}

export function eventInsertContactRelationship(rel) {
  throw new Error('Not yet implemented');
}
