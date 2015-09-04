import { serialize } from './utils'

import { withDelay } from 'memoize-promise'
const memoize = withDelay(10000); // ten second delay

const CustomerNoteDAO = 'CustomerNoteDAO';

const getSupportNotesByAccount = memoize(customer_id =>
  fetch(...serialize(CustomerNoteDAO, 'getAllCustomerNotesByCustomer', { customer_id }))
    .then(res => res.json())
    .catch(console.error)
);

export { getSupportNotesByAccount };
