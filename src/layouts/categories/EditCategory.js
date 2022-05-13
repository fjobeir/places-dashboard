import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDSnackbar from "components/MDSnackbar";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "context/AuthContext";

import { useParams } from "react-router-dom";

function EditCategory() {

    const { id } = useParams()
    const ctx = useContext(AuthContext)

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [serverResponse, setServerResponse] = useState('')
    const [snackBarType, setSnackBarType] = useState('success')

    const [categoryData, setCategoryData] = useState({title: ''})

    const closeSnackBar = () => setOpenSnackBar(false);

    const titleRef = useRef(null)
    const iconRef = useRef(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}categories/${id}`)
            .then(response => {
                response.json().then(currentCategory => {
                    setCategoryData(currentCategory.data)
                })
            })
            .catch(e => e)
    }, [])

    const editCategory = () => {
        const iconFile = iconRef.current.querySelector('input[type=file]').files

        var formdata = new FormData();
        formdata.append("title", categoryData.title);
        formdata.append("icon", iconFile[0]);

        fetch(`${process.env.REACT_APP_API_URL}categories/${id}`, {
            method: 'put',
            body: formdata,
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        }).then(response => {
            response.json().then(categoryEdited => {
                setServerResponse(categoryEdited.messages.join(' '))
                if (categoryEdited.success) {
                    setCategoryData(categoryEdited.data)
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
                                        <MDInput value={categoryData.title} onChange={(e) => {setCategoryData({...categoryData, title: e.target.value})}} id="categoryTitle" type="text" label="Category Title" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        {categoryData.icon && <img src={categoryData.icon} width={80} />}
                                        <MDInput ref={iconRef} type="file" onChange={(e) => {console.log(e.target.files)}} variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={editCategory}>
                                            Edit category
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

export default EditCategory