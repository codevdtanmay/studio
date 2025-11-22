import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, Search, Upload, MoreHorizontal } from "lucide-react";

const participants = [
    { id: 'USR001', name: 'Priya Sharma', district: 'Mumbai', stage: 'Reproductive', problem: 'Dysmenorrhea' },
    { id: 'USR002', name: 'Anjali Singh', district: 'Delhi', stage: 'Perimenopausal', problem: 'Menopause Symptoms' },
    { id: 'USR003', name: 'Sunita Rao', district: 'Bangalore', stage: 'Postmenopausal', problem: 'Menopause Symptoms' },
    { id: 'USR004', name: 'Deepa Kumar', district: 'Pune', stage: 'Reproductive', problem: 'Irregular Periods' },
    { id: 'USR005', name: 'Meena Gupta', district: 'Mumbai', stage: 'Perimenopausal', problem: 'PMS' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-headline font-bold">Admin / Researcher Panel</h1>
                <p className="text-muted-foreground mt-2">View and manage participant data.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Participants</CardTitle>
                    <CardDescription>A list of all participants in the study.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search participants..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        <Filter className="h-4 w-4" /> Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>District</DropdownMenuItem>
                                    <DropdownMenuItem>Stage</DropdownMenuItem>
                                    <DropdownMenuItem>Problem</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button className="gap-2">
                                <Download className="h-4 w-4" /> Download Data
                            </Button>
                             <Button variant="secondary" className="gap-2">
                                <Upload className="h-4 w-4" /> Upload Reports
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Participant ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>District</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead>Problem</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.id}</TableCell>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>{p.district}</TableCell>
                                        <TableCell>{p.stage}</TableCell>
                                        <TableCell>{p.problem}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>View Reports</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
