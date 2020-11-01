/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Dropzone from 'react-dropzone'

import { DropContainer, UploadMessage } from './styles'

export default props => {
  return (
    <Dropzone accept="image/*" onDropAccepted={() => { }}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()}
          />
          Jogue aqui seus arquivos
        </DropContainer>
      )}
    </Dropzone>
  )
}