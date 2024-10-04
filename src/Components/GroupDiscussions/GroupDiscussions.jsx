import React, { useContext, useEffect, useRef, useState } from 'react'
import './GroupDiscussions.css'
import { images } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { GroupContext } from '../Context/GroupContext'
import { addGroupMember, sendFile } from '../../Http/HttpRequest/axiosClient'
import { toast } from 'react-toastify'
import { sendFileResponse } from '../../Http/HttpRequest/responseAnalyser'
import { API_URL } from '../../assets/Utils'
import axios from 'axios'
import fileDownload from 'js-file-download'
import LeftSpinner from '../Spinner/LeftSpinner'
import { PulseLoader } from 'react-spinners'

export default function GroupDiscussions() {

  const [file, setFile] = useState(false)

  const { groupId, groupDatas, currentUser, groupMembers, setIsSelected, setHideAfterClick } = useContext(GroupContext)

  const [groupFiles, setGroupFiles] = useState([]);

  const [email, setEmail] = useState("");

  const [fileSent, setFileSent] = useState(false);

  const [addMember, setAddMember] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [isSending, setIsSending] = useState(false)


  const toTop = useRef(null)

  useEffect(() => {
    setIsLoading(() => true)

    axios({
      method: 'get',
      url: `${API_URL.groupFiles}${groupId}`,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(function (response) {
        setGroupFiles(() => response.data.data)
        setIsLoading(() => false)
      });

  }, [groupId, fileSent]);



  const handleGroupModify = () => {
    if (currentUser[0].id === groupDatas.owner_id) {
      setIsSelected(() => 'editGroup')
      setHideAfterClick(() => false)
    } else {
      toast.error("Vous n'êtes pas autorisé à éffectuer une modification")
      toast.warning(showGroup.owner_id)
    }
  }


  const handleFileUpload = async (e) => {
    e.preventDefault()

    setIsSending(() => true)

    if (file.size > 10000000) {
      toast.error("Le fichier est trop volumineux (max 10 Mo)")

    } else {
      console.log(file.type);

      const formData = new FormData()
      formData.set('group_id', groupId)
      formData.set('file', file)

      const response = await sendFile(formData)
      console.log(response);


      if (response.success) {
        setIsSending(false)
        toast.success("Fichier envoyé...")
        setFile(false)
        setFileSent(true)

      } else {
        setFile(false)
        setIsSending(false)
        if (sendFileResponse(response) != null) {
          toast.error(sendFileResponse(response))
        } else {
          toast.error(response.message)
        }
      }
    }

  }


  const handleDownload = (id, filename) => {
    axios({
      method: 'get',
      url: `${API_URL.downloadFiles}${id}`,
      responseType: 'blob',
      headers: { Accept: 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }


  const handleAddMember = async () => {
    const formData = new FormData();
    formData.set('member_email', email);
    formData.set('group_id', groupId);

    const response = await addGroupMember(formData)

    if (response.success) {
      toast.success("Invitation envoyée avec succès")
      setAddMember(() => false)
    } else {
      toast.error(response.message)
    }
  }



  return (
    <div className='group-discussions'>
      {isSending && <div className='loader'><PulseLoader color="green" size={20} loading={true} /> En cours d'envoi</div>}

      <div className='group-header flex'>
        <div className='group-profile-zone flex'>
          <img src={`${API_URL.groupsImageUrl}${groupDatas.profilePhoto}`} alt='Group Icon' className='group-profile' />
          <div className='flex flex-column'>
            <h2 className='p-0-m-0 small-title'>{groupDatas.name}</h2>
            <p className='p-0-m-0 small-text txt-over max-100'>
              {groupMembers && groupMembers.map((item, index) => (
                <span key={index} >{item.username + ' , '}</span>))
              }
            </p>
          </div>
        </div>
        <div className='group-options flex'>
          <FontAwesomeIcon icon={faUserPlus} size='xl' className='group-settings' onClick={() => setAddMember(() => true)} />
          <FontAwesomeIcon icon={faGear} size='xl' onClick={handleGroupModify} className='group-settings' />
        </div>
      </div>


      <div className='discussions-items flex flex-column'>
        {isLoading ? <LeftSpinner /> :
          groupFiles.map((item, index) => (
            <div className={`discussion-item flex flex-column ${currentUser[0].username == item.sender ? 'user' : ''}`} key={index}>
              {item.name.endsWith('jpg') || item.name.endsWith('png') || item.name.endsWith('jpeg') ?
                <img src={`${API_URL.groupsFilesUrl}${item.name}`} alt='Preview' className='file' />
                : <></>
              }
              {item.name.endsWith('mp4') ?
                <video src={`${API_URL.groupsFilesUrl}${item.name}`} alt='Preview' className='file'></video>
                : <></>
              }
              {item.name.endsWith('pdf') ?
                <img src={images.pdfPlaceholder} alt='Preview' className='file' />
                : <></>
              }
              {item.name.endsWith('docx') ?
                <img src={images.docxPlaceholder} alt='Preview' className='file' />
                : <></>
              }
              <div className='flex flex-column bx-bb max-length'>
                <div className='p-0-m-0 files-name txt-over'>{item.name}</div>
                <div className='p-0-m-0 small-text txt-over'>Envoyé par {currentUser[0].username == item.sender ? "Moi-même" : item.sender} </div>
                <div className='p-0-m-0 flex space-btw w-100'>
                  <p className='txt-over small-text p-0-m-0'>{item.upload_date}</p>
                </div>
              </div>
                  <FontAwesomeIcon className='download-action w-100 bx-bb' icon={faDownload} onClick={() => handleDownload(item.id, item.name)} size='xl' />
            </div>
          ))}

        {file && <div className='preview'>
          {file.type.startsWith('image/') ?
            <div><img src={URL.createObjectURL(file)} alt='Preview' className='uploaded-file' /><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p></div>
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
            <div><img src={images.filePlaceholder} alt='Preview' className='uploaded-file' controls /><p className='p-0-m-0'>{file.name}</p><p className='p-0-m-0'>Taille : {file.size} ko</p> </div>
            : <></>
          }
        </div>}
      </div>


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

      {addMember &&
        <div className='add-member flex flex-column'>
          <input type='email' placeholder='Email du nouveau membre' onChange={(e) => setEmail(e.target.value)} />
          <div className='flex'>
            <button onClick={handleAddMember}>Ajouter</button>
            <button onClick={() => setAddMember(() => false)}>Annuler</button>
          </div>
        </div>}
    </div>
  )
}
