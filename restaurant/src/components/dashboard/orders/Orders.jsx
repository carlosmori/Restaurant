import React from 'react'
import MaterialTable from 'material-table'

export default function Orders() {
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'id', type: 'numeric'},
      {title: 'Waiter', field: 'name'},
      {title: 'Status', field: 'status'},
      {title: 'Detail', field: 'detail'},
      {title: 'Remaining', field: 'remaining'},
      {title: 'Total Amount', field: 'amount'},
    ],
    data: [
      {
        id: 54541,
        name: 'Megan Fox',
        status: 'Ready to dispatch',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54542,
        name: 'Margot Robbie',
        status: 'Delivered',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54543,
        name: 'Margot Robbie',
        status: 'Delivered',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54544,
        name: 'Megan Fox',
        status: 'Delivered',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54545,
        name: 'Megan Fox',
        status: 'Ready to dispatch',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54546,
        name: 'Tom Hanks',
        status: 'Canceled',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54547,
        name: 'Tom Hanks',
        status: 'In preparation',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
      {
        id: 54548,
        name: 'Tom Hanks',
        status: 'In preparation',
        detail: 'Hamburguer with cheese',
        remaining: '6 minutes',
        amount: '$ 2.500,83',
      },
    ],
  })

  return (
    <MaterialTable
      title="Pending Orders"
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
