export default function () {
  'ngInject'

  return function (text, replaceSymbol = '\n') {
    const lineSeparator = /(:?\r\n|[\r\n]|↵|[↵])/g

    return text ? text.replace(lineSeparator, replaceSymbol) : text
  }
}
