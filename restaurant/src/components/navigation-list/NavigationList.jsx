import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import BarChartIcon from '@material-ui/icons/BarChart'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { navigationListOperations } from '../../state/ducks/navigation-list'
import * as routes from '../../routes'
import navigationLabels from '../../utils/constants/navigation-labels'
import './NavigationList.scss'
const NavigationList = props => {
  const setDashboardTitle = title => {
    props.setDashboardTitle(title)
  }
  return (
    <List className="NavigationList">
      <NavLink
        className="NavigationList__NavLink"
        activeClassName="active"
        to={routes.tables}
        onClick={() => setDashboardTitle('Tables')}
      >
        <ListItem button>
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
      </NavLink>
      <NavLink
        className="NavigationList__NavLink"
        to={routes.orders}
        onClick={() => setDashboardTitle('Orders')}
      >
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </NavLink>
      <NavLink
        className="NavigationList__NavLink"
        to={routes.kitchen}
        onClick={() => setDashboardTitle('Kitchen')}
      >
        <ListItem button>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Kitchen" />
        </ListItem>
      </NavLink>
      <NavLink
        className="NavigationList__NavLink"
        to={routes.billing}
        onClick={() => setDashboardTitle('Billing')}
      >
        <ListItem button>
          <ListItemIcon>
            <EuroSymbolIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>
      </NavLink>
      <NavLink
        className="NavigationList__NavLink"
        to={routes.reports}
        onClick={() => setDashboardTitle('Reports')}
      >
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
      <NavLink
        className="NavigationList__NavLink"
        to={routes.users}
        onClick={() => setDashboardTitle('Users')}
      >
        <ListItem button>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </NavLink>
    </List>
  )
}

const mapDispatchToProps = {
  setDashboardTitle: navigationListOperations.setDashboardTitle,
}
export default connect(
  null,
  mapDispatchToProps
)(NavigationList)
