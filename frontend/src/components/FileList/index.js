/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'

export default ({ files }) => {
  return (
    <Container>
      {files.map(file => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}
                {!!file.url && <button>Excluir</button>}
                </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error &&
              (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '##94ffff' }
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )
            }

            {
              file.url &&
              (
                <a
                  href="http://localhost:3000/files/27ffe860567639f9674df407cf071294-profile.jpg"
                  target="_blank"
                  rel="noopener noreferrer">
                  <MdLink style={{ marginRight: 8 }} size={24} color='#222' />
                </a>
              )
            }

            {file.uploaded && (<MdCheckCircle size={24} color="#78e5d5" />)}
            {file.error && (<MdError size={24} color="#e57878" />)}
          </div>
        </li>
      ))}
    </Container>
  )
}