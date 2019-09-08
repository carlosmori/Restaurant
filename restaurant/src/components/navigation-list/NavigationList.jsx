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
import './NavigationList.scss'
export default function NavigationList({ props }) {
  return (
    <List className="NavigationList">
      <NavLink
        className="NavigationList__NavLink"
        activeClassName="active"
        to={`/Dashboard/Tables`}
      >
        <ListItem button>
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
      </NavLink>
      <NavLink className="NavigationList__NavLink" to={`/Dashboard/Orders`}>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </NavLink>
      <NavLink className="NavigationList__NavLink" to={`/Dashboard/Kitchen`}>
        <ListItem button>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Kitchen" />
        </ListItem>
      </NavLink>
      <NavLink className="NavigationList__NavLink" to={`/Dashboard/Billing`}>
        <ListItem button>
          <ListItemIcon>
            <EuroSymbolIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>
      </NavLink>
      <NavLink className="NavigationList__NavLink" to={`/Dashboard/Reports`}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
      <NavLink className="NavigationList__NavLink" to={`/Dashboard/Users`}>
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
