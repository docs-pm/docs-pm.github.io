var val, e, es; // value, element, elements

// build up h3 elements
es = document.getElementsByTagName('h3');
for (var i=0; i<es.length; i++){ e = es[i];

    val = e.getAttribute('bind');
    if (val) { e.innerHTML = '<bind>'+val+'</bind>' + e.innerHTML }
    }

// build up any box elements
es = document.getElementsByTagName('box');
for (var i=0; i<es.length; i++){ e = es[i];

    val = e.getAttribute('maintitle');
    var bar = '<bar> ' + val;
    
    val = e.getAttribute('subtitle');
    if (val) { bar += ' <subtitle>' + val + '</subtitle> ' }
    
    val = e.getAttribute('type');
    if (val) { bar += ' <type>' + val + '</type> ' }
    e.innerHTML = bar + ' </bar>' + '<p>' + e.innerHTML+ '</p></box>';
    }

// convert page link attribute values to internal links
es = document.getElementsByTagName('page');
for (var i=0; i<es.length; i++){ e = es[i];
    
    val = e.getAttribute('link');
    if (val) {
        var a = document.createElement('a');
        a.id = val.split('/').slice(-1)[0];
        e.parentNode.insertBefore(a, e);
        }
    }


$(document).ready(function() {

    var offset = 30;

    // attach fade in effect to page load
	$('body').css('display', 'none');
	$('body').fadeIn(700);
    
    // attach glide effect to internal links
    // conditional on css zoom being at 100%
	$('a[href^="#"]').addClass('glide');
	$('.glide').click(function(event){		
		if (offset !== false) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top - offset}, 500);
            }
        });
	
	// make boxes animated
	$('boxes').children('box').children('bar').click(function(event) {
        $(this).parent().parent().children('box').children('p').slideToggle(150);
        });
	
	// build block elements
	$('block').each(function () {
        $(this).replaceWith('<pre class=sh_'+$(this).attr('lang')+'>'+$(this).html()+'</pre>');
        });
	
	// make example code animated
	$('blocks').children('pre').click(function() {
        $(this).parent().children(':not(pre)').slideToggle(150);
        });
	
	// add tooltips to stuff
	$('boxes').children('box').children('bar').attr('title', 'Toggle Boxes');
    $('blocks').children('pre').attr('title', 'Toggle Explanation');
    
    $('sponsor').each(function () {   
        var inner = '<div class=ad>';
        inner += $(this).attr('maintitle');
        inner += '<span style="color:black; font-size:14px"><br>';
        inner += $(this).html() + '<br>';
        inner += '<a href="'+$(this).attr('href')+'">';
        inner += $(this).attr('link') + '</a></span></div>';
        inner += '<div class=ad>Pious Markoff<span style="color:black;';
        inner += 'font-size: 14px"><br>CMS for Tech Writers<br>';
        inner += '<a href="http://pm.docs.pm">pm.docs.pm</a></span></div>';
        inner += '<div class=ad>GitHub Pages<span style="color:black;';
        inner += 'font-size: 14px"><br> Social Coding<br>';
        inner += '<a href="http://github.io">github.io</a></span></div>';
        $(this).replaceWith(inner);
        });
    
    // highlight code examples 
    sh_highlightDocument();
    

    // RESPONSIVE LAYOUT
    $(window).bind('resize', function() {
    
        var width = $(this).width();

        // tablet scale
        if (width < 880) {
            $('page')
                .css({
                    'box-sizing': 'border-box',
                    'padding': 60,
                    'width': '100%',
                    'margin-bottom': 0,
                    'margin-top': 0,
                    'border': 'none',
                    'border-bottom': '1px solid #AAA'
                    })
                .each( function (i, e) {
                    e.style.paddingLeft = ($(window).width() - 620) / 2;
                    });
            $('h1, h2, h3').css('margin-top', 0);
            $('box, pre, h1, h2, h3, note')
                .css('box-sizing', 'border-box')
                .each( function (i, e) {
                    e.style.width = e.style.paddingLeft + 636;
                    });
            $('p')
                .css('box-sizing', 'border-box')
                .each( function (i, e) {
                    e.style.width = e.style.paddingLeft + 620;
                    });
            $('box p').css('width', 635);
            $('body').css('margin-bottom', 0);
            offset = -10;
            }
        
        // notebook scale
        else if (width < 1150) {
            $('page').css({
                'margin-bottom': 20,
                'margin-top': 20,
                'border': '1px solid #888',
                'width': '',
                'box-sizing': '',
                'padding': 80,
                'padding-top': 10,
                'padding-bottom': 80
                });
            $('h1, h2, h3').css('margin-top', 30);
            offset = 10;
            }
        
        // desktop scale
        else {            
            $('page').css({
                'margin-bottom': 30,
                'margin-top': 30,
                'border': '1px solid #888',
                'width': '',
                'box-sizing': '',
                'padding': 100,
                'padding-top': 20,
                'padding-bottom': 80
                });
            $('h1, h2, h3').css('margin-top', 40);
            offset = 20;
            }
                
        // mobile tweaks
        if (width < 685) {
            $('body').css('zoom', '90%');
            $('page').css('padding-left', ($(this).width()-556) / 2);
            $('page').css({'margin-top': 0, 'padding-top': 25});
            $('p').css('text-align', 'left');
            offset = false;
            }
        
        else {
            $('body').css('zoom', '100%');
            $('p').css('text-align', 'justify');
            $('page').css({'margin-top': 20, 'padding-top': 20});
            }
        
        }).resize();
    });

// glide effect when moving between internal links (page headers)...
// credit http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links
