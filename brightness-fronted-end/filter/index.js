import angular from 'angular'

import roleCodeChanged from './roleCodeChanged'
import textWrapper from './textWrapper'
import replaceEmptyText from './replaceEmptyText'
import roleCategoryMapping from './roleCategoryMapping'
import projectStatusMapping from './projectStatusMapping'
import startFrom from './startFrom'
import arrayReplaceToString from './arrayReplaceToString'

export default angular
  .module('HNA.GUANGMINGXING.filters', [])
  .filter('roleCodeChanged', roleCodeChanged)
  .filter('textWrapper', textWrapper)
  .filter('replaceEmptyText', replaceEmptyText)
  .filter('roleCategoryMapping', roleCategoryMapping)
  .filter('projectStatusMapping', projectStatusMapping)
  .filter('startFrom', startFrom)
  .filter('arrayReplaceToString', arrayReplaceToString)
