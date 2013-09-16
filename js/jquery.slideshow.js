/**
 * $('.slideshow').slideshow({ wrap_sel: '.slides', slide_sel: '.slide' });
 *
 * `wrap_sel` selects the slides wrapper, relative to the root element
 *   if you want animation, use css transitions on 'left'
 * `slide_sel` selects the slides, relative to the wrap
 * `controls_sel` selects the controls element, relative to the wrap
 *
 * styles for the root element: position: relative, and overflow: hidden
 * styles for the wrapper element: position: absolute
 * styles for the slide elements: position: relative
 * styles for the controls: position: absolute
 */

;(function ($, window, document, undefined) {

  var plugin_name = 'slideshow',
      defaults = {
        delay: 5000,
        autoplay: true,

        resize_on_slide: false,
        set_h_on_resize: true,

        wrap_sel: '.slider',
        slide_sel: '.slide',
        controls_sel: '.slide-controls',

        on_class: 'on',

        prev_html: '<i class="ico-arr-left" />',
        next_html: '<i class="ico-arr-right" />',
        cur_html: '<i class="ico-bullet">&bull;</i>'
      };

  function Plugin(el, opts) {
    this.el = el;
    this.$el = $(el);

    this.settings = $.extend({}, defaults, opts);

    this._defaults = defaults;
    this._name = plugin_name;

    this.init();
  };

  Plugin.prototype = {
    play_state: 'paused',
    interval: null,
    total: 0,
    cur: 0,
    max_h: 0,

    init: function() {
      this.$wrap = this.$el.find(this.settings.wrap_sel);
      this.$slides = this.$wrap.find(this.settings.slide_sel);
      this.$controls = this.$el.find(this.settings.controls_sel);
      this.$dots = $();

      this.total = this.$slides.length;

      this.$slides.each(function(i) {
        var $slide = $(this);
        $slide.css('left', i * 100 + '%');
      });

      if (this.$controls.length) {
        var i, $el;
        if (this.settings.prev_html) {
          $el = $(this.settings.prev_html);
          $el.click($.proxy(this.prev, this));
          this.$controls.append($el);
        }
        if (this.settings.cur_html) {
          for (i=0; i<this.total; i++) {
            $el = $(this.settings.cur_html);
            $el.data('i', i);
            if (i == 0) $el.addClass(this.settings.on_class);
            $el.click($.proxy(this.showCur, this))
            this.$controls.append($el)
            this.$dots = this.$dots.add($el);
          }
        }
        if (this.settings.next_html) {
          $el = $(this.settings.next_html);
          $el.click($.proxy(this.next, this));
          this.$controls.append($el);
        }
      }

      if (this.settings.set_h_on_resize) {
        this.handleResized();
        // prefer to debounce it
        var callback = typeof($.debounce === 'function') ?
          $.debounce($.proxy(this.handleResized, this), 60) :
          $.proxy(this.handleResized, this);
        $(window).resize(callback);
      }

      if (this.total > 1 && this.settings.autoplay) this.play();
    },

    handleResized: function() {
      var cur_w = this.$el.width();
      if (this.prev_w === cur_w) return;

      this.prev_w = cur_w;
      this.max_h = 0;

      var $slide, h, that = this;
      this.$slides.each(function(i) {
        $slide = $(this);
        h = $slide.innerHeight();
        if (h > that.max_h) that.max_h = h;
      });

      this.$el.height(this.max_h);
    },

    play: function(e) {
      if (this.play_state == 'playing') return;
      if (e) e.preventDefault();

      this.interval = setInterval($.proxy(this.next, this), this.settings.delay);
      this.play_state = 'playing';
    },

    pause: function(e) {
      if (this.play_state == 'paused') return;
      if (e) e.preventDefault();

      this.interval = clearInterval(this.interval);
      this.play_state = 'paused';
    },

    prev: function(e) {
      if (e) e.preventDefault();
      this.cur --;
      if (this.cur < 0) this.cur = this.total - 1;
      this.show(this.cur);
    },

    next: function(e) {
      if (e) e.preventDefault();
      this.cur ++;
      if (this.cur >= this.total) this.cur = 0;
      this.show(this.cur);
    },

    showCur: function(e) {
      e.preventDefault();
      this.cur = $(e.currentTarget).data('i');
      this.show();
    },

    show: function(i) {
      if (typeof i !== 'number') i = this.cur;

      var was_playing = this.play_state == 'playing';
      if (was_playing) this.pause();

      if (this.$dots.length) {
        this.$dots.removeClass(this.settings.on_class);
        this.$dots.eq(i).addClass(this.settings.on_class);
      }

      this.$wrap.css('left', -i * 100 + '%');

      if (was_playing) this.play();
    }

  };

  $.fn[plugin_name] = function(opts) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + plugin_name)) {
        $.data(this, "plugin_" + plugin_name, new Plugin(this, opts));
      }
    });
  };

}(jQuery, window, document));
