import injector from 'vue-inject';
import { axiosInstance, store } from '@/types/dependencies.type';
import { accountApi, accountService, appsApi, appService } from '@/types/dependencies.type';

//apis
import AccountApi from '@/api/account.api';
import AppsApi from '@/api/apps.api';

//services
import AccountService from '@/services/accountService';
import AppService from '@/services/appService';

//registrations
injector.service(accountApi, [axiosInstance], AccountApi);
injector.service(appsApi, [axiosInstance], AppsApi);
injector.service(accountService, [accountApi, store], AccountService);
injector.service(appService, [appsApi, store], AppService);
