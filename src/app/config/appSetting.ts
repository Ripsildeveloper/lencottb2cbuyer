import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3002/',
    local3021CrmServiceUrl: 'http://localhost:3002/',
    serviceUrl: environment.serviceUrl,
    /* serviceUrl: 'http://lencott.com/service/', */
    /* serviceUrl: 'https://rinteger.com/adminservice/' */
    productImageUrl: 'http://localhost/Lencott/products/',
    /* productImageUrl: 'http://lencott.com/admin/images/product/' */
};
