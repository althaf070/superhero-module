import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SERVER_URL } from "@/lib/server_url";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setusers] = useState([])
  const fetchUsers = async()=> {
    const response = await axios.get(`${SERVER_URL}/users`)
    if(response.data.success){
      setusers(response.data.user)
    }
  }
  useEffect(() => {
  fetchUsers()
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-5">
     {users?.length > 0 ? (
      users.map((user)=> (
        <Card className="col-span-1 md:col-span-3 bg-slate-800 text-white" key={user._id}>
        <CardHeader>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>
   
      ))
     ):"No users found"}
    
    </div>
  );
};

export default Users;
