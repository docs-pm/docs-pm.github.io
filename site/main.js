var val, e, es; // value, element, elements

// build up h3 elements
es = document.getElementsByTagName('h3');
for (var i=0; i<es.length; i++){ e = es[i];

    val = e.getAttribute('bind');
    if (val) { e.innerHTML = '<bind>'+val+'</bind>' + e.innerHTML }
    }

// build up any arg elements
es = document.getElementsByTagName('arg');
for (var i=0; i<es.length; i++){ e = es[i];

    val = e.getAttribute('maintitle');
    var bar = '<bar> ' + val;
    
    val = e.getAttribute('subtitle');
    if (val) { bar += ' <subtitle>' + val + '</subtitle> ' }
    
    val = e.getAttribute('type');
    if (val) { bar += ' <type>' + val + '</type> ' }
    e.innerHTML = bar + ' </bar>' + '<p>' + e.innerHTML+ '</p>';
    
    val = e.getAttribute('deck');
    if (val) { e.className = 'deck'+val }
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
	
	// make arg boxes animated
	$('args').children('arg').children('bar').click(function(event) {
	    $(this).parent().parent().children('arg').children('p').slideToggle(150);
	    });
	
	// build block elements
	$('block').each(function () {
	    $(this).replaceWith('<pre class=sh_'+$(this).attr('lang')+'>'+$(this).html()+'</pre>');
	    });
	
	// make example code animated
	$('blocks').children('pre').click(function(event) {
	    $(this).parent().children(':not(pre)').slideToggle(150);
	    });
	
	// add tooltips to stuff
	$('args').children('arg').attr('title', 'Toggle Boxes');
    $('blocks').children('pre').attr('title', 'Toggle Explanation');
    

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
            $('arg, pre, h1, h2, h3, note')
                .css('box-sizing', 'border-box')
                .each( function (i, e) {
                    e.style.width = e.style.paddingLeft + 636;
                    });
            $('p')
                .css('box-sizing', 'border-box')
                .each( function (i, e) {
                    e.style.width = e.style.paddingLeft + 620;
                    });
            $('arg p').css('width', 635);
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
        if (width < 650) {
            $('body').css('zoom', '80%');
            $('page').css('padding-left', ($(this).width()-488) / 2);
            offset = false;
            }
        
        else if (width < 685) {
            $('body').css('zoom', '90%');
            $('page').css('padding-left', ($(this).width()-556) / 2);
            $('p').css('text-align', 'left');
            offset = false;
            }
        
        else {
            $('body').css('zoom', '100%');
            $('p').css('text-align', 'justify');
            }
        
        }).resize();
    });

// glide effect when moving between internal links (page headers)...
// credit http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links
