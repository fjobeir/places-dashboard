import { createContext, useState } from "react";

export const AppContext = createContext({
    snackbar: {
        type: 'success',
        message: '',
        open: () => {},
        close: () => {},
    },
})

export const AppProvider = ({children}) => {
    const [type, setType] = useState('success')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    
    const closeSnackBar = () => {
        setOpen(false)
    }

    return <AppContext.Provider value={{
        snackbar: {
            type,
            setType,
            message,
            setMessage,
            open,
            setOpen,
            closeSnackBar
        }
    }}>
        {children}
    </AppContext.Provider>
}