
import {
  postInsertContact,
  postInsertContactRelationship
} from '../services/contact'

export function createContact(contact) {
  let firstPromise = postInsertContact(contact);
  let returnPromise = new Promise(impl);
  function impl(resolve, reject) {
    firstPromise.then(contactId => {
      Promise.all(contact.relationships.map(r =>
        postInsertContactRelationship(r.contact_id = contactId && r)
      )).then(resolve, reject);
    });
  }
  return returnPromise;
}
