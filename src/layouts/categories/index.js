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
import { Link } from "react-router-dom";

const columns = [
    { Header: "title", accessor: "title", width: "45%", align: "left" },
    { Header: "icon", accessor: "icon", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]
// const rows = []

function Categories() {
    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)

    const deleteCategory = (categoryId) => {
        if (window.confirm('Are you sure')) {
            fetch(`${process.env.REACT_APP_API_URL}categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + ctx.token
                }
            }).then(response => {
                response.json()
                    .then(deleted => {
                        console.log(deleted)
                    })
            })
                .catch(e => e)
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}categories`)
            .then(response => {
                response.json().then(categories => {
                    const allCategories = categories.data.map((category) => {
                        return {
                            title: <>{category.title}</>,
                            icon: <><img src={category.icon} width="80" /></>,
                            actions: <>
                                <MDButton variant="text" color="error" onClick={() => { deleteCategory(category.id) }}>
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                                <Link to={`/categories/edit/${category.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>edit</Icon>&nbsp;edit
                                    </MDButton>
                                </Link>
                            </>,
                        }
                    })
                    setRows(allCategories)
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
                                        Categories Table
                                    </MDTypography>
                                    <Link to='/categories/add'>
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

export default Categories;
