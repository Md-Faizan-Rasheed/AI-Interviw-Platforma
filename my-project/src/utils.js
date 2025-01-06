import { toast } from 'react-toastify';

export const handleSucess = (msg)=>{
    toast.sucess(msg,
       { position:"top-right"}
    )
}

export const handleError = (msg)=>{
    toast.error(msg,
       { position:"top-right"}
    )
}