!function(e){"function"==typeof define&&define.amd?define(["angular","spinjs"],e):"object"==typeof exports?e(require("angular"),require("spinjs")):e(window.angular,window.Spinner)}(function(e,t){"use strict";function n(t){var i=!1,l=1;return"boolean"==typeof t&&(i=t,t=arguments[1]||{},l++),e.forEach([].slice.call(arguments,l),function(l){var o,a,r,s,u;for(s in l)u=t[s],r=l[s],t!==r&&(i&&r&&(e.isObject(r)||(o=e.isArray(r)))?(a=o?u&&e.isArray(u)?u:[]:u&&e.isObject(u)?u:{},t[s]=n(i,a,r)):void 0!==r&&(t[s]=r))}),t}e.module("darthwade.loading",[]).value("loadingOptions",{active:!1,text:"Loading...",className:"",overlay:!0,spinner:!0,spinnerOptions:{lines:12,length:7,width:4,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:2,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"dw-spinner",top:"auto",left:"auto",position:"relative"}}).service("$loading",["$rootScope","loadingOptions",function(e,t){var i=this;i.setDefaultOptions=function(e){n(!0,t,e)},i.start=function(t){e.$evalAsync(function(){e.$broadcast("$loadingStart",t)})},i.update=function(t,n){e.$evalAsync(function(){e.$broadcast("$loadingUpdate",t,n)})},i.finish=function(t){e.$evalAsync(function(){e.$broadcast("$loadingFinish",t)})}}]).directive("dwLoading",["$rootScope","loadingOptions",function(i,l){return{link:function(o,a,r){var s,u,c,d,p,f=null,h=r.dwLoading||!1,g=function(){u&&u.addClass("dw-loading-active"),f&&f.spin(d[0])},m=function(i,o){v(),s=n(!0,{},l,i),c=e.element("<div></div>").addClass("dw-loading-body"),u=e.element("<div></div>").addClass("dw-loading").append(c),s.overlay&&u.addClass("dw-loading-overlay"),s.className&&u.addClass(s.className),s.spinner&&(d=e.element("<div></div>").addClass("dw-loading-spinner"),c.append(d),f=new t(s.spinnerOptions)),s.text&&(p=e.element("<div></div>").addClass("dw-loading-text").text(s.text),c.append(p)),a.append(u),(s.active||!h||o)&&g()},v=function(){u&&u.removeClass("dw-loading-active"),f&&f.stop()};o.$watch(r.dwLoadingOptions,function(e){m(e)},!0),i.$on("$loadingStart",function(e,t){t===h&&g()}),i.$on("$loadingUpdate",function(e,t,n){t===h&&m(n,!0)}),i.$on("$loadingFinish",function(e,t){t===h&&v()}),o.$on("$destroy",function(){v(),f=null})}}}])}),function(e){var t={up:38,down:40,left:37,right:39,escape:27,enter:13,backspace:8,"delete":46,shift:16,leftCmd:91,rightCmd:93,ctrl:17,alt:18,tab:9},n=function(){function n(e){return e instanceof HTMLElement?e.ownerDocument&&e.ownerDocument.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e):window.getComputedStyle(e):{}}function i(e,t,n,i,l){this.restrict="EAC",this.replace=!0,this.transclude=!0,this.scope={name:"@?",value:"=model",disabled:"=?disable",multiple:"=?multi",placeholder:"@?",valueAttr:"@",labelAttr:"@?",groupAttr:"@?",options:"=?",create:"&?",rtl:"=?",api:"=?",change:"&?",remote:"=?",remoteParam:"@?",removeButton:"=?",viewItemTemplate:"=?",dropdownItemTemplate:"=?",dropdownGroupTemplate:"=?"},this.templateUrl="selector/selector.html",$filter=e,$timeout=t,$window=n,$http=i,$q=l}return i.prototype.$inject=["$filter","$timeout","$window","$http","$q"],i.prototype.link=function(i,l,o,a,r){r(i,function(i,a){var r=e.element(l[0].querySelector(".selector-input input")),s=e.element(l[0].querySelector(".selector-dropdown")),u=$q.defer(),c={api:{},selectedValues:[],highlighted:0,valueAttr:null,labelAttr:"label",groupAttr:"group",options:[],remoteParam:"q",removeButton:!0,viewItemTemplate:"selector/item-default.html",dropdownItemTemplate:"selector/item-default.html",dropdownGroupTemplate:"selector/group-default.html"};e.isDefined(a.value)||(a.value=a.multiple?[]:""),e.forEach(c,function(t,n){e.isDefined(a[n])||(a[n]=t)}),e.forEach(["name","valueAttr","labelAttr"],function(e){o[e]||(o[e]=a[e])}),a.optionValue=function(e){return null==a.valueAttr?e:e[a.valueAttr]},a.optionEquals=function(t,n){return e.equals(a.optionValue(t),e.isDefined(n)?n:a.value)},a.setValue=function(e){a.multiple?a.value=null==a.valueAttr?e||[]:(e||[]).map(function(e){return e[a.valueAttr]}):a.value=null==a.valueAttr?e||{}:(e||{})[a.valueAttr]},a.hasValue=function(){return a.multiple?(a.value||[]).length>0:null==a.valueAttr?!e.equals({},a.value):!!a.value},a.fetch=function(){var t={method:"GET",cache:!0,params:{}};if(!e.isDefined(a.remote)||!e.isObject(a.remote))throw"Remote attribute is not an object";e.extend(t,a.remote),e.extend(t.params,a.remote.params),t.params[a.remoteParam]=a.search||"",a.loading=!0,a.options=[],$http(t).then(function(e){a.options=e.data,a.filterSelected(),a.loading=!1,u.resolve()},function(){throw a.loading=!1,u.reject(),"Error while fetching data"})},e.isDefined(a.remote)&&e.isObject(a.remote)||(a.remote=!1,u.resolve()),a.remote&&a.$watch("search",a.fetch),a.optionToObject=function(t,n){var i={},l=e.element(t);e.forEach(t.dataset,function(e,t){t.match(/^\$/)||(i[t]=e)}),t.value&&(i[a.valueAttr||"value"]=t.value),l.text()&&(i[a.labelAttr]=l.text().trim()),e.isDefined(n)&&(i[a.groupAttr]=n),a.options.push(i),!l.attr("selected")||!a.multiple&&a.hasValue()||(a.multiple?(a.value||(a.value=[]),a.value.push(a.optionValue(i))):a.value||(a.value=a.optionValue(i)))},a.fillWithHtml=function(){a.options=[],e.forEach(i,function(t){var n=(t.tagName||"").toLowerCase();"option"==n&&a.optionToObject(t),"optgroup"==n&&e.forEach(t.querySelectorAll("option"),function(e){a.optionToObject(e,(t.attributes.label||{}).value)})}),a.updateSelected()},a.initialize=function(){a.remote||e.isArray(a.options)&&a.options.length||a.fillWithHtml(),a.hasValue()&&(a.multiple?e.isArray(a.value)||(a.value=[a.value]):e.isArray(a.value)&&(a.value=a.value[0]),a.updateSelected(),a.filterSelected(),a.updateValue())},a.$watch("multiple",function(){$timeout(a.setInputWidth),u.promise.then(a.initialize,a.initialize)}),a.dropdownPosition=function(){var e=r.parent()[0],t=n(e),i=parseFloat(t.marginTop||0),l=parseFloat(t.marginLeft||0);parseFloat(t.marginRight||0);s.css({top:e.offsetTop+e.offsetHeight+i+"px",left:e.offsetLeft+l+"px",width:e.offsetWidth+"px"})},a.open=function(){a.isOpen=!0,a.dropdownPosition()},a.close=function(){a.isOpen=!1,a.resetInput()},a.decrementHighlighted=function(){a.highlight(a.highlighted-1),a.scrollToHighlighted()},a.incrementHighlighted=function(){a.highlight(a.highlighted+1),a.scrollToHighlighted()},a.highlight=function(e){a.filteredOptions.length&&(a.highlighted=(a.filteredOptions.length+e)%a.filteredOptions.length)},a.scrollToHighlighted=function(){var e=s[0],t=e.querySelectorAll("li.selector-option")[a.highlighted],i=n(t),l=parseFloat(i.marginTop||0),o=parseFloat(i.marginBottom||0);a.filteredOptions.length&&(t.offsetTop+t.offsetHeight+o>e.scrollTop+e.offsetHeight&&$timeout(function(){e.scrollTop=t.offsetTop+t.offsetHeight+o-e.offsetHeight}),t.offsetTop-l<e.scrollTop&&$timeout(function(){e.scrollTop=t.offsetTop-l}))},a.set=function(t){e.isDefined(t)||(t=a.filteredOptions[a.highlighted]),a.multiple?a.selectedValues.indexOf(t)<0&&a.selectedValues.push(t):a.selectedValues=[t],a.multiple||a.close(),a.resetInput()},a.unset=function(t){a.multiple?a.selectedValues.splice(e.isDefined(t)?t:a.selectedValues.length-1,1):a.selectedValues=[],a.resetInput()},a.keydown=function(n){switch(n.keyCode){case t.up:if(!a.isOpen)break;a.decrementHighlighted(),n.preventDefault();break;case t.down:a.isOpen?a.incrementHighlighted():a.open(),n.preventDefault();break;case t.escape:a.highlight(0),a.close();break;case t.enter:if(a.isOpen){if(a.filteredOptions.length)a.set();else if(o.create){var i={};e.isFunction(a.create)?i=a.create({input:n.target.value}):(i[a.labelAttr]=n.target.value,i[a.valueAttr||"value"]=n.target.value),a.options.push(i),a.set(i)}n.preventDefault()}break;case t.backspace:r.val()||(a.unset(),a.open());break;case t.left:case t.right:case t.shift:case t.ctrl:case t.alt:case t.tab:case t.leftCmd:case t.rightCmd:break;default:!a.multiple&&a.hasValue()?n.preventDefault():(a.open(),a.highlight(0))}},a.inOptions=function(t,n){return a.remote?t.filter(function(t){return e.equals(n,t)}).length>0:t.indexOf(n)>=0},a.filterSelected=function(){a.filteredOptions=$filter("filter")(a.options||[],a.search),a.multiple&&(a.filteredOptions=a.filteredOptions.filter(function(t){var n=e.isArray(a.selectedValues)?a.selectedValues:[a.selectedValues];return!a.inOptions(n,t)})),a.highlighted>=a.filteredOptions.length&&a.highlight(a.filteredOptions.length-1)},a.measureWidth=function(){var t,i=n(r[0]),l=e.element('<span class="selector-shadow"></span>');return l.text(r.val()||(a.hasValue()?"":a.placeholder)||""),e.element(document.body).append(l),e.forEach(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],function(e){l.css(e,i[e])}),t=l[0].offsetWidth,l.remove(),t},a.setInputWidth=function(){var e=a.measureWidth()+1;r.css("width",e+"px")},a.resetInput=function(){r.val(""),a.search="",a.setInputWidth()},a.$watch("[search, options, value]",function(){a.setInputWidth(),a.filterSelected(),a.isOpen&&$timeout(a.dropdownPosition)},!0),a.updateValue=function(t){e.isDefined(t)||(t=a.selectedValues),a.setValue(a.multiple?t:t[0])},a.$watch("selectedValues",function(t,n){e.equals(t,n)||(a.updateValue(),e.isFunction(a.change)&&a.change(a.multiple?{newValue:t,oldValue:n}:{newValue:t[0],oldValue:n[0]}))},!0),a.$watch("options",function(t,n){e.equals(t,n)||a.remote||a.updateSelected()}),a.updateSelected=function(){a.multiple?a.selectedValues=(a.value||[]).map(function(e){return $filter("filter")(a.options,function(t){return a.optionEquals(t,e)})[0]}).filter(function(t){return e.isDefined(t)}):a.selectedValues=(a.options||[]).filter(function(e){return a.optionEquals(e)}).slice(0,1)},a.$watch("value",function(t,n){e.equals(t,n)||a.remote||a.updateSelected()},!0),r.on("focus",function(){$timeout(function(){a.$apply(a.open)})}).on("blur",function(){a.$apply(a.close)}).on("keydown",function(e){a.$apply(function(){a.keydown(e)})}).on("input",function(){a.setInputWidth()}),s.on("mousedown",function(e){e.preventDefault()}),e.element($window).on("resize",function(){a.dropdownPosition()}),e.forEach(["open","close","fetch"],function(e){a.api[e]=a[e]}),a.api.focus=function(){r[0].focus()},a.api.set=function(t){var n=(a.filteredOptions||[]).filter(function(e){return a.optionEquals(e,t)});e.forEach(n,function(e){a.set(e)})},a.api.unset=function(t){var n=t?(a.selectedValues||[]).filter(function(e){return a.optionEquals(e,t)}):a.selectedValues;indexes=a.selectedValues.map(function(e,t){return a.inOptions(n,e)?t:-1}).filter(function(e){return e>=0}),e.forEach(indexes,function(e,t){a.unset(e-t)})}})},i}();e.module("selector",[]).run(["$templateCache",function(e){e.put("selector/selector.html",'<div class="selector-container" ng-attr-dir="{{rtl ? \'rtl\' : \'ltr\'}}" ng-class="{open: isOpen, empty: !filteredOptions.length && (!create || !search), multiple: multiple, \'has-value\': hasValue(), rtl: rtl, loading: loading, \'remove-button\': removeButton, disabled: disabled}"><select name="{{name}}" ng-hide="true" ng-model="selectedValues" multiple ng-options="option as option[labelAttr] for option in selectedValues" ng-hide="true"></select><label class="selector-input"><ul class="selector-values"><li ng-repeat="(index, option) in selectedValues track by index"><div ng-include="viewItemTemplate"></div><div ng-if="multiple" class="selector-helper" ng-click="!disabled && unset(index)"><span class="selector-icon"></span></div></li></ul><input ng-model="search" placeholder="{{!hasValue() ? placeholder : \'\'}}" ng-disabled="disabled"><div ng-if="!multiple || loading" class="selector-helper selector-global-helper" ng-click="!disabled && removeButton && unset()"><span class="selector-icon"></span></div></label><ul class="selector-dropdown" ng-show="filteredOptions.length > 0 || (create && search)"><li class="selector-option active" ng-if="filteredOptions.length == 0">Add <i ng-bind="search"></i></li><li ng-repeat-start="(index, option) in filteredOptions track by index" class="selector-optgroup" ng-include="dropdownGroupTemplate" ng-show="option[groupAttr] && index == 0 || filteredOptions[index-1][groupAttr] != option[groupAttr]"></li><li ng-repeat-end ng-class="{active: highlighted == index, grouped: option[groupAttr]}" class="selector-option" ng-include="dropdownItemTemplate" ng-mouseover="highlight(index)" ng-click="set()"></li></ul></div>'),e.put("selector/item-default.html",'<span ng-bind="option[labelAttr] || option"></span>'),e.put("selector/group-default.html",'<span ng-bind="option[groupAttr]"></span>')}]).directive("selector",["$filter","$timeout","$window","$http","$q",function(e,t,i,l,o){return new n(e,t,i,l,o)}])}(window.angular);