import { BODY, OPEN, ACTIVE } from '../_constants';
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
      .offset().top;

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

})();
