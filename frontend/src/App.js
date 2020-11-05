import React, { useEffect, useState } from 'react'
import GlobalStyle from './styles/global'
import { Container, Content } from './style'
import { uniqueId } from 'lodash'
import filesize from 'filesize'

import Upload from './components/Upload'
import FileList from './components/FileList'
import api from './services/api'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [filesToUpload, setFsileToUpload] = useState([])

  useEffect(() => {
    filesToUpload.forEach(processUpload)
  }, [filesToUpload])

  useEffect(() => {
    console.log(uploadedFiles)
  }, [uploadedFiles])

  const handleUpload = files => {
    const upFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    setFsileToUpload(filesToUpload.concat(upFiles))
  }

  const updateFile = (id, data) => {
    setUploadedFiles(
      filesToUpload.map(fileToUpload => {
        return id === fileToUpload.id
          ? { ...fileToUpload, ...data }
          : fileToUpload
      })
    )
  }

  const processUpload = file => {
    if (uploadedFiles.filter(f => f.id === file.id).length > 0) return

    const data = new FormData()

    data.append('file', file.file, file.name)

    api.post('/posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round(e.loaded * 100 / e.total))

        updateFile(file.id, { progress })
      }
    })
      .then(response => {
        updateFile(file.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
          progress: 100
        })
      })
      .catch(() => {
        updateFile(file.id, {
          error: true
        })
      })
  }

  return (
    <>
      <Container>
        <Content>
          <Upload onUpload={handleUpload} />
          {
            !!uploadedFiles.length &&
            <FileList files={uploadedFiles} />
          }
        </Content>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
