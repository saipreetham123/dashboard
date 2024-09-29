
const AllRoutes = [
    { path: "/", element: "Login", Roles: "ORGADMIN" },
    { path: "/forgotpassword", element: "Forgotpassword", Roles: "ORGADMIN" },
    { path: "/dashboard", element: "Home", Roles: "ORGADMIN, ORGUSER, SUPERADMIN" },
    { path: "/dashboard/projects", element: "Projects", Roles: "ORGADMIN" },
    { path: "/dashboard/users", element: "Users", Roles: "ORGADMIN" },
    { path: "/dashboard/organizations", element: "organizations", Roles: "SUPERADMIN" },
    { path: "/dashboard/tiers", element: "Tiers", Roles: "SUPERADMIN" },
];
export default AllRoutes;
