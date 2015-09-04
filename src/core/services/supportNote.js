import { serialize, post } from './utils'

import { withDelay } from 'memoize-promise'
const memoize = withDelay(10000); // ten second delay

const CustomerNoteDAO = 'CustomerNoteDAO';

const getSupportNotesByAccount = memoize(customer_id =>
  fetch(...serialize(CustomerNoteDAO, 'getAllCustomerNotesByCustomer', { customer_id }))
    .then(res => res.json())
    .catch(console.error));

const getSupportNote = memoize(id =>
  fetch(...serialize(CustomerNoteDAO, 'getCustomerNoteById', { id }))
    .then(res => res.json())
    .catch(console.error));

const getSupportNotes = memoize(() =>
  fetch(...serialize(CustomerNoteDAO, 'getAllCustomerNotes'))
    .then(res => res.json())
    .catch(console.error));

export { getSupportNotesByAccount, getSupportNote, getSupportNotes };

export const postSupportNote = note =>
  fetch(...serialize(CustomerNoteDAO, 'insertCustomerNoteQuick', note, post))
    .then(res => res.json())
    .catch(console.error);
