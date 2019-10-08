import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import {fetchPendingOrders} from '../../../state/ducks/kitchen/actions'
const Kitchen = props => {
  const [state, setState] = React.useState({})
  React.useEffect(() => {
    props.fetchPendingOrders()
  }, [props.fetchPendingOrders])
  React.useEffect(() => {
    setState({
      columns: [
        {title: 'Order #', field: 'id', type: 'numeric'},
        {title: 'Status', field: 'status'},
        {title: 'Deliver By', field: 'deliverTime'},
      ],
      data: props.pendingOrders.map(order => {
        const {id, status, deliverTime} = order
        return {
          id,
          status,
          deliverTime,
        }
      }),
    })
  }, [props.pendingOrders])

  // const [state, setState] = React.useState({
  //   columns: [
  //     {title: 'Order #', field: 'id', type: 'numeric'},
  //     {title: 'Status', field: 'status'},
  //     {title: 'Deliver By', field: 'deliverTime'},
  //   ],
  //   data: props.pendingOrders.map(order => {
  //     const {id, status, deliverTime} = order
  //     return {
  //       id,
  //       status,
  //       deliverTime,
  //     }
  //   }),
  // })

  return (
    <MaterialTable
      title="Pending Dishes"
      data={state.data}
      columns={state.columns}
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
const mapStateToProps = state => ({
  pendingOrders: state.kitchen.pendingOrders,
})
export default connect(
  mapStateToProps,
  {
    fetchPendingOrders,
  }
)(Kitchen)

// data={[
//   {
//     id: 1,
//     name: 'a',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 63,
//     sex: 'Male',
//     type: 'adult',
//   },
//   {
//     id: 2,
//     name: 'b',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 34,
//     sex: 'Female',
//     type: 'adult',
//     parentId: 1,
//   },
//   {
//     id: 3,
//     name: 'c',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 34,
//     sex: 'Female',
//     type: 'child',
//     parentId: 1,
//   },
//   {
//     id: 4,
//     name: 'd',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 34,
//     sex: 'Female',
//     type: 'child',
//     parentId: 3,
//   },
//   {
//     id: 5,
//     name: 'e',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 34,
//     sex: 'Female',
//     type: 'child',
//   },
//   {
//     id: 6,
//     name: 'f',
//     surname: 'Baran',
//     birthYear: 1987,
//     birthCity: 34,
//     sex: 'Female',
//     type: 'child',
//     parentId: 5,
//   },
// ]}
// columns={[
//   {title: 'Adı', field: 'name'},
//   {title: 'Soyadı', field: 'surname'},
//   {title: 'Cinsiyet', field: 'sex'},
//   {title: 'Tipi', field: 'type', removable: false},
//   {title: 'Doğum Yılı', field: 'birthYear', type: 'numeric'},
//   {
//     title: 'Doğum Yeri',
//     field: 'birthCity',
//     lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
//   },
// ]}
