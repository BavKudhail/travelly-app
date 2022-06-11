import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
// mutations/queries
import { COMPANY_DASHBOARD } from "../../utils/queries";
import CompanyTripCard from "../../components/Trip/CompanyTripCard"



import { CreateTrip } from "../../components/";

function CompanyDashboard() {
  const {data, error, loading} = useQuery(COMPANY_DASHBOARD)
  const tripData = data?.getCompanyTrips || [];
  console.log(tripData)
  return (<>
  <CreateTrip />;
  {/* <CompanyTripCard /> */}

  {tripData.map((trip)=>{
    return <CompanyTripCard key={trip._id} tripId={trip._id} tripName={trip.tripName} tripDescription={trip.tripDescription} startDate={trip.startDate}  endDate={trip.endDate} image={trip.imageUrl}/>
  })}



  </>)

}

export default CompanyDashboard;
