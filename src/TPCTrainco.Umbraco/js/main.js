"use strict";function TPCApp(){var t=this;this.$win=$(window),this.$aHref=$("a[href^=#]").not(".elec-sort-category"),this.$page=$("html, body"),$(".carousel").carousel(),$(".catalog-top").length&&(this.catalog=new Catalog),this.homePage=new HomePage,$("#main-search").length&&void 0==app.mainSearchSelect&&(app.mainSearchSelect=new MainSearchSelect),$("#date-range-slider").length&&(this.datePicker=new DatePicker),$("#count").length&&(this.countUp=new CountUp),$(".share-btn-wrap").length&&$('[data-toggle="popover"]').popover({animation:!0,trigger:"click",html:!0}),$(".form-standard").length&&(this.formStyles=new FormStyles),$(".register-top").length&&(this.Checkout=new Checkout,$("#reg-submit").on("click",function(t){t.preventDefault();var e=CreateFormPostString();CheckoutPost(e)})),($(".register-two").length||$(".summary-top").length)&&(this.CheckoutCustomer=new CheckoutCustomer),Modernizr.touch&&document.body.addEventListener("touchstart",function(){},!1);var e=!1,a="(-webkit-min-device-pixel-ratio: 1.5),	        (min--moz-device-pixel-ratio: 1.5),	        (-o-min-device-pixel-ratio: 3/2),	        (min-resolution: 1.5dppx)";window.devicePixelRatio>1&&(e=!0),window.matchMedia&&window.matchMedia(a).matches&&(e=!0),this.animateCart(e),this.retinaLogos(e),t.clickScrollTo();var n=window.location.hash;if(($(".course-section").length||$(".onsite").length&&n)&&t.$page.animate({scrollTop:$(n).offset().top-140},300),(n||$(".detail-page-app").length)&&"#cf-container"!=n){void 0==app.mainSearchSelect&&(app.mainSearchSelect=new MainSearchSelect);var i;i=n?app.mainSearchSelect.getHashSearchParams():app.mainSearchSelect.getSearchParams(),n?($(".detail-page-app").slideDown(),performSearch(i)):$(".empty-location-msg").hide(),$(".results").children().length||$(".empty-message").show()}$(".success").length&&app.cartNotifyView.clearCart(),$("#search-results").length&&$("body").css("background-color","#F9F9F9 !important"),$(".form-standard").length&&this.addClassToFormBtn(),"?homeref=1"==window.location.search&&t.scrollToResults(),this.$win.on("resize",function(){t.handleWindowResize()}),("/search-seminars/"==window.location.pathname||"/search-seminars"==window.location.pathname)&&this.grayBgBody(),($("body").hasClass("ie8")||$("body").hasClass("ie9"))&&this.iePlaceholders()}function Catalog(){this.$categorySelect=$(".elec-sort-category"),this.$sortItem=$(".electric .seminar-topic"),this.$countryItem=$(".seminar-topic"),this.sortElectricItems(),this.countryToggle()}function Checkout(){}function CreateFormPostString(){var t=$(".form-container"),e=t.data("cart"),a=[];$(".form-item-wrapper").each(function(){var t=$(this).data("seminar");$(this).find(".reg-form").each(function(){var e=$(this).find('input[name="attendee"]').val(),n=$(this).find('input[name="attendeeInc"]').val(),i=$(this).find('input[name="firstname"]').val(),o=$(this).find('input[name="lastname"]').val(),r=$(this).find('input[name="title"]').val(),s=$(this).find('input[name="email"]').val(),c={seminarId:t,attendeeNum:e,attendeeInc:n,firstName:i,lastName:o,title:r,email:s};a.push(c)})});var n={cartGuid:e,checkoutItems:a};return n}function CheckoutPost(t){var e=$(".checkout-err-msg"),a=$(".checkout-loader"),n=$("#reg-submit");n.css("opacity",0),a.show(),$("input").next("span").remove().css("border-color","#d7d7d7"),$.ajax({url:ApiDomain+"/api/checkout/submit",data:JSON.stringify(t),type:"POST",contentType:"application/json"}).done(function(t){var i=t.success,o=t.message;if(i)window.location.href="/register/info/";else if(e.html(o).show(),n.css("opacity",1),a.hide(),t.invalidItems.length>0)for(var r=t.invalidItems,s=0,c=r.length;c>s;s++){var l=r[s];$("#"+l.elementId).after("<span>"+l.message+"</span>"),$("#"+l.elementId).css("border-color","red")}}).fail(function(t){n.css("opacity",1).prepend('<p class="checkout-err-msg">An error occurred. Please try again later.</p>'),a.hide()})}function CheckoutCustomer(){var t=this;this.$differentInfo=$("#supervisor-diff"),this.$differentInfoFields=$(".hidden-different-check"),this.$billingOptsSelect=$("#PaymentType"),this.$ccInfo=$(".cc-info"),this.$invoiceInfo=$(".invoice-info"),this.$billingDifferent=$("#BillingDifferent"),this.$promoWrap=$(".promo-wrap"),this.$hearAbout=$("#HearAbout"),this.$promoCode=$("#PromoCode"),this.$hearAboutOther=$("#HearAboutOther"),this.DisableSelectDropdowns(),this.showPromoField(),this.showOtherInfo(),this.billingOptions(),$("#BillFirstName").val()&&(this.$differentInfoFields.slideDown("fast"),this.$billingDifferent.val("true"));var e=this.$billingOptsSelect.val();"credit"===e?(this.$ccInfo.show(),this.$invoiceInfo.hide()):"invoice"===e&&(this.$ccInfo.hide(),this.$invoiceInfo.show()),this.$promoWrap.hide(),this.$promoCode.hide(),this.$hearAboutOther.hide();var a=this.$hearAbout.val();"Direct Mail"==a||"Print Ad"===a||"Email"===a?(this.$promoWrap.show(),this.$promoCode.slideDown().addClass("showing")):("Other"==a||"Referral"==a)&&(this.$promoWrap.show(),this.$hearAboutOther.slideDown().addClass("showing")),$("#button-submit").on("click",function(){t.cardProcessingMessage($(this))})}function CountUp(){var t=this;this.$numbers=$(".number-callout").find("h3"),this.endValuesArr=[],this.getMaxVal(),this.resetVals(),setTimeout(function(){t.startCounter()},300)}function DatePicker(){var t=this,e=new Date;this.minMonth=e.getMonth();var a=e.getFullYear();e.setMonth(parseInt(this.minMonth)),e.setDate(parseInt("1")),e.setFullYear(parseInt(a));var n=15,i=new Date;this.maxMonth=i.getMonth();var o=i.getFullYear()+1;i.setMonth(parseInt(this.maxMonth+n)),i.setDate(parseInt("1")),i.setFullYear(parseInt(o));var r=new Date,s=r.getMonth(),c=r.getFullYear();r.setMonth(parseInt(s+3)),r.setDate(parseInt("1")),r.setFullYear(parseInt(c));var l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];if($(window).width()<=700)var l=["J","F","M","A","M","J","J","A","S","O","N","D"];$("#date-range-slider").dateRangeSlider({bounds:{min:new Date(e),max:new Date(i)},defaultValues:{min:new Date(e),max:new Date(r)},range:{min:{months:2}},valueLabels:"hide",step:{months:1},scales:[{first:function(t){return t},end:function(t){return t},next:function(t){var e=new Date(t);return new Date(e.setMonth(t.getMonth()+1))},label:function(t){var e=l[t.getMonth()];return"Jan"===e&&$(window).width()>=701?e+" "+t.getFullYear():l[t.getMonth()]},format:function(t,e,a){t.addClass("month-label");var n=e.getMonth(),i=l[n];"Jan"===i&&t.addClass("first")}}]}),$(window).width()>=700&&this.addYearLabel(),this.valuesChanged(this.minMonth,this.minMonth+4),setTimeout(function(){t.fixWidth(),$(window).width()>=700&&t.sizeHandle()},10)}function FormStyles(){var t=this;$(".checktheboxtoreceiveseminarinformationinthemail").find("input[type=checkbox]").on("change",function(){if($(this).is(":checked"))var e=!0;else var e=!1;t.showHideForms(e)})}function HomePage(){this.$overlay=$(".topic-circles .overlay-contain"),this.showActiveSelection()}function MainSearchSelect(){$("#main-search").select2({tags:!0,selectOnBlur:!0,maximumSelectionLength:1,dropdownAutoWidth:!0,placeholder:function(){$(this).data("placeholder")}}),window.location.hash||this.autofillLocation(),$("#main-search").on("select2:select",function(t){$("#search-btn").length&&$("#search-btn").focus(),$("#search-btn-home").length&&$("#search-btn-home").focus()}),this.styleText(),this.fillEnteredValOnBlur()}window.app=window.app||{},TPCApp.prototype.handleWindowResize=function(){$("#date-range-slider").length&&(this.datePicker=new DatePicker)},TPCApp.prototype.animateCart=function(t){var e=this;this.$carttab=$(".cart-tab"),this.$cartvis=$(".cart-visible"),this.$cartTopImg=$(".cart-top").find("img"),t&&this.$carttab.find("img").attr("src","/images/icon-cart-retina.png").css({width:"32px",top:"-15px"}),this.$carttab.on("click",function(){$(".cart").slideToggle(300,function(){$(this).toggleClass("down"),t?(e.$cartvis.toggleClass("down").find("img").attr("src","/images/icon-cart-close-arrow-2x.png"),e.$cartTopImg.attr("src","/images/icon-cart-retina.png").css({width:"32px"}),$(this).hasClass("down")||e.$carttab.find("img").attr("src","/images/icon-cart-retina.png")):(e.$cartvis.toggleClass("down").find("img").attr("src","/images/icon-cart-close-arrow.png"),$(this).hasClass("down")||(e.$cartTopImg.attr("src","/images/icon-cart-tab.png"),e.$carttab.find("img").attr("src","/images/icon-cart-tab.png")))})})},TPCApp.prototype.clickScrollTo=function(){var t=this,e=140;this.$aHref.on("click",function(a){a.preventDefault(),t.$page.animate({scrollTop:$($.attr(this,"href")).offset().top-e},300)})},TPCApp.prototype.retinaLogos=function(t){t?$("#logo").attr("src","/images/logo-trainco-2x.png").css("width","220px"):$("#logo").attr("src","/images/logo-trainco-1x.png")},TPCApp.prototype.addClassToFormBtn=function(){$(".form-standard").find(".btn").addClass("btn-reg").addClass("btn-blue-solid")},TPCApp.prototype.grayBgBody=function(){$("body").removeClass("gradient-bg")},TPCApp.prototype.scrollToResults=function(){var t=this;setTimeout(function(){t.$page.animate({scrollTop:$("#search-btn").offset().top-80},300)},500)},TPCApp.prototype.iePlaceholders=function(){$.support.placeholder=!1;var t=document.createElement("input");return"placeholder"in t?($.support.placeholder=!0,function(){}):void $('input[type="text"], input[type="email"]').each(function(){var t=$(this).attr("placeholder");$(this).val(t)}).focus(function(){var t=$(this).attr("placeholder");$(this).val()==t&&$(this).val(" ")}).blur(function(){var t=$(this).attr("placeholder");" "!=$(this).val()&&$(this).val()||$(this).val(t)})},Catalog.prototype.sortElectricItems=function(){var t=this;this.$categorySelect.on("click",function(e){e.preventDefault();var a=$(".country-toggle a").data("active-country");t.$categorySelect.parent().removeClass("current");var n=$(e.target),i=$(this).data("category");t.$sortItem.each(function(){"all"==i&&$(this).data("country")==a?($(this).fadeIn("fast").css("display","inline-block"),n.parent().addClass("current")):$(this).data("type")==i&&$(this).data("country")==a?($(this).fadeIn("fast").css("display","inline-block"),n.parent().addClass("current")):$(this).fadeOut("fast")})})},Catalog.prototype.countryToggle=function(){var t=this;$(".country-toggle a").on("click",function(e){e.preventDefault();var a=$(this).attr("data-country-sort");console.log($(".current a").data("category")),console.log($("[data-active-country]")),t.$sortItem.each(function(){console.log($(this).data("type"))}),t.$countryItem.each(function(){$(this).data("country")!=a||$(this).data("type")?$(this).data("type")==$(".current a").data("category")&&$(this).data("country")==a?$(this).fadeIn("fast").css("display","inline-block"):$(this).fadeOut("fast"):$(this).fadeIn("fast").css("display","inline-block")}),"ca"==a?$(this).fadeOut(50,function(){$(this).fadeIn(50).html('<img src="/images/icon-us-flag.png" class="flag-icon" /> Click to view U.S. seminars'),$(this).attr("data-country-sort","us").data("active-country","ca")}):$(this).fadeOut(50,function(){$(this).fadeIn(50).html('<img src="/images/icon-canada-flag.png" class="flag-icon" /> Click to view Canadian seminars'),$(this).attr("data-country-sort","ca").data("active-country","us")})})},CheckoutCustomer.prototype.DisableSelectDropdowns=function(){$("select option:first-child").attr("disabled","disabled")},CheckoutCustomer.prototype.showOtherInfo=function(){var t=this;t.$differentInfo.on("change",function(){$(this).is(":checked")?(t.$differentInfoFields.slideDown("fast"),t.$billingDifferent.val("true")):(t.$differentInfoFields.slideUp("fast"),t.$billingDifferent.val("false"))})},CheckoutCustomer.prototype.showPromoField=function(){var t=this;t.$hearAbout.on("change",function(){var e=t.$hearAbout.val();t.$promoWrap.hide(),t.$promoCode.hide(),t.$hearAboutOther.hide(),"Direct Mail"===e||"Print Ad"===e||"Email"===e||"Web search"===e?("Print Ad"==e?t.$promoCode.attr("placeholder","Promo Code"):"Web search"==e?t.$promoCode.attr("placeholder","Search Term"):t.$promoCode.attr("placeholder","Promo Code or description of mailer"),t.$promoWrap.show(),t.$promoCode.slideDown().addClass("showing")):("Other"==e||"Referral"==e)&&(t.$promoWrap.show(),t.$hearAboutOther.slideDown().addClass("showing"))})},CheckoutCustomer.prototype.billingOptions=function(){var t=this;t.$billingOptsSelect.on("change",function(){var e=$("#PaymentType").val();"credit"===e?(t.$invoiceInfo.hide(),t.$ccInfo.slideDown("fast")):"invoice"===e?(t.$ccInfo.hide(),t.$invoiceInfo.slideDown("fast")):(t.$ccInfo.slideUp("fast"),t.$invoiceInfo.slideUp("fast"))}),$(".cvv-text").on("click",function(){$(this).find("span").toggleClass("showing")})},CheckoutCustomer.prototype.cardProcessingMessage=function(t){t.fadeOut(300,function(){$(".card-loader").fadeIn(),$(".processing-msg").fadeIn().text("Order processing may take several seconds. Please wait...")}),setTimeout(function(){$(".card-loader").fadeOut(100,function(){$(".processing-msg").text("There was an error processing your order. Please try again."),t.fadeIn()})},15e3)},CountUp.prototype.getMaxVal=function(){var t=this;$(".number-callout").find("h3").each(function(e){var a=parseInt($(this).data("value").toString().replace(/\D/g,""));t.endValuesArr.push(a)})},CountUp.prototype.resetVals=function(){this.$numbers[0].innerHTML="-",this.$numbers[1].innerHTML="-",this.$numbers[2].innerHTML="-"},CountUp.prototype.startCounter=function(){function t(){var s=a.endValuesArr[i];o++,a.$numbers[i].innerHTML=0===i?o+"K+":2===i?o+"+":o+"K+",o===s&&(i++,r++,o=0,clearInterval(e),n>=i&&(e=setInterval(t,6))),3==r&&window.clearInterval(e)}var e,a=this,n=this.endValuesArr.length,i=0,o=0,r=0;e=setInterval(t,8)},DatePicker.prototype.addYearLabel=function(){$(".first").css({"line-height":1.27,marginTop:"-7px",position:"relative",top:"8px",height:"42px"}).find(".ui-ruler-tick-label").css({display:"inline-block",width:"84%"})},DatePicker.prototype.sizeHandle=function(){var t=$($(".ui-ruler-tick-inner")[0]).outerWidth();$(".ui-rangeSlider-handle").css("width",t+"px")},DatePicker.prototype.valuesChanged=function(t,e){var a=$(".ui-rangeSlider-rightHandle"),n=$(".ui-rangeSlider-leftHandle"),i=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];a.text(i[this.minMonth+2]),n.text(i[this.maxMonth]),$("#date-range-slider").on("valuesChanging",function(t,e){var o=new Date(e.values.min),r=new Date(e.values.max);r.setDate(r.getDate()-1),o.setDate(o.getDate());var s=i[r.getMonth()],c=i[o.getMonth()];a.text(s),n.text(c)}),$("#date-range-slider").on("valuesChanged",function(t,e){var o=new Date(e.values.min),r=new Date(e.values.max);r.setDate(r.getDate()-1),o.setDate(o.getDate());var s=i[r.getMonth()],c=i[o.getMonth()];a.text(s),n.text(c)})},DatePicker.prototype.fixWidth=function(){var t=$(".ui-rangeSlider-container").width();$(".ui-rangeSlider-innerBar").css("width",t+"px")},FormStyles.prototype.showHideForms=function(t){$(".mailingaddress, .mailingaddressline2, .city, .stateprovince, .postalcode, .country").find("input[type=text], label, select").toggle(t)},HomePage.prototype.showActiveSelection=function(){Modernizr.touch?this.$overlay.on("touchstart",function(){var t=$(this);t.hasClass("chosen")?t.removeClass("chosen").addClass("touch"):t.addClass("chosen").removeClass("touch")}):this.$overlay.on("click",function(){var t=$(this);t.hasClass("chosen")?t.removeClass("chosen"):t.addClass("chosen")})},window.app=window.app||{},MainSearchSelect.prototype.getSearchParams=function(){var t=[],e=0,a=$("#main-search").select2("val");if($('.secondary-search[data-classid!=""][data-classid]')&&(e=$(".secondary-search").data("classid")),null==a)return $(".empty-location-msg").fadeIn(150).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1),void $(".class-loader").fadeOut(150);var n=$("#main-search").select2("val").toString();$(".empty-location-msg").fadeOut(150),$(".chosen").each(function(){var e=$(this).data("topic");"all"===e?t.push("electrical","management","hvac","mechanical"):t.push(e)}),0==t.length&&t.push("electrical","management","hvac","mechanical");var i=$("#date-range-slider").dateRangeSlider("values"),o=new Date(i.min),r=o.getMonth()+1,s=o.getFullYear(),c=new Date(i.max),l=c.getMonth()+1,h=c.getFullYear();return this.updateHashBang(n,t,r+"/"+s,l+"/"+h),app.resStringified=this.generateJsonSearchString(n,t,e,r,s,l,h),app.resStringified},MainSearchSelect.prototype.getHashSearchParams=function(){var t=this.processHashBang();if(t.hasOwnProperty("loc")||t.hasOwnProperty("topics")){$(".detail-page-app").show();var e=[],a=0,n="";e=t.topics.split(","),n=unescape(t.loc),this.autofillLocation(n);var i=t.dMin.split("/"),o=i[0],r=i[1],s=t.dMax.split("/"),c=s[0],l=s[1],h=new Date(parseInt(r),parseInt(o)-1),d=new Date(parseInt(l),parseInt(c)-1);if($(document).ready(function(){$("#date-range-slider").dateRangeSlider("values",h,d)}),void 0!=e&&4==e.length)$('.overlay-contain[data-topic="all"]').addClass("chosen");else for(var p in e)$('.overlay-contain[data-topic="'+e[p]+'"]').addClass("chosen");return $('.secondary-search[data-classid!=""][data-classid]')&&(a=parseInt($(".secondary-search").data("classid"))),app.resStringified=this.generateJsonSearchString(n,e,a,o,r,c,l),app.resStringified}return $(".detail-page-app").hide(),!1},MainSearchSelect.prototype.generateJsonSearchString=function(t,e,a,n,i,o,r){var s,c,l={minMonthVal:n,minYearVal:i},h={maxMonthVal:o,maxYearVal:r},d={min:l,max:h};return c=a>0?{location:t,classId:a,dates:d}:{location:t,classTopics:e,dates:d},s=JSON.stringify(c)},MainSearchSelect.prototype.autofillLocation=function(t){if(t)$("#main-search").prepend('<option value="'+t+'" selected>'+t+"</option>").trigger("change");else{var e=$("#main-search").data("location");if("undefined"==e||""==e)return!1;$("#main-search").prepend('<option value="'+e+'" selected>'+e+"</option>").trigger("change")}},MainSearchSelect.prototype.processHashBang=function(){for(var t=window.location.href,e={},a=t.slice(t.indexOf("#")+1).split("&"),n=0;n<a.length;n++){var i=a[n].split("=");e[i[0]]=i.length>1?i[1]:null}return e},MainSearchSelect.prototype.updateHashBang=function(t,e,a,n){var i="loc="+(escape(t)||"")+"&topics="+(e.toString()||"")+"&dMin="+(a||"")+"&dMax="+(n||"");window.location.hash=i},MainSearchSelect.prototype.detailPageSearch=function(){var t=$("#main-search").data("location"),e=$(".secondary-search").data("classid");return{location:t,classId:e}},MainSearchSelect.prototype.styleText=function(){$("#main-search").on("select2:open",function(t){setTimeout(function(){$($(".select2-results__group")[0]).css({borderTop:"1px dashed #3E3E3E",padding:"10px"})},1)})},MainSearchSelect.prototype.fillEnteredValOnBlur=function(){var t="",e=$("#main-search");$(document).on("keyup",".select2-search__field",function(){t=$(this).val()}),e.on("select2:close",function(a){var n=t;!$(this).val()&&t.length&&(e.prepend('<option data-temp-item="true" value="'+t+'" selected>'+t+"</option>").trigger("change"),t="",$('[data-temp-item="true"]').remove(),e.val(n).trigger("change"))})};