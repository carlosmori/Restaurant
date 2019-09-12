import React from 'react'
import MaterialTable from 'material-table'

export default function Users() {
  const [state, setState] = React.useState({
    columns: [
      //Union name + lastName
      {title: 'Full Name', field: 'name'},
      {title: 'Age', field: 'age'},
      {title: 'Role', field: 'role'},
      {title: 'E-mail', field: 'email'},
      {title: 'Cellphone', field: 'cellphone', type: 'number'},
      // {title: 'Holidays in', field: 'holidays'},
      // @todo { title: 'Performance', field: 'performance' },
    ],
    data: [
      {
        name: 'Carlos Agustin Mori',
        age: '24',
        role: 'Administrator',
        email: 'carlosmori34@gmail.com',
        cellphone: 5491140310573,
      },
      {
        name: 'Megan Fox',
        age: '22',
        role: 'Waitress',
        email: 'meganfox@gmail.com',
        cellphone: 5491140310573,
      },
      {
        name: 'Tom Hanks',
        age: '27',
        role: 'Waiter',
        email: 'tomhanks@gmail.com',
        cellphone: 5491140310573,
      },
      {
        name: 'Margot Robbie',
        age: '24',
        role: 'Administrator',
        email: 'margotrobbie@gmail.com',
        cellphone: 5491140310573,
      },
      {
        name: 'Gordon Ramsay',
        age: '50',
        role: 'Chef',
        holidays: '21 days, 11/24/2020',
        email: 'gordonramsay@gmail.com',
        cellphone: 5491140310573,
      },
      {
        name: 'Jamie Oliver',
        age: '45',
        role: 'Chef',
        holidays: '21 days, 11/24/2020',
        email: 'jamieoliver@gmail.com',
        cellphone: 5491140310573,
      },
    ],
  })

  return (
    <MaterialTable
      title="List of Users"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.push(newData)
              setState({...state, data})
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data[data.indexOf(oldData)] = newData
              setState({...state, data})
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.splice(data.indexOf(oldData), 1)
              setState({...state, data})
            }, 600)
          }),
      }}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  )
}
