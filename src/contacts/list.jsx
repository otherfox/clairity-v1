import React from "react"
import {Link} from 'react-router'

export default class ListContacts extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.contacts.map(o =>
            <Link to="view-contact" params={{contactId: o.get('id')}}>
              {o.get('name')}
            </Link>
          )
        }
      </div>
    );
  }
}
