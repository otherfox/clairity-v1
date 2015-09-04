
import { withDelay } from 'memoize-promise'

const memoize = withDelay(10000); // ten second delay

const getSupportNotesByAccount = memoize(id =>
  fetch(`https://lab.rairity.com/controller.cfm?event=serialize&authkey=tardis&_c=ample.dao.CustomerNoteDAO&_m=getAllCustomerNotesByCustomer&customer_id=${id}`)
    .then(res => res.json())
    .catch(console.error)
);

export { getSupportNotesByAccount };
