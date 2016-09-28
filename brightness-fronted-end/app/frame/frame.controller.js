import {reduce} from 'lodash'
import Menu from 'root/constant/menu'

function FrameController ($scope, LoginUser, ConfirmModal, Wechat, $state, CurrentProject) {
  'ngInject'

  this.toggled = false

  if (LoginUser.getToken()) {
    this.loginUserName = LoginUser.getUser().user.username
  }

  $scope.menuToggle = () => {
    this.toggled = !this.toggled
  }

  $scope.isLogin = () => {
    return LoginUser.getToken()
  }

  $scope.logout = () => {
    const options = {
      size: 'md',
      mode: 'confirm'
    }
    ConfirmModal.open('确定要退出登录么?', options).then(() => {
      CurrentProject.clear()
      LoginUser.logout()
    })
  }

  $scope.backToLogin = () => {
    $state.go('login')
  }
  $scope.$on('$stateChangeSuccess', (event, toState) => {
    const stateName = toState.name

    const findCurrentMenu = (data) => {
      return reduce(data, (prev, item) => {
        if (prev) {
          return prev
        }
        if (item.state) {
          return item.state === stateName ? item : prev
        } else if (item.subMenu) {
          return findCurrentMenu(item.subMenu)
        }
      }, null)
    }

    var currentMenu = findCurrentMenu(Menu)
    if (currentMenu) {
      $scope.currentMenu = currentMenu
      Wechat.setTitle(currentMenu.name)
    }
  })
}

export default FrameController
