import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from '../../utils/tools';
import { TextField, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = {
  name: '',
  lastname: '',
  number: '',
  position: ''
}

const AddEditPlayers = (props) => {
  const [values, setValues] = useState(defaultValues);
  const [formType, setFormType] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('This field is required'),
      lastname: Yup.string()
        .required('This field is required'),
      number: Yup.number()
        .required('This field is required')
        .min('1', 'The minimum is zero')
        .max('99', 'The maximum is 99'),
      position: Yup.string()
        .required('This field is required')
    })
  })

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      setFormType('edit');
      setValues({name: 'Bruno'})
    } else {
      setFormType('add');
      setValues(defaultValues);
    }
  }, [props.match.params.playerid])
  
  return (
    <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            
            image
            <hr/>
            <h4>Player info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add firstname"
                  {...formik.getFieldProps('name')}
                  {...textErrorHelper(formik, 'name')}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add lastname"
                  {...formik.getFieldProps('lastname')}
                  {...textErrorHelper(formik, 'lastname')}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add number"
                  {...formik.getFieldProps('number')}
                  {...textErrorHelper(formik, 'number')}
                />
              </FormControl>
            </div>

            <div className="mb-5">
              <FormControl error={selectIsError(formik, 'position')}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps('position')}
                >
                  <MenuItem value="" disabled>Select a position</MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {selectErrorHelper(formik, 'position')}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === 'add' ? 
                'Add player'
              :
                'Edit player'
              }
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddEditPlayers;