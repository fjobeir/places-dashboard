import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

import { Link } from "react-router-dom";

const columns = [
	{ Header: "title", accessor: "title", width: "45%", align: "left" },
	{ Header: "category", accessor: "category", align: "left" },
	{ Header: "location", accessor: "location", align: "center" },
	{ Header: "actions", accessor: "actions", align: "center" },
]
// const rows = []

function Places() {
	const [rows, setRows] = useState([])

	const deletePlace = (placeId) => {
		if (window.confirm('Are you sure')) {
			fetch(`${process.env.REACT_APP_API_URL}places/${placeId}`, {
				method: "DELETE"
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
		fetch(`${process.env.REACT_APP_API_URL}places`)
			.then(response => {
				response.json().then(places => {
					const allPlaces = places.data.map((place) => {
						return {
							title: <>{place.title}</>,
							category: <>{place.Category.title}</>,
							location: <>
								<a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/@${place.latitude},${place.longitude},15z`}>
									Click Here
								</a>
							</>,
							actions: <>
								<MDButton variant="text" color="error" onClick={() => {deletePlace(place.id)}}>
									<Icon>delete</Icon>&nbsp;delete
								</MDButton>
							</>,
						}
					})
					setRows(allPlaces)
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
                                        Places Table
                                    </MDTypography>
                                    <Link to='/places/add'>
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

export default Places;
