import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RestaurantIcon />
      </ListItemIcon>
      <ListItemText primary="Kitchen" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EuroSymbolIcon />
      </ListItemIcon>
      <ListItemText primary="Billing" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
)
