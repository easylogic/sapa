import{objectSpread2 as r}from"./_virtual/_rollupPluginBabelHelpers.js";import e from"./BaseStore.js";import o from"./functions/Dom.js";import"./Event.js";import"./EventMachine.js";import"./functions/func.js";var t=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=o.create(n.container||document.body),s=new t(n,r(r({},n),{},{store:n.store||new e}));return s.render(i),s};export{t as start};