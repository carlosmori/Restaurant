{/* <Modal
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
      </Modal> */}