import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import moment from 'moment'

import {
  fetchUsers,
  updateUser,
  deleteUser,
  addUser,
} from '../../../state/ducks/users/actions'
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '30%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  textField: {
    width: '48%',
    margin: '2% 1%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  datePicker: {
    marginTop: '16px',
    marginBottom: '8px',
    width: '48%',
    margin: '2% 1%',
  },
  button: {
    width: '50%',
    margin: '0% 1% 0% 0%',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '10%',
  },
  title: {
    fontSize: '1.25rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
  },
}))
export const Users = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    name: '',
    last_name: '',
    role_id: 0,
    email: '',
    cellphone: '',
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDateChange = date => {
    setSelectedDate(date)
  }
  const handleSelectChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }))
  }
  const [state, setState] = React.useState({})

  const [selectedDate, setSelectedDate] = React.useState(null)

  useEffect(() => {
    props.fetchUsers()
    return () => {}
  }, [])
  useEffect(() => {
    if (props.users) {
      setState({
        columns: [
          {title: 'Name', field: 'name'},
          {title: 'Last Name', field: 'last_name'},
          {
            title: 'DOB',
            field: 'date_of_birth',
            editable: 'never',
          },
          {title: 'Role', field: 'role_id'},
          {title: 'E-mail', field: 'email'},
          {title: 'Cellphone', field: 'cellphone'},
        ],
        data: props.users.map(user => {
          const {id, name, last_name, date_of_birth, role_id, email, cellphone} = user
          return {
            id,
            name,
            last_name,
            date_of_birth,
            role_id,
            email,
            cellphone,
          }
        }),
      })
    }
    return () => {}
  }, [props.users])

  const addUser = () => {
    //@todo
    //add loading, try catch and modal to inform the user
    const date_of_birth = moment(selectedDate).format('YYYY-MM-d')
    const newUser = {...values, date_of_birth}
    console.log(newUser)
    props.addUser(newUser)
    handleClose()
  }

  return (
    <div>
      <MaterialTable
        title="List of Users"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newUser, oldUser) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                props.updateUser(newUser)
              }, 600)
            }),
          onRowDelete: oldUser =>
            new Promise(resolve => {
              setTimeout(() => {
                const {id} = oldUser
                props.deleteUser(id)
                resolve()
              }, 600)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: event => handleOpen(),
          },
        ]}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.title}>
              Create new User
            </h2>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={values.last_name}
                onChange={handleChange('last_name')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Cellphone"
                className={classes.textField}
                value={values.cellphone}
                onChange={handleChange('cellphone')}
                margin="normal"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.datePicker}
                  clearable
                  value={selectedDate}
                  placeholder="Date of Birth"
                  onChange={date => handleDateChange(date)}
                  minDate={new Date()}
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="role-simple">Role</InputLabel>
                <Select
                  value={values.role_id}
                  onChange={handleSelectChange}
                  inputProps={{
                    name: 'role_id',
                    id: 'role-simple',
                  }}
                >
                  <MenuItem value={0}>Select Role</MenuItem>
                  <MenuItem value={1}>Administrator</MenuItem>
                  <MenuItem value={2}>Waiter</MenuItem>
                  <MenuItem value={3}>Waitress</MenuItem>
                  <MenuItem value={4}>Chef</MenuItem>
                </Select>
              </FormControl>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  className={classes.button}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addUser}
                  className={classes.button}
                  disabled={
                    values.role_id === 0 ||
                    !selectedDate ||
                    !values.name ||
                    !values.last_name ||
                    !values.email ||
                    !values.cellphone
                  }
                >
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
const mapStateToProps = state => ({
  users: state.users.userList,
})
export default connect(
  mapStateToProps,
  {
    fetchUsers,
    updateUser,
    deleteUser,
    addUser,
  }
)(Users)
