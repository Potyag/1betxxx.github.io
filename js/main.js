jQuery.fn.extend({
    unwrapInner: function(selector) {
        return this.each(function() {
            var t = this,
                c = $(t).children(selector);
            if (c.length === 1) {
                c.contents().appendTo(t);
                c.remove();
            }
        });
    }
});

$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').fadeOut('fast', function() {});
  }, 700);
});


function checkCoupons() {
		var len = $('.coupon-event-container ul li').length;
		if (len == 0) {
      // Если полозователь не авторизован
			$('.coupon-Clear').html('<div class="coupon-login">Выберите событие из списка ставок</div>');
			$('#coupon-toggle-1').removeClass('toggle-selected').addClass('disabled');
			$('#coupon-toggle-2').addClass('disabled')
			$('#koef-num').html(parseFloat(0).toFixed(2));
			return false;
		} else {
			$('.coupon-Clear').html('');
			
			if (len == 1) {
				$('#coupon-toggle-1').addClass('toggle-selected');
				$('#coupon-toggle-2').removeClass('toggle-selected').addClass('disabled')
			} else if (len > 1) {
				$('#coupon-toggle-1').removeClass('toggle-selected')
				$('#coupon-toggle-2').addClass('toggle-selected').removeClass('disabled');
			}
		}
	}

checkCoupons();


