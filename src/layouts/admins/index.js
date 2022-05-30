import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

import { AuthContext } from "context/AuthContext";
import { useRequest } from "lib/hooks/useRequest";
import { Link } from "react-router-dom";

const columns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]

function Admins() {
    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)

    const sendRequest = useRequest()

    const deleteAdmin = (adminId) => {
        if (window.confirm('Are you sure')) {
            sendRequest(`${process.env.REACT_APP_API_URL}admins/${adminId}`, {}, {}, {
                auth: true,
                snackbar: true,
            }, 'delete').then(() => {
                const updatedRows = rows.filter(function(row) {
                    console.log(row.id, adminId)
                    return (row.id != adminId)
                })
                console.log(updatedRows)
                setRows(updatedRows)
            })
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}admins`, {
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        })
            .then(response => {
                response.json().then(admins => {
                    const alladmins = admins.data.map((admin) => {
                        return {
                            id: admin.id,
                            name: <>{admin.name}</>,
                            email: <>{admin.email}</>,
                            actions: <>
                                <MDButton variant="text" color="error" onClick={() => { deleteAdmin(admin.id) }}>
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                                <Link to={`/admins/edit/${admin.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>edit</Icon>&nbsp;edit
                                    </MDButton>
                                </Link>
                            </>,
                        }
                    })
                    setRows(alladmins)
                })
            })
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <MDTypography variant="h6" color="white">
                                        Admins Table
                                    </MDTypography>
                                    <Link to='/admins/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>

                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Admins;
