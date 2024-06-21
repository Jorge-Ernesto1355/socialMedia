import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography, Upload } from 'antd';
import React, { useState } from 'react'
import './storyVide.css'
import AuthProvider from '../../../../../zustand/AuthProvider';
import { validateVideo } from '../../utils/validateVideo';
const { Dragger } = Upload;

const { Text } = Typography;
const VideoInput = ({handleFile}) => {
    const [loading, setLoading] = useState(false);
    const [source, setSource] = React.useState();
  
    const handleFileChange = (event) => {
      
      const file = event.file;

      if (file instanceof Blob) { // Verificar si el archivo es un Blob
          setLoading(true); // Activar el estado de carga
          handleFile(file)
          const reader = new FileReader();
          reader.onload = (e) => {
              
              setSource(e.target.result); // Establecer la URL de la previsualización
              setLoading(false); // Desactivar el estado de carga
          };
          reader.readAsDataURL(file); // Leer el archivo como una URL base64
      } else {
          console.error("El archivo seleccionado no es válido."); // Manejar el error si el archivo no es un Blob
      }
  };
  

    
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
        <Text type='secondary'>Drag and drop an image or <Button type="link">Choose File</Button> </Text>
      </button>
    );

 

    const props = {
      accept: ".mov,.mp4",
      className: "story-dragger-img",
      name: 'image',
      type: "file",
      onChange:(e)=> handleFileChange(e),
      beforeUpload: (video)=> validateVideo(video), 
      showUploadList: false
    };
  
    return (
      <div className="VideoInput">
        <Dragger  {...props} >
               {source ? 
                  <video
                  className="story-video-preview"
                  width="100%"
                  height={"100%"}
                  controls
                  src={source}
                />
                :
                uploadButton
              }
       </Dragger>
      </div>
    );
}

export default VideoInput