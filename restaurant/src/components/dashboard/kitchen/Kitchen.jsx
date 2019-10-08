import React from 'react'
import MaterialTable from 'material-table'

export default function Kitchen() {
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'id', type: 'numeric'},
      {title: 'Dish Description', field: 'dishDescription'},
      {title: 'Remaining', field: 'remaining'},
      {title: 'Status', field: 'status'},
      {title: 'Actions', field: 'actions'},
    ],
    data: [
      {
        id: 54541,
        dishDescription: 'Hamburguer',
        remaining: '10 Minutes',
        status: 'Ready to be cooked',
        actions: 'Start preparing',
      },
      {
        id: 54542,
        dishDescription: 'Hot dog',
        remaining: '2 Minutes',
        status: 'Ready to be cooked',
        actions: 'Start preparing',
      },
      {
        id: 54543,
        dishDescription: 'Soup',
        remaining: '4 Minutes',
        status: 'Cooking',
        actions: 'Start preparing',
      },
      {
        id: 54544,
        dishDescription: 'Cheese sticks',
        remaining: '15 Minutes',
        status: 'Cooking',
        actions: 'Start preparing',
      },
      {
        id: 54545,
        dishDescription: 'Onions flavoured',
        remaining: '12 Minutes',
        status: 'Cooking',
        actions: 'Start preparing',
      },
      {
        id: 54546,
        dishDescription: 'Soup',
        remaining: '15 Minutes',
        status: 'Cooking',
        actions: 'Start preparing',
      },
      {
        id: 54547,
        dishDescription: 'Rock n Roll Steak',
        remaining: '20 Minutes',
        status: 'Ready to bispatch',
        actions: 'Start preparing',
      },
      {
        id: 54548,
        dishDescription: 'Soup',
        remaining: '15 Minutes',
        status: 'Ready to bispatch',
        actions: 'Start preparing',
      },
    ],
  })

  return (
    <MaterialTable
      title="Pending Dishes"
      data={[
        {
          id: 1,
          name: 'a',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 63,
          sex: 'Male',
          type: 'adult',
        },
        {
          id: 2,
          name: 'b',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'adult',
          parentId: 1,
        },
        {
          id: 3,
          name: 'c',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'child',
          parentId: 1,
        },
        {
          id: 4,
          name: 'd',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'child',
          parentId: 3,
        },
        {
          id: 5,
          name: 'e',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'child',
        },
        {
          id: 6,
          name: 'f',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'child',
          parentId: 5,
        },
      ]}
      columns={[
        {title: 'Adı', field: 'name'},
        {title: 'Soyadı', field: 'surname'},
        {title: 'Cinsiyet', field: 'sex'},
        {title: 'Tipi', field: 'type', removable: false},
        {title: 'Doğum Yılı', field: 'birthYear', type: 'numeric'},
        {
          title: 'Doğum Yeri',
          field: 'birthCity',
          lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
        },
      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
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
