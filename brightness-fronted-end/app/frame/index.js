import angular from 'angular'
import siteMenu from './components/site-menu/index'
import siteMenuMobile from './components/site-menu-mobile/index'
import OtherwiseRouts from './otherwise.routs'
import FrameRouts from './frame.routs'
import Config from './config'
import './frame.scss'

export default angular
  .module(__filename, [])
  .directive('siteMenu', siteMenu)
  .directive('siteMenuMobile', siteMenuMobile)
  .config(OtherwiseRouts)
  .config(FrameRouts)
  .run(Config)
