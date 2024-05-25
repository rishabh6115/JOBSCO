import { fetchApplicationAction } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfileViewDialog from "@/components/ProfileViewDialog";

const ApplicationPageForRecruiter = async ({ params }) => {
  const { id } = params;
  const applications = await fetchApplicationAction(id);
  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Job Applied Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((item, i) => (
          <TableRow key={i}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.jobAppliedDate}</TableCell>
            <TableCell>{item.status[item.status.length - 1]}</TableCell>
            <TableCell className="text-right">
              <ProfileViewDialog
                candidateUserID={item?.candidateUserID}
                id={item._id}
                status={item.status[item.status.length - 1]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationPageForRecruiter;
