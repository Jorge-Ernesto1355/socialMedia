import { message } from "antd";


export function validateVideo(file) {
    // Check if the file is a video
    if (!file.type.startsWith('video/')) {
        message.error('The file is not a video');
        return false
    }

    // Check if the file is of type mov or mp4
    if (!file.name.toLowerCase().endsWith('.mov') && !file.name.toLowerCase().endsWith('.mp4')) {
        message.error('The file must be of type MOV or MP4');
        return false
    }

    // Check the file size
    const sizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes
        if (sizeInMB > 8) {
        message.error('The file is larger than 8 MB');
        return false
    }

    // If it passes all validations, return true
    return true;
}