
import { useRef, useState } from 'react';
import { validateFile } from '../components/MIDDLE/Stories/utils/validateFile';
import { getBase64 } from '../components/Profile/header/modalProfilePicture/util/getBase64';

const useUploader = (props) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const file = useRef()

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
    
        if (validateFile(info.file.originFileObj)) {
            getBase64(info.file.originFileObj, (url) => {
                file.current = info.file.originFileObj;
                setLoading(false);
                setImageUrl(url);
                file.current = info.file.originFileObj
            });
        }
        else {
            setLoading(false)
        }

       
    };

    const deleteImageUrl = ()=> setImageUrl(null)

    const propsUploader = {
        className: "comment-img",
        name: 'image',
        onChange:(e)=> handleChange(e),
        showUploadList: false, 
        ...props
      };
    

    return {imageUrl, imageUrlLoading: loading ,file, propsUploader, deleteImageUrl }
 
}

export default useUploader