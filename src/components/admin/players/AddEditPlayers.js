import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout';
import Fileuploader from '../../utils/fileUploader';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from '../../utils/tools';
import { TextField, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = {
  name: '',
  lastname: '',
  number: '',
  position: '',
  image: ''
}

const AddEditPlayers = (props) => {
  const [values, setValues] = useState(defaultValues);
  const [formType, setFormType] = useState('');
  const [loading, setLoading] = useState(false);
  const [defaultImg, setDefaultImg] = useState('');

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
        .min(1, 'The minimum is zero')
        .max(99, 'The maximum is 99'),
      position: Yup.string()
        .required('This field is required'),
      image: Yup.string()
        .required('This field is required')
    }),
    onSubmit: (values) => {
      submitForm(values);
    }
  })

  const submitForm = values => {
    let dataToSubmit = values;
    setLoading(true);
    if (formType === 'add') {
      playersCollection.add(dataToSubmit)
      .then(() => {
        showSuccessToast('Your player was added!');
        formik.resetForm();
        props.history.push('/admin_players');
      }).catch(error => showErrorToast(error));
    } else {
      playersCollection.doc(props.match.params.playerid).update(dataToSubmit)
      .then(() => {
        showSuccessToast('Player updated!');
        props.history.push('/admin_players');
      })
      .catch(error => showErrorToast(error))
      .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      playersCollection.doc(param).get().then(snapshot => {
        if (snapshot.data()) {
          firebase.storage().ref('players')
          .child(snapshot.data().image).getDownloadURL()
          .then(url => {
            // update formik
            updateImageName(snapshot.data().image);
            // update defaultImg
            setDefaultImg(url);
          })
          setFormType('edit');
          setValues(snapshot.data());
        } else {
          showErrorToast('Sorry, nothing was found!')
        }
      }).catch(error => showErrorToast(error))
    } else {
      setFormType('add');
      setValues(defaultValues);
    }
  }, [props.match.params.playerid])

  const updateImageName = filename => {
    formik.setFieldValue('image', filename)
  }
  
  const resetImg = () => {
    formik.setFieldValue('image', '');
    setDefaultImg('');
  }

  return (
    <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl error={selectIsError(formik, 'image')}>
              <Fileuploader
                dir="players"
                defaultImg={defaultImg} // img url
                defaultImgName={formik.values.image} // img name
                filename={filename => updateImageName(filename)}
                resetImg={() => resetImg()}
              />
              {selectErrorHelper(formik, 'image')}
            </FormControl>
            <hr/>
            <h4>Player info</h4>
            <div className="name_wrapper">
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
            </div>
            <div className="num_select_wrapper">
              <div className="mb-5">
                <FormControl>
                  <TextField
                    type="number"
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
                'Save changes'
              }
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddEditPlayers;