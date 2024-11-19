import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { SERVER_URL } from "@/lib/server_url";
import { useSearch } from "@/context/useSearch";
import { Badge } from "@/components/ui/badge";

const Grievances = () => {
  const { searchQuery } = useSearch();
  const [grievances, setGrievances] = useState([]);
  const [grievanceType, setGrievanceType] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("dateSubmitted");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/grievences`, {
        params: {
          query: searchQuery,
          grievanceType,
          status,
          sortBy,
          sortOrder
        }
      });
      setGrievances(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleUpdate= async(id,updateStatus)=>{
try {
await axios.patch(`${SERVER_URL}/update/${id}`,{status:updateStatus})
fetchGrievances()

} catch (error) {
  console.log("Error updating status",error);
  
}
  }
  useEffect(() => {
    fetchGrievances();
  }, [searchQuery, grievanceType, status, sortBy, sortOrder]);



  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={grievanceType} onValueChange={setGrievanceType}>
          <SelectTrigger className="w-[180px] bg-slate-700">
            <SelectValue placeholder="Filter by type:" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>All</SelectItem>
            <SelectItem value="Abuse">Abuse</SelectItem>
            <SelectItem value="Disturbance">Disturbance</SelectItem>
            <SelectItem value="Property Damage">Property Damage</SelectItem>
            <SelectItem value="Unlawful Surveillance">
              Unlawful Surveillance
            </SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] bg-slate-700">
            <SelectValue placeholder="Filter by status:" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {grievances.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("userId.username")}
                >
                  Citizen <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("grievanceType")}
                >
                  Type <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("location")}>
                  Location <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("dateSubmitted")}
                >
                  Submitted Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Change Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grievances.map((grievance) => (
              <TableRow key={grievance._id}>
                <TableCell className="font-medium">
                  {grievance.userId.username}
                </TableCell>
                <TableCell>{grievance.grievanceType}</TableCell>
                <TableCell>{grievance.location}</TableCell>
                <TableCell>
                  {new Date(grievance.dateSubmitted).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger>View Notes</HoverCardTrigger>
                    <HoverCardContent>
                      <ScrollArea>{grievance.description}</ScrollArea>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell className="text-right">
                 {grievance.status === 'Pending'  && <Button onClick={()=> handleUpdate(grievance._id,"In Progress")}>Accept</Button>}
                 {grievance.status === 'Pending'  && <Button variant="destructive" className="ml-2" onClick={()=> handleUpdate(grievance._id,"Canceled")}>Cancel</Button>}
                 {grievance.status === 'In Progress' && <Button onClick={()=> handleUpdate(grievance._id,"Resolved")}>Resolved</Button>}
                 {grievance.status === "Resolved" && <Badge className={"bg-green-600"}>Case Completed</Badge>}
                 {grievance.status === "Canceled" && <Badge className={"bg-red-600"}>Case Canceled</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-2xl font-semibold">No grievances found</div>
      )}
    </div>
  );
};

export default Grievances;
