import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from '@mui/material/Box';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MDSnackbar from "components/MDSnackbar";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';

import { Wrapper, Status } from "@googlemaps/react-wrapper";
function Map({ center, zoom, setLat, setLng }) {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    useEffect(() => {
        if (map) {
            map.addListener("click", (mapsMouseEvent) => {
                console.log(mapsMouseEvent)
                const coordinates = mapsMouseEvent.latLng.toJSON()
                setLat(coordinates.lat)
                setLng(coordinates.lng)
            });
        }
    }, [map])
    return (<div ref={mapRef} style={{ height: '400px' }} />)
}
function AddPlace() {
    const [longitude, setLongitude] = useState(28.5)
    const [latitude, setLatitude] = useState(40.5)
    const [category, setCategory] = useState(0)
    const PlaceTitleRef = useRef(null)
    const PlacePicRef = useRef(null)
    const PlaceDescRef = useRef(null)
    const PlaceCatIDRef = useRef(null)
    const PlaceLongRef = useRef(null)
    const PlaceLatRef = useRef(null)
    const ctx = useContext(AuthContext)
    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const closeSnackBar = () => setOpenSnackBar(false);

    const [categoriesData, setCategoriesData] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}categories`)
            .then(response => {
                response.json().then(categories => {
                    console.log(categories.data)
                    setCategoriesData(categories.data)
                })
            })
    }, [])
    const savePlace = () => {
        const title = PlaceTitleRef.current.querySelector('input[type=text]').value
        const description = PlaceDescRef.current.querySelector('input[type=text]').value
        // const category_id = PlaceCatIDRef.current.querySelector('input[type=text]').value
        const longitude = PlaceLongRef.current.querySelector('input[type=text]').value
        const latitude = PlaceLatRef.current.querySelector('input[type=text]').value
        const picture = PlacePicRef.current.querySelector('input[type=file]').files
        console.log(picture)
        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("category_id", category);
        formdata.append("longitude", longitude);
        formdata.append("latitude", latitude);
        formdata.append("picture", picture[0]);
        console.log(formdata)
        fetch(`${process.env.REACT_APP_API_URL}places`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            },
            body: formdata,
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setServerResponse(result.message.join(' '))
                if (result.success) {
                    setSnackBarType('success')
                } else {
                    setSnackBarType('error')
                }
                setOpenSnackBar(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

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
                                <MDTypography variant="h6" color="white">
                                    Add Place
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Place Title" variant="standard" fullWidth ref={PlaceTitleRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Place Description" variant="standard" fullWidth ref={PlaceDescRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={latitude} type="text" label="Latitude" variant="standard" fullWidth ref={PlaceLatRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={longitude} type="text" label="longitude" variant="standard" fullWidth ref={PlaceLongRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={category}
                                                    label="Category"
                                                    style={{padding: '20px 0'}}
                                                    onChange={handleCategoryChange}
                                                >
                                                    {categoriesData.map((category, i) => {
                                                        return <MenuItem value={category.id} key={category.id}>{category.title}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="file" label="Picture" variant="standard" fullWidth ref={PlacePicRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <Wrapper apiKey={''} >
                                            <Map center={{ lat: latitude, lng: longitude }} setLat={setLatitude} setLng={setLongitude} zoom={8} />
                                        </Wrapper>
                                    </MDBox>
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={savePlace}>
                                            Save Place
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
            <Footer />
        </DashboardLayout>
    )
}
export default AddPlace