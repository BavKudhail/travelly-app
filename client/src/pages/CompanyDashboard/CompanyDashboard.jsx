import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
// mutations/queries
import { COMPANY_DASHBOARD } from "../../utils/queries";
import CompanyTripCard from "../../components/Trip/CompanyTripCard";
import { CreateTrip } from "../../components/";
import { Flex } from "@chakra-ui/react";

function CompanyDashboard() {
  const { data, error, loading } = useQuery(COMPANY_DASHBOARD);
  const tripData = data?.getCompanyTrips || [];

  return (
    <>
      <Flex flexDir={"column"} w="100%" overflow={"auto"}>
        <Flex mt="10" justifyContent={"center"} w="100%">
          <CreateTrip />
        </Flex>
        <Flex flexDir={"column"} alignSelf={"center"}>
          {tripData.map((trip) => {
            return (
              <CompanyTripCard
                key={trip._id}
                tripId={trip._id}
                tripName={trip.tripName}
                tripDescription={trip.tripDescription}
                startDate={trip.startDate}
                countries={trip.countries}
                activities={trip.activities}
                endDate={trip.endDate}
                image={trip.imageUrl}
              />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}

export default CompanyDashboard;
