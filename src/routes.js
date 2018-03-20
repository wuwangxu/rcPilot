import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import OsTablesView from './components/views/OsTables'
import ServerTablesView from './components/views/ServerTables'
import UsersView from './components/views/user/Users.vue'
import addNewView from  './components/views/user/addNew.vue'
import EditView from  './components/views/user/Edit.vue'
import UsersView from './components/views/Users.vue'
import AddServerTable from './components/views/AddServerTable'
import EditServerTable from './components/views/EditServerTable'

// Routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'users',
        alias: '',
        component: UsersView,
        name: '用户信息',
        meta: {description: ' ', requiresAuth: true}
      }, {
        path: 'addnew',
        alias: '',
        component: addNewView,
        name: 'addnew',
        // meta: {description: ' ', requiresAuth: true}
      },{
        path: 'edit',
        alias: '',
        component: EditView,
        name: 'edit',
        // meta: {description: ' ', requiresAuth: true}
      },
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment', requiresAuth: true}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot', requiresAuth: true }
      }, {
        path: 'ostables',
        component: OsTablesView,
        name: 'OsTables',
        meta: {description: 'Os table in CoPilot', requiresAuth: true }
      },{
        path: 'servertables',
        component: ServerTablesView,
        name: 'ServerTables',
        meta: {description: 'Server table in CoPilot', requiresAuth: true}
      }, {
        path: 'addservertable',
        component: AddServerTable,
        name: 'AddServerTable'
      }, {
        path: 'editservertable',
        component: EditServerTable,
        name: 'EditServerTable'
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline',  requiresAuth: true }
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page',  requiresAuth: true }
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps',  requiresAuth: true}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers',  requiresAuth: true }
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos',  requiresAuth: true   }
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
