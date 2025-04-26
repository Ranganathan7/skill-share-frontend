export const apiEndpoints = {
  account: {
    authenticate: '/accounts/authenticate',
    create: '/accounts/create',
    get: '/accounts/get',
  },
  skill: {
    addOrUpdate: '/skills/add-update',
    get: '/skills/get',
  },
  task: {
    create: '/task/create',
    get: '/task/get',
    updateProgress: '/task/update-progress',
    updateStatus: '/task/update-status',
  },
  offer: {
    make: '/offer/make',
    get: '/offer/get',
    accept: '/offer/accept',
  },
}