jQuery(document).ready(function ($) {

	var currency = ['fa-ruble-sign', 'fa-dollar-sign', 'fa-euro-sign'];

	$('.currency-item').click(function() {
		$(this).attr('id') == 'currency-1' ? k = 0 : k = 1;
		for (var i = 0; i < currency.length; i++) {
			for (var j = 0; j < currency.length; j++) {
				if ($('.currency-btn i:first').hasClass(currency[i]) == true) {
	 				if ($('.currency-item:eq(' + k + ') i').hasClass(currency[j]) == true) {
	 					$('.currency-btn i:first').removeClass(currency[i]).addClass(currency[j]);
						$('.summary-win-num i').removeClass(currency[i]).addClass(currency[j]);
	 					$('.currency-item:eq(' + k + ') i').removeClass(currency[j]).addClass(currency[i]);
						return;
	 				}
				}
			}
		}
	})

	// Проверка вводимого значения в числовые поля

	$('#bet-sum').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
		temp = $(this).val() * parseFloat($('#koef-num').html());
		$('#win-num').html(temp.toFixed(2));
	});

	$('#balance-add').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
	});

	$('#balance-out').on('input', function () {
		$(this).val($(this).val().replace(/[^\d]/g, ''));
	});

	// Анимация меню выбора режима ставки в купоне

	$('#coupon-toggle-1').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#coupon-toggle-2').removeClass('toggle-selected');
		}
	});
	$('#coupon-toggle-2').click(function() {
		if ($(this).hasClass('toggle-selected') == false) {
			$(this).addClass('toggle-selected');
			$('#coupon-toggle-1').removeClass('toggle-selected');
		}
	});

	// Открытие списков событий

	$('.event-head').each(function () {
		if ($(this).hasClass('event-selected-item')) {
			$(this).css('border-radius', '5px 5px 0 0');
			$(this).find('i.fa-angle-down').css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).parent().children('div.event-body').show();
		}
	});

	$('.event-head').click(function(){
		var event = $(this).parent().children('div.event-body');
		var arrow = $(this).find('i.fa-angle-down');

		if (event.is(':hidden')) {
			arrow.css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).addClass('event-selected-item');
			$(this).css('border-radius', '5px 5px 0 0');
		} else {
			arrow.css('transform', 'rotate(0deg) translateY(0px)');
			$(this).removeClass('event-selected-item');
			$(this).css('border-radius', '5px');
		}
	  event.slideToggle('normal');
	});

  $('.user-mobile-time').click(function() {
    $('.user-mobile-dropdown').slideToggle('fast');
  });

	// Открытие доп. меню событий

	$('.event-other-koefs').click(function(){
		var event = $(this).parents('tr.event-block').next('tr.event-other').eq(0);
		var content = event.find('.event-other-block');
		var arrow = $(this).find('i.fa-caret-down');
		event.toggleClass('event-other-open');
		content.toggleClass('event-other-block-open');
		arrow.toggleClass('rotate');
	});

	$('.event-other-button').click(function(){
		var event = $(this).parent().children('div.event-other-category-koefs');
		var arrow = $(this).find('i.fa-angle-down');

		if (event.is(':hidden')) {
			arrow.css('transform', 'rotate(-180deg) translateY(2px)');
			$(this).toggleClass('event-other-button-selected');
			event.slideToggle('fast');
			$(this).css('border-radius', '5px 5px 0 0');
		} else {
			arrow.css('transform', 'rotate(0deg) translateY(0px)');
			$(this).toggleClass('event-other-button-selected');
			event.slideToggle('fast');
			$(this).css('border-radius', '5px');
		}
	});

	// Установка количества доп. коэффициентов

	$('.event-other').each(function () {
		var other_koefs = $(this).find('.event-koef');
		$(this).prev().find('.event-other-koefs-num').html(other_koefs.length);
	});



	// Отключение дополнительного меню ставок для неактивного события

	$('.event-other-koefs').each(function () {
		if ($(this).children('i.fa-lock').length > 0) {
			$(this).addClass('disabled');
		}
	})

	// Фиксированние фильтров в основном блоке
	/*
	var nav = $('.filters');

	$(window).scroll(function () {
		//console.log($(this).scrollTop());
		if ($(this).scrollTop() > $('#slider').height()) {
			nav.addClass("fixed-filters");
		} else {
			nav.removeClass("fixed-filters");
		}
	});
	*/
	
	// Добавление последних дат в фильтр


  function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }

	var now = new Date();
	for (var i = 0; i < 7; i++) {
		var temp = now;
    $('.filter-date').append('<a class="filter-item-date" href="#">' + formatDate(temp) + '</a>');
		temp.setDate(now.getDate() + 1);
	}

	$(window).bind('resize', checkPosition);

	function checkBetsCount() {
		if ($('.coupon-event').length == 0) {
		  $('#bets-count').html('Выбери события');
		} else {
		  $('#bets-count').html($('.coupon-event').length);
		}
	}


  var ftemp = 0;
  var fcount = 0;
  var fwidth = $('.filter-tags-block').outerWidth();
  var foffset = 0;
  var fcurr = 0;


   $('.filter-tags-block').on('scroll', function () {
     if ($(this).offset().left != $(this).children('div:first-child').offset().left) {
       $(this).parent().removeClass('hidden-left');
     } else {
       $(this).parent().addClass('hidden-left');
     }
     if ($(this).width() < ($(this).children('div:last-child').position().left + $(this).children('div:last-child').width() - 10)) {
       $(this).parent().removeClass('hidden-right');
     } else {
       $(this).parent().addClass('hidden-right');
     }
   });

	function checkPosition(){
		if ($(window).width() < 1000) {
			if ($('.koef-type').length == 0) {
				$('.event-block .event-koef').each(function () {
					$(this).parent().prepend('<span class="koef-type">' + $(this).data('type') + '</span>');
				});
				$('.total-koef').each(function () {
					$(this).wrapInner('<div></div>')
					$(this).prepend('<span class="koef-type-total">Тотал</span>');
				});
				$('.event-block').each(function () {
					var childs = $(this).children().eq(1);
					for (var i = 2; i < 10; i++) {
					childs = $.merge(childs, $(this).children().eq(i));
					}
					childs.wrapAll('<div class="mobile-koefs"></div>');
				});
				}

			checkBetsCount();
			
			$('#left-toggle').click(function () {
				$('.left-menu').addClass('show');
				$('.backSideMobileMenus').show();
				$('BODY').css('overflow','hidden');
			});
			$('#right-toggle').click(function () {
				$('.user-menu-mobile').addClass('show');
				$('.backSideMobileMenus').show();
				$('BODY').css('overflow','hidden');
			});
			$('#coupon-toggle').click(function () {
				$('.right-menu').addClass('show');
				$('.backSideMobileMenus').show();
				$('BODY').css('overflow','hidden');
			});
			$('#casino-toggle').click(function () {
				$('.casino-menu').addClass('show');
				$('.backSideMobileMenus').show();
				$('BODY').css('overflow','hidden');
			});
			
			
			$('#left-close').click(function () {
				$('.left-menu').removeClass('show');
				$('.backSideMobileMenus').hide();
				$('BODY').css('overflow','auto');
			});
			$('#right-close').click(function () {
				$('.user-menu-mobile').removeClass('show');
				$('.backSideMobileMenus').hide();
				$('BODY').css('overflow','auto');
			});
			$('#coupon-close').click(function () {
				$('.right-menu').removeClass('show');
				$('.backSideMobileMenus').hide();
				$('BODY').css('overflow','auto');
			});
			$('#casino-close').click(function () {
				$('.casino-menu').removeClass('show');
				$('.backSideMobileMenus').hide();
				$('BODY').css('overflow','auto');
			});
			$('.casino-menu a').click(function () {
				$('.casino-menu').removeClass('show');
				$('.backSideMobileMenus').hide();
				$('BODY').css('overflow','auto');
			});

			$(document).mouseup(function (e) {
				let status = 0;
				var container1 = $(".left-menu");
				var container2 = $(".right-menu");
				var container3 = $(".casino-menu");
				var container4 = $(".user-menu-mobile");
				if (container1.has(e.target).length === 0){container1.removeClass('show');}else{status = 1;}
				if (container2.has(e.target).length === 0){container2.removeClass('show');}else{status = 1;}
				if (container3.has(e.target).length === 0){container3.removeClass('show');}else{status = 1;}
				if (container4.has(e.target).length === 0){container4.removeClass('show');}else{status = 1;}
				
				if(status == 0){
					$('.backSideMobileMenus').hide();
					$('BODY').css('overflow','auto');
				}

				$(".filter-tags-block").getNiceScroll().hide();
				$(".user-profile-menu").getNiceScroll().hide();
				$(".event-sub-menu").getNiceScroll().hide();
				$(".foterBanners").getNiceScroll().hide();
			});
			
		} else {

			$('.koef-type').each(function () {
				$(this).remove();
			});
			$('.koef-type-total').each(function () {
				$(this).remove();
			});
			$('.total-koef').each(function () {
				$(this).unwrapInner();
			});
			$('.mobile-koefs').each(function () {
				$('.mobile-koefs').find('td').unwrap();
			});
			$('.left-menu').removeClass('show');
			$('.right-menu').removeClass('show');
			$('.casino-menu').removeClass('show');
			$('.user-menu-mobile').removeClass('show');

			$('.backSideMobileMenus').hide();
			$('BODY').css('overflow','auto');

			// Scroll Bar Custom
			$(".filter-tags-block").niceScroll({
				cursorwidth:"2px",
				cursorborderradius: 5,
				cursorcolor:"#a9a9a9",
				cursorborder:"0px",
				//emulatetouch :  true
			});
			$(".user-profile-menu").niceScroll({
				cursorwidth:"2px",
				cursorborderradius: 5,
				cursorcolor:"#a9a9a9",
				cursorborder:"0px",
			});
			$(".event-sub-menu").niceScroll({
				cursorwidth:"2px",
				cursorborderradius: 5,
				cursorcolor:"#a9a9a9",
				cursorborder:"0px",
			});
			$(".foterBanners").niceScroll({
				cursorwidth:"2px",
				cursorborderradius: 5,
				cursorcolor:"#4c4c4c",
				cursorborder:"0px",
			});


			$(".filter-tags-block").resize();
			$(".user-profile-menu").resize();
			$(".event-sub-menu").resize();
			$(".foterBanners").resize();

		}
	}
	checkPosition();
	

	$('img.img-svg').each(function(){
	  var $img = $(this);
	  var imgClass = $img.attr('class');
	  var imgURL = $img.attr('src');
	  $.get(imgURL, function(data) {
		var $svg = $(data).find('svg');
		if(typeof imgClass !== 'undefined') {
		  $svg = $svg.attr('class', imgClass+' replaced-svg');
		}
		$svg = $svg.removeAttr('xmlns:a');
		if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
		  $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		}
		$img.replaceWith($svg);
	  }, 'xml');
	});


});


function getName (str, elem){
	if (str.lastIndexOf('\\')){var i = str.lastIndexOf('\\')+1;}
	else{var i = str.lastIndexOf('/')+1;}						
	var filename = str.slice(i);			
	var uploaded = document.getElementById(elem);
	uploaded.innerHTML = filename;
}