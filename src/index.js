import { Router } from './core/routes/Router';
import { DashboardPage } from './pages/DashboardPage';
import './scss/index.scss';
import { ExcelPage } from './pages/ExcelPage';

// eslint-disable-next-line no-new
new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
