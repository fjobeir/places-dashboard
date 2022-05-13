import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDSnackbar from "components/MDSnackbar";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "context/AuthContext";

function AddCategory() {

    const ctx = useContext(AuthContext)

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [serverResponse, setServerResponse] = useState('')
    const [snackBarType, setSnackBarType] = useState('success')

    const closeSnackBar = () => setOpenSnackBar(false);

    const titleRef = useRef(null)
    const iconRef = useRef(null)

    const addCategory = () => {
        const categoryTitle = titleRef.current.querySelector('input[type=text]').value
        const iconFile = iconRef.current.querySelector('input[type=file]').files

        var formdata = new FormData();
        formdata.append("title", categoryTitle);
        formdata.append("icon", iconFile[0]);

        fetch(`${process.env.REACT_APP_API_URL}categories`, {
            method: 'post',
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        }).then(response => {
            response.json().then(categoryAdded => {
                setServerResponse(categoryAdded.messages.join(' '))
                if (categoryAdded.success) {
                    setSnackBarType('success')
                } else {
                    setSnackBarType('error')
                }
                setOpenSnackBar(true)
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
                                        <MDInput ref={titleRef} type="text" label="Category Title" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={iconRef} type="file" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={addCategory}>
                                            add category
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            <MDSnackbar
                color={snackBarType}
                icon={snackBarType == 'success' ? 'check' : 'warning'}
                title="Places App"
                content={serverResponse}
                open={openSnackBar}
                // onClose={closeSnackBar}
                close={closeSnackBar}
                dateTime=""
                bgWhite
            />

        </DashboardLayout>
    )
}

export default AddCategory