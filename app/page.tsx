import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";

import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.firstname);

  return <div></div>;
};

export default Home;
