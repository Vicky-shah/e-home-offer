import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import {
    Grid,
    TextField,
    TextareaAutosize,
    Typography,
    Link,
    Box,
    Button
} from "@material-ui/core";
import useStyles from "./Styles";
import PropertyCard from "../../Components/PropertyCard";
import MyHeader from "../../Components/MyHeader";
// reactstrap components
function ListPage(props) {
    const classes = useStyles();
    const propertyFavList = [
        {
            title: "Dolares Park",
            id: 1,
            name: "Park",
            price: "115,000",
            est: "$373/Mo",
            bed: 3,
            bath: 3,
            sqft: "1,640",
            area: "1 acre lot",
            address1: "7015 GreenField Dr",
            address2: "Rapid City,SD 57703",
            isFavourite: true,
            position: {
                lat: 37.778519,
                lng: -122.40564
            }
        },
        {
            title: "Any Property",
            id: 2,
            name: "Property",
            price: "105,000",
            est: "$378/Mo",
            bed: 2,
            bath: 1,
            sqft: "1,240",
            area: "2 acre lot",
            address1: "3015 GreenField Dr",
            address2: "Rapid City,SD 67703",
            isFavourite: true,
            position: {
                lat: 37.759703,
                lng: -122.428093
            }
        },
        {
            title: "Somewhere",
            id: 3,
            name: "US",
            price: "300,000",
            est: "$373/Mo",
            bed: 6,
            bath: 6,
            sqft: "3,640",
            area: "3 acre lot",
            address1: "7018 GreenField Dr",
            address2: "Rapid City,SD 27703",
            isFavourite: true,
            position: {
                lat: 37.778819,
                lng: -122.40524
            }
        },
        {
            title: "Nowhere",
            id: 4,
            name: "No",
            price: "215,000",
            est: "$373/Mo",
            bed: 4,
            bath: 4,
            sqft: "2,640",
            area: "1 acre lot",
            address1: "7015 GreenField Dr",
            address2: "Rapid City,SD 57703",
            isFavourite: true,
            position: {
                lat: 37.738419,
                lng: -122.40594
            }
        }
    ];

    return (
        <>
            {/* <MyHeader
                heading="Heading for the list page"
                subHeading="subHeading for list Page"
            /> */}
            <div>
                <Grid container component="main">
                    <Grid
                        container
                        display="flex"
                        justify="center"
                        alignItems="flex-start"
                        className={classes.listContainer}
                    >
                        <Grid
                            container
                            direction="row"
                            xs={12}
                            sm={12}
                            md={10}
                            lg={10}
                        >
                            {propertyFavList.map((item) => {
                                return (
                                    <Grid item xs={3} sm={12} md={3} lg={4}>
                                        <PropertyCard
                                            propertyValues={item}
                                            history={props.history}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default ListPage;
