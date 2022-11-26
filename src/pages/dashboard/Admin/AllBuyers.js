import { useQuery } from "@tanstack/react-query";
import React from "react";
import useHeaderGET from "../../../hooks/useHeaderGET";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../shared/Loading";
import AdminTable from "./AdminTable";

const AllBuyers = () => {
  useTitle("All Buyers");
  const header = useHeaderGET();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URl}/users/buyers`,
          {
            headers: header,
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
      <AdminTable users={users} />
    </div>
  );
};

export default AllBuyers;
