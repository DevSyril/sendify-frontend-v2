import React, { useContext, useEffect, useState } from 'react'
import './GroupDiscussions.css'
import { images } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { GroupContext } from '../Context/GroupContext'
import { sendFile } from '../../Http/HttpRequest/axiosClient'
import { toast } from 'react-toastify'
import { sendFileResponse } from '../../Http/HttpRequest/responseAnalyser'
import { API_URL } from '../../assets/Utils'
import axios from 'axios'

export default function GroupDiscussions() {

  const [file, setFile] = useState(false)

  const { groupId, setGroupId, currentUser } = useContext(GroupContext)

  const [groupMembers, setGroupMembers] = useState([]);

  const [groupFiles, setGroupFiles] = useState([]);

  const [group, setGroup] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_URL.uniqueGroup}${groupId}`,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(function (response) {
        setGroup(() => response.data.data)
      });

    axios({
      method: 'get',
      url: `${API_URL.groupMembers}${groupId}`,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(function (response) {
        setGroupMembers(() => response.data.data)
      });

    axios({
      method: 'get',
      url: `${API_URL.groupFiles}${groupId}`,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(function (response) {
        setGroupFiles(() => response.data.data)
        console.log(response.data.data);
      });

    console.log();

  }, [groupId]);


  const handleFileUpload = async (e) => {
    e.preventDefault()

    if (file.size > 10000000) {
      toast.error("Le fichier est trop volumineux (max 10 Mo)")

    } else {

      const formData = new FormData()
      formData.set('group_id', groupId)
      formData.set('file', file)

      const response = await sendFile(formData)

      if (response.success) {
        toast.success("Fichier envoyé...")
        console.log(file.type);
        setFile(false)
      } else {
        if (sendFileResponse(response) != null) {
          toast.error(sendFileResponse(response))
        } else {
          toast.error(response.message)
        }
      }
    }

  }

  return (
    <div className='group-discussions'>
      <div className='group-header flex'>
        {group.map((item, index) => (
          <div className='group-profile-zone flex' key={index}>
            <img src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} alt='Group Icon' className='group-profile' />
            <div className='flex flex-column'>
              <h2 className='p-0-m-0'>{item.name}</h2>
              <p className='p-0-m-0'>
                {groupMembers.map((member, index) => (
                  <span>{member.username + ','}</span>
                ))}
              </p>
            </div>
          </div>
        ))}
        <div className='group-options flex'>
          <FontAwesomeIcon icon={faUserPlus} size='xl' />
          <FontAwesomeIcon icon={faGear} size='xl' />
        </div>
      </div>


      <div className='discussions-items flex flex-column'>
        {groupFiles.map((item, index) => (
          <div className={`discussion-item flex flex-column ${currentUser[0].username == item.sender ? 'user' : ''}`} key={index}>
            {item.name.endsWith('jpg') || item.name.endsWith('png') || item.name.endsWith('jpeg')?
              <img src={`${API_URL.groupsFilesUrl}${item.name}`} alt='Preview' className='file' />
              : <></>
            }
            {item.name.endsWith('mp4')?
              <video src={`${API_URL.groupsFilesUrl}${item.name}`} alt='Preview' className='file'></video>
              : <></>
            }
            {item.name.endsWith('pdf')?
              <img src={images.pdfPlaceholder}  alt='Preview' className='file' />
              : <></>
            }
            {item.name.endsWith('docx')?
              <img src={images.docxPlaceholder}  alt='Preview' className='file' />
              : <></>
            }
            <div className='flex flex-column w-100'>
              <h4 className='p-0-m-0'>{item.name}</h4>
              <p className='p-0-m-0'>Envoyé par {currentUser[0].username == item.sender ? "Moi-même" : item.sender} </p>
              <div className='p-0-m-0 flex space-btw w-100'> {item.upload_date} <FontAwesomeIcon icon={faDownload} size='xl'/> </div>
            </div>
          </div>
        ))}
      </div>

      {file && <div className='preview'>
        {file.type.startsWith('image/') ?
          <div><img src={URL.createObjectURL(file)} alt='Preview' className='uploaded-file' /><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p> </div>
          : <></>
        }
        {file.type.startsWith('video/') ?
          <div><video src={URL.createObjectURL(file)} alt='Preview' className='uploaded-file' controls></video><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p> </div>
          : <></>
        }
        {file.type.startsWith('application/pdf') ?
          <div><object data={URL.createObjectURL(file)} alt='Preview' type="application/pdf" className='uploaded-file' controls></object><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p> </div>
          : <></>
        }
        {file.type.startsWith('application') && file.type != "application/pdf" ?
          <div><object data={URL.createObjectURL(file)} alt='Preview' type="application/pdf" className='uploaded-file' controls></object><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p> </div>
          : <></>
        }
      </div>}

      <form className='message-sender' onSubmit={handleFileUpload}>
        <div className='file'>
          <label htmlFor='image'>
            <img src={images.upload} alt='' />
          </label>
          <input id='image' type='file' hidden
            onChange={(e) => setFile(() => e.target.files[0])}
          />
        </div>
        <input type='text' placeholder='Saisissez un message pour commenter' />
        <button type='submit' className=''>
          <FontAwesomeIcon icon={faTelegramPlane} size='2x' color='blue' />
        </button>
      </form>
    </div>
  )
}
