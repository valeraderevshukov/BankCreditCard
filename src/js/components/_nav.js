import { BODY, OPEN, ACTIVE, FIXED, WIN } from '../_constants';
import { SCROLL_TO, TOUCH } from '../_utils';

(() => {

  const $btn = $('.js-nav-btn');
  const $nav = $('.js-nav');
  const $links = $('.js-nav-link');
  const $sections = $('[data-section]');
  const header = '.js-header';

  //SCROLL TO
  $links.click(function(e) {
    e.preventDefault();

    const target = $(this).attr('href');
    const position = $sections
      .filter(`[data-section="${target}"]`)
      .offset().top + 2;

    SCROLL_TO(position);
    if (!TOUCH()) return;
    $btn.trigger('click');
  });

  $btn.click(e => {
    e.preventDefault();
    $nav.toggleClass(OPEN);
    $btn.toggleClass(ACTIVE);
  });

  BODY.click(e => {
    const $target = $(e.target);
    if ($target.closest(header).length) return;
    $nav.removeClass(OPEN);
    $btn.removeClass(ACTIVE);
  });

  let $header = $(header);
  let offsetTop = $('.js-header-top').outerHeight();
  const switcherHeader = () => {
    let offset = WIN.scrollTop();
    ( offset >= offsetTop ) 
      ? $header.addClass(FIXED)
      : $header.removeClass(FIXED);
  };
  WIN.on('scroll', switcherHeader);

  const $last = $sections.last();
  const lastTarget = $last.data('section');
  const $lastLink = $links.filter(`[href="${lastTarget}"]`);

  const setActiveLink = $link => {
    $links.removeClass(ACTIVE);
    $link.addClass(ACTIVE);
  };

  const detectActiveSection = () => {
    const scrollTop = WIN.scrollTop();
    const scrollBottom = scrollTop + WIN.outerHeight();

    $sections.each(function() {

      const $this = $(this);
      const target = $this.data('section');
      const top = $this.offset().top;
      const bottom = $this.outerHeight() + top;
      const $link = $links.filter(`[href="${target}"]`);

      if (scrollTop >= top && scrollTop < bottom && !$link.hasClass(ACTIVE)) setActiveLink($link);
      if (scrollBottom === $last.offset().top + $last.outerHeight()) setActiveLink($lastLink);

    });
  };


  detectActiveSection();
  WIN.on('scroll', detectActiveSection);

})();
