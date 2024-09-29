import Notifications from "./messages.js";

const urls =
{
    loginUrl:"Auth/Login",
    loadAllProjectsUrl: "Project/GetAllProjects",
    editProjectUrl:"Project/ProjectUpdate",
    deleteProjectUrl : "Project/ProjectDelete",
    createProjectUrl : "Project/ProjectCreate",
    deleteProjectKeyUrl : "Project/ProjectKeyDelete",
    generateProjectKeyUrl : "Project/ProjectKeyCreate",
    projectStatsUrlMonthly: "Statistics/GetMonthlyStats",
    loadAllOrgUsersUrl: "Project/GetAllOrgUsers",
    loadAllOrganizationsUrl: "Organisation/GetAllOrganizations",
    editUsersUrl:"Project/UpdateUser",
    deleteUsersUrl : "Project/DeleteUser",
    createUsersUrl : "Auth/RegisterOrgUsers",
    Signup: "Auth/RegisterOrgAdmin",
    createUserUrl: "Auth/RegisterOrgUsers"
};


const CommonVariables = {
    urls: urls,
    ConfigData: undefined,
    getConfigData: async function () {
        if (!this.ConfigData) {
            var ConfigResponse = await fetch('./config.json');
            this.ConfigData = await ConfigResponse.json();
            return this.ConfigData;
        }
        else
            return this.ConfigData;
    },
    logout: function () {
        localStorage.clear();
        window.location.pathname = "\\";
    },
    localstorageData: {},
    setlocalStorageData: function (storageData) {
        this.localstorageData = {
            userId: localStorage.setItem('userId', storageData.userId ? storageData.userId : localStorage.getItem("userId")),
            accessToken: localStorage.setItem('accessToken', storageData.tokens.accessToken ? storageData.tokens.accessToken : localStorage.getItem("accessToken")),
            refreshToken: localStorage.setItem('refreshToken', storageData.tokens.refreshToken ? storageData.tokens.refreshToken : localStorage.getItem("refreshToken")),
            email: localStorage.setItem("email", storageData.email ? storageData.email : localStorage.getItem("email")),
            RoleName: localStorage.setItem("RoleName", storageData.RoleName ? storageData.RoleName : localStorage.getItem("RoleName"))
        }
    },
    getlocalstorageData: function () {
        return localStorage;
    },
    verifyLocalstorageDataAvailable: function () {
        let StorageData = this.getlocalstorageData();
        if (!StorageData.userId || !StorageData.accessToken || !StorageData.refreshToken || !StorageData.email) {
            return false;
        }
        return true;
    },
    factoryData: {},
    getFactoryData: function () {
        return this.factoryData;
    },
    setFactoryData: function (factoryData) {
        this.factoryData = factoryData;
    },
    isError: function (response) {
        if (response && response.isSuccess === false) {
            if (response.message)
                Notifications.ShowErrorMessage(response.message);
            else if (response.errorMessage)
                Notifications.ShowErrorMessage(response.errorMessage);
            else
                Notifications.ShowErrorMessage("Something went wrong.Please try again");
            return false;
        }
        if (response && response.status && response.status !== "200") {
            Notifications.ShowErrorMessage("Something went wrong.Please try again");
            return false;
        }
        return true;
    }
}
export default CommonVariables;