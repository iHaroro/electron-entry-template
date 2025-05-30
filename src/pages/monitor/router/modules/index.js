import { indexRoutes } from './indexRoutes.js'
import { warnModelRoutes } from './warnModelRoutes.js'
import { warnListRoutes } from './warnListRoutes.js'
import { warnStatisticsRoutes } from './warnStatisticsRoutes.js'

export const routes = [
  ...indexRoutes,
  ...warnModelRoutes,
  ...warnListRoutes,
  ...warnStatisticsRoutes
]
