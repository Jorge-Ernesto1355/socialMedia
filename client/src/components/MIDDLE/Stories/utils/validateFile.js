import { message } from "antd";

export function validateFile(file) {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
         message.error('The file is not an image');
         return false
    }

  
    // Check if the file is of type jpg or jpeg
    if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.jpeg') && !file.name.toLowerCase().endsWith('.png')) {
         message.error('The file must be of type JPG or JPEG or png');
         return false
    }


    // Check the file size
    const sizeInKB = file.size / 1024; // Convert bytes to megabytes
   
    if (sizeInKB < 1) {
         message.error('the file is to light to upload');
         return false
    } else if (sizeInKB > 5000) {
         message.error('The file is larger than 5 MB');
         return false
    }

    // If it passes all validations, return true
    return true;
}