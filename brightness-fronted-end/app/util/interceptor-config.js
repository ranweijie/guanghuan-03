export default function ($httpProvider) {
  'ngInject'

  $httpProvider.interceptors.push('AuthInterceptor')
  $httpProvider.interceptors.push('ErrorInterceptor')
  $httpProvider.interceptors.push('LoadingInterceptor')
}
