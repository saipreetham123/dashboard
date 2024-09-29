const Urls = {
    baseUrl:"http://74.249.60.36:8081/Stats/api/",

    //AUTH
    loginUrl:"Auth/Login",
    Signup: "Auth/RegisterOrgAdmin",
    OrgUserSignup: "Auth/RegisterOrgUsers",

    //License
    AssignLicense: "License/AssignLicense",
    GetLicenseOfTenant: "License/GetLicenseOfTenant",
    UpdateLicenseOfTenant: "License/UpdateLicenseOfTenant",
    DeleteLicenseOfTenant: "License/DeleteLicenseOfTenant",

    //Organization
    CreateOrganization: "Organisation/CreateOrganization",
    DeleteOrganization: "Organisation/DeleteOrganization",
    GetAllOrganizations: "Organisation/GetAllOrganizations",
    GetOrganizationById: "Organisation/GetOrganizationById",
    UpdateOrganization: "Organisation/UpdateOrganization",
    UpdateTenantOrganization: "Organisation/UpdateTenantOrganization",

    //Projects
    CreateProject:"Project/CreateProject",
    GetProjectById: "Project/GetProjectById",
    GetAllProjects: "Project/GetAllProjects",
    GetAllOrgProjects: "Project/GetAllOrgProjects",
    UpdateProject : "Project/UpdateProject",
    DeleteProject : "Project/DeleteProject",
    GenerateProjectKey : "Project/GenerateProjectKey",

    //Statistics
    GetAllRequestOfUser: "Statistics/GetAllRequestOfUser",
    GetAllRequestCountOfUser: "Statistics/GetAllRequestCountOfUser",
    GetAllRequestCountOfProject: "Statistics/GetAllRequestCountOfProject",
    GetAllRequestsOfProject: "Statistics/GetAllRequestsOfProject",
    GetHourlyStats: "Statistics/GetHourlyStats",
    GetDailyStats: "Statistics/GetDailyStats",
    GetMonthlyStats: "Statistics/GetMonthlyStats",
    GetYearlyStats: "Statistics/GetYearlyStats",
    GetWeeklyStats: "Statistics/GetWeeklyStats",

    //Tier
    CreateTier: "Tier/CreateTier",
    GetAllTier: "Tier/GetAllTier",
    GetTierById: "Tier/GetTierById",
    UpdateTier: "Tier/UpdateTier",
    DeleteTier: "Tier/DeleteTier",

    //User
    GetAllUsers: "User/GetAllUsers",
    GetAllOrgUsers: "User/GetAllOrgUsers",
    GetUserById: "User/GetUserById",
    UpdateUser: "User/UpdateUser",
    UpdateTenantUser: "User/UpdateTenantUser", //only username
    DeleteUser: "User/DeleteUser"

}
export {Urls}