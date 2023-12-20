import { toast } from 'react-toastify'

export function errorToast(text: string) {
  toast.error(text, { style: { fontFamily: 'Vazirmatn' } })
}

export function successToast(message: string){
  toast.success(message, { style: { fontFamily: 'Vazirmatn' } })
}