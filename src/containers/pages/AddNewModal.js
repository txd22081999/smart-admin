import React from 'react'
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap'
import Select from 'react-select'
import CustomSelectInput from '../../components/common/CustomSelectInput'
import IntlMessages from '../../helpers/IntlMessages'

const AddNewModal = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName='modal-right'
      backdrop='static'
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id='pages.add-new-modal-title' />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id='pages.product-name' />
        </Label>
        <Input />
        <Label className='mt-4'>
          <IntlMessages id='pages.category' />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className='react-select'
          classNamePrefix='react-select'
          name='form-field-name'
          options={categories}
        />
        <Label className='mt-4'>
          <IntlMessages id='pages.description' />
        </Label>
        <Input type='textarea' name='text' id='exampleText' />
        <Label className='mt-4'>
          <IntlMessages id='pages.status' />
        </Label>
        <CustomInput
          type='radio'
          id='exCustomRadio'
          name='customRadio'
          label='XÁC NHẬN'
        />
        <CustomInput
          type='radio'
          id='exCustomRadio2'
          name='customRadio'
          label='ĐANG XỬ LÝ'
        />
        <CustomInput
          type='radio'
          id='exCustomRadio2'
          name='customRadio'
          label='ĐANG GIAO'
        />
        <CustomInput
          type='radio'
          id='exCustomRadio2'
          name='customRadio'
          label='ĐÃ HỦY'
        />
        <CustomInput
          type='radio'
          id='exCustomRadio2'
          name='customRadio'
          label='HOÀN THÀNH'
        />
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' outline onClick={toggleModal}>
          <IntlMessages id='pages.cancel' />
        </Button>
        <Button color='primary' onClick={toggleModal}>
          <IntlMessages id='pages.submit' />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  )
}

export default AddNewModal
