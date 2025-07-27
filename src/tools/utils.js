import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    console.log("Error before:", msg);
    toast.error(msg, {
        position: 'top-right'
    });
    console.log("Error after:", msg);
}