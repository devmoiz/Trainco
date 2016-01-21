"use strict";function TPCApp(){var e=this;this.$win=$(window),this.$aHref=$("a[href*=#]").not(".elec-sort-category"),this.$page=$("html, body"),$(".carousel").carousel(),$(".catalog-top").length&&(this.catalog=new Catalog),this.homePage=new HomePage,$("#main-search").length&&void 0==app.mainSearchSelect&&(app.mainSearchSelect=new MainSearchSelect),$("#date-range-slider").length&&(this.datePicker=new DatePicker),$("#count").length&&(this.countUp=new CountUp),$(".share-btn-wrap").length&&$('[data-toggle="popover"]').popover({animation:!0,trigger:"click",html:!0}),$(".form-standard").length&&(this.formStyles=new FormStyles),$(".register-top").length&&(this.Checkout=new Checkout,$("#reg-submit").on("click",function(e){e.preventDefault();var t=CreateFormPostString();CheckoutPost(t)})),($(".register-two").length||$(".summary-top").length)&&(this.CheckoutCustomer=new CheckoutCustomer),Modernizr.touch&&document.body.addEventListener("touchstart",function(){},!1);var t=!1,a="(-webkit-min-device-pixel-ratio: 1.5),	        (min--moz-device-pixel-ratio: 1.5),	        (-o-min-device-pixel-ratio: 3/2),	        (min-resolution: 1.5dppx)";window.devicePixelRatio>1&&(t=!0),window.matchMedia&&window.matchMedia(a).matches&&(t=!0),this.animateCart(t),this.retinaLogos(t),this.clickScrollTo();var n=window.location.hash;if(($(".course-section").length||$(".onsite").length&&n)&&e.$page.animate({scrollTop:$(n).offset().top-140},300),(n||$(".detail-page-app").length)&&"#cf-container"!=n){void 0==app.mainSearchSelect&&(app.mainSearchSelect=new MainSearchSelect);var i;i=n?app.mainSearchSelect.getHashSearchParams():app.mainSearchSelect.getSearchParams(),n?($(".detail-page-app").slideDown(),performSearch(i)):$(".empty-location-msg").hide(),$(".results").children().length||$(".empty-message").show()}$(".success").length&&app.cartNotifyView.clearCart(),$("#search-results").length&&$("body").css("background-color","#F9F9F9 !important"),$(".form-standard").length&&this.addClassToFormBtn(),this.$win.on("resize",function(){e.handleWindowResize()}),("/search-seminars/"==window.location.pathname||"/search-seminars"==window.location.pathname)&&this.grayBgBody(),($("body").hasClass("ie8")||$("body").hasClass("ie9"))&&this.iePlaceholders()}function Catalog(){this.$categorySelect=$(".elec-sort-category"),this.$sortItem=$(".electric .seminar-topic"),this.$countryItem=$(".seminar-topic"),this.sortElectricItems(),this.countryToggle()}function Checkout(){}function CreateFormPostString(){var e=$(".form-container"),t=e.data("cart"),a=[];$(".form-item-wrapper").each(function(){var e=$(this).data("seminar");$(this).find(".reg-form").each(function(){var t=$(this).find('input[name="attendee"]').val(),n=$(this).find('input[name="attendeeInc"]').val(),i=$(this).find('input[name="firstname"]').val(),o=$(this).find('input[name="lastname"]').val(),r=$(this).find('input[name="title"]').val(),s=$(this).find('input[name="email"]').val(),c={seminarId:e,attendeeNum:t,attendeeInc:n,firstName:i,lastName:o,title:r,email:s};a.push(c)})});var n={cartGuid:t,checkoutItems:a};return n}function CheckoutPost(e){var t=$(".checkout-err-msg"),a=$(".checkout-loader"),n=$("#reg-submit");n.css("opacity",0),a.show(),$("input").next("span").remove().css("border-color","#d7d7d7"),$.ajax({url:ApiDomain+"/api/checkout/submit",data:JSON.stringify(e),type:"POST",contentType:"application/json"}).done(function(e){var i=e.success,o=e.message;if(i)window.location.href="/register/info/";else if(t.html(o).show(),n.css("opacity",1),a.hide(),e.invalidItems.length>0)for(var r=e.invalidItems,s=0,c=r.length;c>s;s++){var l=r[s];$("#"+l.elementId).after("<span>"+l.message+"</span>"),$("#"+l.elementId).css("border-color","red")}}).fail(function(e){n.css("opacity",1).prepend('<p class="checkout-err-msg">An error occurred. Please try again later.</p>'),a.hide()})}function CheckoutCustomer(){var e=this;this.$differentInfo=$("#supervisor-diff"),this.$differentInfoFields=$(".hidden-different-check"),this.$billingOptsSelect=$("#PaymentType"),this.$ccInfo=$(".cc-info"),this.$invoiceInfo=$(".invoice-info"),this.$billingDifferent=$("#BillingDifferent"),this.$promoWrap=$(".promo-wrap"),this.$hearAbout=$("#HearAbout"),this.$promoCode=$("#PromoCode"),this.$hearAboutOther=$("#HearAboutOther"),this.DisableSelectDropdowns(),this.showPromoField(),this.showOtherInfo(),this.billingOptions(),$("#BillFirstName").val()&&(this.$differentInfoFields.slideDown("fast"),this.$billingDifferent.val("true"));var t=this.$billingOptsSelect.val();"credit"===t?(this.$ccInfo.show(),this.$invoiceInfo.hide()):"invoice"===t&&(this.$ccInfo.hide(),this.$invoiceInfo.show()),this.$promoWrap.hide(),this.$promoCode.hide(),this.$hearAboutOther.hide();var a=this.$hearAbout.val();"Direct Mail"==a||"Print Ad"===a||"Email"===a?(this.$promoWrap.show(),this.$promoCode.slideDown().addClass("showing")):("Other"==a||"Referral"==a)&&(this.$promoWrap.show(),this.$hearAboutOther.slideDown().addClass("showing")),$("#button-submit").on("click",function(){e.cardProcessingMessage($(this))})}function CountUp(){var e=this;this.$numbers=$(".number-callout").find("h3"),this.endValuesArr=[],this.getMaxVal(),this.resetVals(),setTimeout(function(){e.startCounter()},300)}function DatePicker(){var e=this,t=new Date;t=new Date(t.getFullYear(),t.getMonth(),1),this.minMonth=t.getMonth();var a=15,n=new Date(new Date(t).setMonth(t.getMonth()+a));n=new Date(n.getFullYear(),n.getMonth(),1),this.maxMonth=n.getMonth();var i=new Date(new Date(t).setMonth(t.getMonth()+3)),o=new Date(new Date(t)),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];if($(window).width()<=700)var r=["J","F","M","A","M","J","J","A","S","O","N","D"];$("#date-range-slider").dateRangeSlider({bounds:{min:new Date(t),max:new Date(n)},defaultValues:{min:new Date(o),max:new Date(i)},range:{min:{months:2}},valueLabels:"hide",step:{months:1},scales:[{first:function(e){return e},end:function(e){return e},next:function(e){var t=new Date(e);return new Date(t.setMonth(e.getMonth()+1))},label:function(e){var t=r[e.getMonth()];return"Jan"===t&&$(window).width()>=701?t+" "+e.getFullYear():r[e.getMonth()]},format:function(e,t,a){e.addClass("month-label");var n=t.getMonth(),i=r[n];"Jan"===i&&e.addClass("first")}}]}),$(window).width()>=700&&this.addYearLabel(),this.valuesChanged(this.minMonth,this.maxMonth),setTimeout(function(){e.fixWidth(),$(window).width()>=700&&e.sizeHandle()},10)}function FormStyles(){var e=this;$(".checktheboxtoreceiveseminarinformationinthemail").find("input[type=checkbox]").on("change",function(){if($(this).is(":checked"))var t=!0;else var t=!1;e.showHideForms(t)})}function HomePage(){this.$overlay=$(".topic-circles .overlay-contain"),this.showActiveSelection()}function MainSearchSelect(){$("#main-search").select2({tags:!0,selectOnBlur:!0,maximumSelectionLength:1,dropdownAutoWidth:!0,placeholder:function(){$(this).data("placeholder")}}),window.location.hash||this.autofillLocation(),this.styleText(),this.fillEnteredValOnBlur(),$("#main-search").hide()}window.app=window.app||{},TPCApp.prototype.handleWindowResize=function(){$("#date-range-slider").length&&(this.datePicker=new DatePicker)},TPCApp.prototype.clickScrollTo=function(){var e=this,t=140;this.$aHref.on("click",function(a){"#"===$(this).attr("href")[0]&&(a.preventDefault(),e.$page.animate({scrollTop:$($.attr(this,"href")).offset().top-t},300))})},TPCApp.prototype.animateCart=function(e){var t=this;this.$carttab=$(".cart-tab"),this.$cartvis=$(".cart-visible"),this.$cartTopImg=$(".cart-top").find("img"),e&&this.$carttab.find("img").attr("src","/images/icon-cart-retina.png").css({width:"32px",top:"-15px"}),this.$carttab.on("click",function(){$(".cart").slideToggle(300,function(){$(this).toggleClass("down"),e?(t.$cartvis.toggleClass("down").find("img").attr("src","/images/icon-cart-close-arrow-2x.png"),t.$cartTopImg.attr("src","/images/icon-cart-retina.png").css({width:"32px"}),$(this).hasClass("down")||t.$carttab.find("img").attr("src","/images/icon-cart-retina.png")):(t.$cartvis.toggleClass("down").find("img").attr("src","/images/icon-cart-close-arrow.png"),$(this).hasClass("down")||(t.$cartTopImg.attr("src","/images/icon-cart-tab.png"),t.$carttab.find("img").attr("src","/images/icon-cart-tab.png")))})})},TPCApp.prototype.retinaLogos=function(e){e?$("#logo").attr("src","/images/logo-trainco-2x.png").css("width","220px"):$("#logo").attr("src","/images/logo-trainco-1x.png")},TPCApp.prototype.addClassToFormBtn=function(){$(".form-standard").find(".btn").addClass("btn-reg").addClass("btn-blue-solid")},TPCApp.prototype.grayBgBody=function(){$("body").removeClass("gradient-bg")},TPCApp.prototype.scrollToResults=function(){var e=this;setTimeout(function(){e.$page.animate({scrollTop:$("#search-btn").offset().top-80},300)},500)},TPCApp.prototype.iePlaceholders=function(){$.support.placeholder=!1;var e=document.createElement("input");return"placeholder"in e?($.support.placeholder=!0,function(){}):void $('input[type="text"], input[type="email"]').each(function(){var e=$(this).attr("placeholder");$(this).val(e)}).focus(function(){var e=$(this).attr("placeholder");$(this).val()==e&&$(this).val(" ")}).blur(function(){var e=$(this).attr("placeholder");" "!=$(this).val()&&$(this).val()||$(this).val(e)})},Catalog.prototype.sortElectricItems=function(){var e=this;this.$categorySelect.on("click",function(t){t.preventDefault();var a=$(".country-toggle a").data("active-country");e.$categorySelect.parent().removeClass("current");var n=$(t.target),i=$(this).data("category");e.$sortItem.each(function(){"all"==i&&$(this).data("country")==a?($(this).fadeIn("fast").css("display","inline-block"),n.parent().addClass("current")):$(this).data("type")==i&&$(this).data("country")==a?($(this).fadeIn("fast").css("display","inline-block"),n.parent().addClass("current")):$(this).hide()})})},Catalog.prototype.countryToggle=function(){var e=this;$(".country-toggle a").on("click",function(t){t.preventDefault();var a=$(this).attr("data-country-sort"),n=$(".current a").data("category");e.$countryItem.each(function(){var e=$(this).data("country");$(this).data("type")==n&&e==a?$(this).fadeIn("fast").css("display","inline-block"):"all"==n&&e==a?$(this).fadeIn("fast").css("display","inline-block"):void 0==$(this).data("type")&&e==a?$(this).fadeIn("fast").css("display","inline-block"):(console.log("fadeout"),$(this).hide())}),"ca"==a?$(this).fadeOut(50,function(){$(this).fadeIn(50).html('<img src="/images/icon-us-flag.png" class="flag-icon" /> Click to view U.S. seminars'),$(this).attr("data-country-sort","us").data("active-country","ca")}):$(this).fadeOut(50,function(){$(this).fadeIn(50).html('<img src="/images/icon-canada-flag.png" class="flag-icon" /> Click to view Canadian seminars'),$(this).attr("data-country-sort","ca").data("active-country","us")})})},CheckoutCustomer.prototype.DisableSelectDropdowns=function(){$("select option:first-child").attr("disabled","disabled")},CheckoutCustomer.prototype.showOtherInfo=function(){var e=this;e.$differentInfo.on("change",function(){$(this).is(":checked")?(e.$differentInfoFields.slideDown("fast"),e.$billingDifferent.val("true")):(e.$differentInfoFields.slideUp("fast"),e.$billingDifferent.val("false"))})},CheckoutCustomer.prototype.showPromoField=function(){var e=this;e.$hearAbout.on("change",function(){var t=e.$hearAbout.val();e.$promoWrap.hide(),e.$promoCode.hide(),e.$hearAboutOther.hide(),"Direct Mail"===t||"Print Ad"===t||"Email"===t||"Web search"===t?("Print Ad"==t?e.$promoCode.attr("placeholder","Promo Code"):"Web search"==t?e.$promoCode.attr("placeholder","Search Term"):e.$promoCode.attr("placeholder","Promo Code or description of mailer"),e.$promoWrap.show(),e.$promoCode.slideDown().addClass("showing")):("Other"==t||"Referral"==t)&&(e.$promoWrap.show(),e.$hearAboutOther.slideDown().addClass("showing"))})},CheckoutCustomer.prototype.billingOptions=function(){var e=this;e.$billingOptsSelect.on("change",function(){var t=$("#PaymentType").val();"credit"===t?(e.$invoiceInfo.hide(),e.$ccInfo.slideDown("fast")):"invoice"===t?(e.$ccInfo.hide(),e.$invoiceInfo.slideDown("fast")):(e.$ccInfo.slideUp("fast"),e.$invoiceInfo.slideUp("fast"))}),$(".cvv-text").on("click",function(){$(this).find("span").toggleClass("showing")})},CheckoutCustomer.prototype.cardProcessingMessage=function(e){e.fadeOut(300,function(){$(".card-loader").fadeIn(),$(".processing-msg").fadeIn().text("Order processing may take several seconds. Please wait...")}),setTimeout(function(){$(".card-loader").fadeOut(100,function(){$(".processing-msg").text("There was an error processing your order. Please try again."),e.fadeIn()})},15e3)},CountUp.prototype.getMaxVal=function(){var e=this;$(".number-callout").find("h3").each(function(t){var a=parseInt($(this).data("value").toString().replace(/\D/g,""));e.endValuesArr.push(a)})},CountUp.prototype.resetVals=function(){this.$numbers[0].innerHTML="-",this.$numbers[1].innerHTML="-",this.$numbers[2].innerHTML="-"},CountUp.prototype.startCounter=function(){function e(){var s=a.endValuesArr[i];o++,0===i?a.$numbers[i].innerHTML=o+"K+":2===i?a.$numbers[i].innerHTML=o+"+":a.$numbers[i].innerHTML=o+"K+",o===s&&(i++,r++,o=0,clearInterval(t),n>=i&&(t=setInterval(e,6))),3==r&&window.clearInterval(t)}var t,a=this,n=this.endValuesArr.length,i=0,o=0,r=0;t=setInterval(e,8)},DatePicker.prototype.addYearLabel=function(){$(".first").css({"line-height":1.27,marginTop:"-7px",position:"relative",top:"8px",height:"42px"}).find(".ui-ruler-tick-label").css({display:"inline-block",width:"84%"})},DatePicker.prototype.sizeHandle=function(){var e=$($(".ui-ruler-tick-inner")[0]).outerWidth();$(".ui-rangeSlider-handle").css("width",e+"px")},DatePicker.prototype.valuesChanged=function(e,t){var a=$(".ui-rangeSlider-rightHandle"),n=$(".ui-rangeSlider-leftHandle"),i=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];a.text(i[this.maxMonth-1]),n.text(i[this.minMonth]),$("#date-range-slider").trigger,$("#date-range-slider").on("valuesChanging",function(e,t){var o=new Date(t.values.min),r=new Date(t.values.max);r.setDate(r.getDate()-1),o.setDate(o.getDate());var s=i[r.getMonth()],c=i[o.getMonth()];a.text(s),n.text(c)}),$("#date-range-slider").on("valuesChanged",function(e,t){var o=new Date(t.values.min),r=new Date(t.values.max);r.setDate(r.getDate()-1),o.setDate(o.getDate());var s=i[r.getMonth()],c=i[o.getMonth()];a.text(s),n.text(c)})},DatePicker.prototype.fixWidth=function(){var e=$(".ui-rangeSlider-container").width();$(".ui-rangeSlider-innerBar").css("width",e+"px")},FormStyles.prototype.showHideForms=function(e){$(".mailingaddress, .mailingaddressline2, .city, .stateprovince, .postalcode, .country").find("input[type=text], label, select").toggle(e)},HomePage.prototype.showActiveSelection=function(){Modernizr.touch?this.$overlay.on("touchstart",function(){var e=$(this);e.hasClass("chosen")?e.removeClass("chosen").addClass("touch"):e.addClass("chosen").removeClass("touch")}):this.$overlay.on("click",function(){var e=$(this);e.hasClass("chosen")?e.removeClass("chosen"):e.addClass("chosen")})},window.app=window.app||{},MainSearchSelect.prototype.getSearchParams=function(){var e=[],t=0,a=$("#main-search").select2("val");if($('.secondary-search[data-classid!=""][data-classid]')&&(t=$(".secondary-search").data("classid")),null==a)return $(".empty-location-msg").fadeIn(150).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1).delay(200).fadeTo(150,.5).delay(150).fadeTo(150,1),void $(".class-loader").fadeOut(150);var n=$("#main-search").select2("val").toString();$(".empty-location-msg").fadeOut(150),$(".chosen").each(function(){var t=$(this).data("topic");"all"===t?e.push("electrical","management","hvac","mechanical"):e.push(t)}),0==e.length&&e.push("electrical","management","hvac","mechanical");var i=$("#date-range-slider").dateRangeSlider("values"),o=new Date(i.min),r=o.getMonth()+1,s=o.getFullYear(),c=new Date(i.max),l=c.getMonth()+1,h=c.getFullYear();return this.updateHashBang(n,e,r+"/"+s,l+"/"+h),app.resStringified=this.generateJsonSearchString(n,e,t,r,s,l,h),app.resStringified},MainSearchSelect.prototype.getHashSearchParams=function(){var e=this.processHashBang();if(e.hasOwnProperty("loc")||e.hasOwnProperty("topics")){$(".detail-page-app").show();var t=[],a=0,n="";t=e.topics.split(","),n=unescape(e.loc),this.autofillLocation(n);var i=e.dMin.split("/"),o=i[0],r=i[1],s=e.dMax.split("/"),c=s[0],l=s[1],h=new Date(parseInt(r),parseInt(o)-1),d=new Date(parseInt(l),parseInt(c)-1);if($(document).ready(function(){$("#date-range-slider").dateRangeSlider("values",h,d)}),void 0!=t&&4==t.length)$('.overlay-contain[data-topic="all"]').addClass("chosen");else for(var p in t)$('.overlay-contain[data-topic="'+t[p]+'"]').addClass("chosen");return $('.secondary-search[data-classid!=""][data-classid]')&&(a=parseInt($(".secondary-search").data("classid"))),app.resStringified=this.generateJsonSearchString(n,t,a,o,r,c,l),app.resStringified}return $(".detail-page-app").hide(),!1},MainSearchSelect.prototype.generateJsonSearchString=function(e,t,a,n,i,o,r){var s,c,l={minMonthVal:n,minYearVal:i},h={maxMonthVal:o,maxYearVal:r},d={min:l,max:h};return c=a>0?{location:e,classId:a,dates:d}:{location:e,classTopics:t,dates:d},s=JSON.stringify(c)},MainSearchSelect.prototype.autofillLocation=function(e){if(e)$("#main-search").prepend('<option value="'+e+'" selected>'+e+"</option>").trigger("change");else{var t=$("#main-search").data("location");if("undefined"==t||""==t)return!1;$("#main-search").prepend('<option value="'+t+'" selected>'+t+"</option>").trigger("change")}},MainSearchSelect.prototype.processHashBang=function(){for(var e=window.location.href,t={},a=e.slice(e.indexOf("#")+1).split("&"),n=0;n<a.length;n++){var i=a[n].split("=");i.length>1?t[i[0]]=i[1]:t[i[0]]=null}return t},MainSearchSelect.prototype.updateHashBang=function(e,t,a,n){var i="loc="+(escape(e)||"")+"&topics="+(t.toString()||"")+"&dMin="+(a||"")+"&dMax="+(n||"");window.location.hash=i},MainSearchSelect.prototype.detailPageSearch=function(){var e=$("#main-search").data("location"),t=$(".secondary-search").data("classid");return{location:e,classId:t}},MainSearchSelect.prototype.styleText=function(){$("#main-search").on("select2:open",function(e){setTimeout(function(){$($(".select2-results__group")[0]).css({borderTop:"1px dashed #3E3E3E",padding:"10px"})},1)})},MainSearchSelect.prototype.fillEnteredValOnBlur=function(){var e="",t=$("#main-search");$(document).on("keyup",".select2-search__field",function(){e=$(this).val()}),t.on("select2:close",function(a){var n=e;!$(this).val()&&e.length&&(t.prepend('<option data-temp-item="true" value="'+e+'" selected>'+e+"</option>").trigger("change"),e="",$('[data-temp-item="true"]').remove(),t.val(n).trigger("change"))})};