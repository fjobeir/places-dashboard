import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { AppContext } from "context/AppContext";

function EditAdmin() {

    const ctx = useContext(AuthContext)
    const appCtx = useContext(AppContext)
    const { id } = useParams()
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}admins/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        }).then(response => {
            response.json().then(currentAdmin => setAdmin(currentAdmin.data))
        })
        .catch(e => e)
    }, [])

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)

    const editAdmin = () => {
        const name = nameRef.current.querySelector('input[type=text]').value
        const email = emailRef.current.querySelector('input[type=email]').value
        const password = passwordRef.current.querySelector('input[type=password]').value
        const password_confirmation = passwordConfirmationRef.current.querySelector('input[type=password]').value

        fetch(`${process.env.REACT_APP_API_URL}admins/${id}`, {
            method: 'put',
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation
            }),
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + ctx.token
            }
        }).then(response => {
            response.json().then(adminAdded => {
                appCtx.snackbar.setMessage(adminAdded.messages.join(' '))
                if (adminAdded.success) {
                    appCtx.snackbar.setType('success')
                } else {
                    appCtx.snackbar.setType('error')
                }
                appCtx.snackbar.setOpen(true)
            })
        }).catch(e => e)
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput ref={nameRef} value={admin.name} onChange={(e) => {setAdmin({...admin, name: e.target.value})}} type="text" label="Name" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={emailRef} value={admin.email} onChange={(e) => {setAdmin({...admin, email: e.target.value})}} type="email" label="Email" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordRef} type="password" label="Password" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordConfirmationRef} type="password" label="Password Confirmation" variant="standard" fullWidth />
                                    </MDBox>
                                    
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={editAdmin}>
                                            save changes
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default EditAdmin