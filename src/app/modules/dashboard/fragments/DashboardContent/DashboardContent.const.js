import filter from 'lodash/filter';

const Path = '/dashboard/';

export function data(
  isAdmin,
  isSuperAdmin,
  users,
  teams,
  charts,
  dataSets,
  focusPages
) {
  const tabs = [
    {
      label: 'Charts',
      path: `${Path}charts`,
      count: charts.length
    },
    {
      label: 'Data sets',
      path: `${Path}data-sets`,
      count: dataSets.length
    },
    {
      label: 'Focus pages',
      path: `${Path}focus-pages`,
      count: 0
    },
    {
      label: 'Users',
      path: `${Path}users`,
      count: users.length,
      adminOnly: true
    },
    {
      label: 'Teams',
      path: `${Path}teams`,
      count: teams.length,
      superAdminOnly: true
    }
  ];

  return filter(tabs, t => {
    if (t.adminObnly) return isAdmin;
    if (t.superAdminOnly) return isSuperAdmin;
    return true;
  });
}

export default data;
