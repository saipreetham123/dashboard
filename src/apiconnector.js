import { Urls } from './data';

const APIConnector = {
  Post: async function (url, data) {
    try {
      data = data || {};
      if (url && url.length > 0) {
        if (
          localStorage.getItem('accessToken') &&
          localStorage.getItem('accessToken').length > 0 &&
          url !== Urls.loginUrl
        ) {
          var authorization = 'Bearer ' + localStorage.getItem('accessToken');
        } else {
          authorization = 'Bearer Token';
        }
        var response = await fetch(Urls.baseUrl + url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8 ',
            Accept: '*/*',
            Authorization: authorization,
          },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          response = await response.json();
          if (response.data?.token && response.data?.token.length > 0) {
            localStorage.setItem('accessToken', response.data?.token);
            if (response.data?.user.id && response.data?.user.id.length > 0) {
              localStorage.setItem('userId',response.data?.user.id);
            }
            if(response.data?.user.orgId && response.data?.user.orgId.length > 0){
              localStorage.setItem('OrgId', response.data?.user.orgId);
            }
            if(response.data?.user.role && response.data?.user.role.length > 0){
              localStorage.setItem('role', response.data?.user.role);
            }
            //$('.loader').hide();
            return response;
          } 
          else if (!response.isFailure) {
            //$('.loader').hide();
            return response;
          } 
          else {
            window.location.reload();
          }
        } else if (400 <= response.status <= 499) {
          //$('.loader').hide();
          return response.json();
        }
      }
    } catch (error) {
      //$('.loader').hide();
      console.log(error);
      return error;
    }
  },
};
export default APIConnector;
