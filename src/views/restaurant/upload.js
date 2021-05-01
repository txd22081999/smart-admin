import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import IntlMessages from '../../helpers/IntlMessages'

import './upload.scss'

export const Upload = (props) => {
  const [images, setImages] = useState([])
  const [controlVisible, setControlVisible] = useState(false)
  const maxNumber = 1

  const onChange = (imageList, addUpdateIndex) => {
    const { onImageChange } = props
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
    onImageChange(imageList, addUpdateIndex)
  }

  const onMouseOver = () => {
    setControlVisible(true)
  }

  const onMouseLeave = () => {
    setControlVisible(false)
  }

  return (
    <div className='image-upload-container'>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <IntlMessages id='restaurant.click-or-drop' />
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>
              {' '}
              <IntlMessages id='restaurant.remove-all' />
            </button>
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img
                  src={image['data_url']}
                  alt=''
                  width='100'
                  onMouseOver={onMouseOver}
                />
                {controlVisible && (
                  <div
                    className='image-item__btn-wrapper d-flex align-items-center justify-content-center'
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                  >
                    <button
                      className='mr-2'
                      onMouseOver={() => console.log('HIHI')}
                      onClick={() => onImageUpdate(index)}
                    >
                      <IntlMessages id='restaurant.update' />
                    </button>
                    <button
                      onMouseOver={onMouseOver}
                      onClick={() => onImageRemove(index)}
                    >
                      <IntlMessages id='restaurant.remove' />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
