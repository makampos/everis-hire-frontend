export interface IJob {
        forEach(arg0: (element: any) => void): number;
        row: any;
        JobId: string 
        EverJob: number,       
        LeaderCenters: string, 
        LtfOrPl: string, 
        ManagerSp: string, 
        Community: string,
        Squad: string, 
        ProjectId: string, 
        AllocationType: string, 
        OpeningDate: Date,
        Technology: string, 
        YearsOfExperience: number, 
        DesiredDate:Date, 
        MaximumSalary: number, 
        Recruiter: string, 
        Priority: number, 
        PriorityDate: Date, 
        Status: string, 
        Justification: string,
        projectDescription: string,
        allocationTypeDescription: string
}
