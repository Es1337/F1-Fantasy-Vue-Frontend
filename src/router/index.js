import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultsView from '../views/ResultsView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import PredictionsView from '../views/PredictionsView.vue'
import RankingView from '../views/RankingView.vue'
import AdminView from '../views/AdminView.vue'

import LoginPanel from '../components/LoginPanel.vue'
import RegisterPanel from '../components/RegisterPanel.vue'

import AddSeasonPanel from '../components/admin-panel/AddSeasonPanel.vue'
import AddRacePanel from '../components/admin-panel/AddRacePanel.vue'
import ModifyDriverPanel from '../components/admin-panel/ModifyDriverPanel.vue'
import ModifyRacePanel from '../components/admin-panel/ModifyRacePanel.vue'
import ModifyTeamPanel from '../components/admin-panel/ModifyTeamPanel.vue'
import ManageUsersPanel from '../components/admin-panel/ManageUsersPanel.vue'
import ManageAvPredictionsPanel from '../components/admin-panel/ManageAvPredictions.vue'
import ResolvePredictionsPanel from '../components/admin-panel/ResolvePredictions.vue'

import Season from '../components/admin-panel/AddSeasonPages/ASP_Season.vue'
import Races from '../components/admin-panel/AddSeasonPages/ASP_Races.vue'
import Teams from '../components/admin-panel/AddSeasonPages/ASP_Teams.vue'
import Drivers from '../components/admin-panel/AddSeasonPages/ASP_Drivers.vue'

import ViewPredictions from '../components/predictions-panel/ViewPredictions.vue'
import AddPrediction from '../components/predictions-panel/AddPrediction.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPanel
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPanel
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: ScheduleView
  },
  {
    path: '/predictions',
    name: 'predicitons',
    component: PredictionsView,
    children: [
      {
        path: '',
        name: 'view-predictions',
        component: ViewPredictions
      },
      {
        path: 'add',
        name: 'add-prediction',
        component: AddPrediction
      }
    ]
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: RankingView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
      {
        path: 'add-season',
        component: AddSeasonPanel,
        children: [
          {
            path: '',
            component: Season
          },
          {
            path: 'teams',
            name: 'add-teams',
            component: Teams
          },
          {
            path: 'drivers',
            name: 'add-drivers',
            component: Drivers
          },
          {
            path: 'races',
            name: 'add-races',
            component: Races
          },
        ]
      },
      {
        path: 'add-result',
        component: AddRacePanel
      },
      {
        path: 'manage-users',
        component: ManageUsersPanel
      },
      {
        path: 'manage-av-preds',
        component: ManageAvPredictionsPanel
      },
      {
        path: 'resolve-preds',
        component: ResolvePredictionsPanel
      },
      {
        path: 'modify-team',
        component: ModifyTeamPanel
      },
      {
        path: 'modify-driver',
        component: ModifyDriverPanel
      },
      {
        path: 'modify-race',
        component: ModifyRacePanel
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if(authRequired && !loggedIn) {
    next('login');
  }
  else {
    next();
  }
})

export default router
