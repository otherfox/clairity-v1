import React from "react"
import {Link} from 'react-router'

export default class ListOpportunities extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.opportunities.map(o =>
            <Link to="view-opp" params={{oppId: o.get('id')}}>
              {o.get('name')}
            </Link>
          )
        }
      </div>
    );
  }
}
