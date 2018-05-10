odoo.define('custom_download_file.CustomDownloadwidget', function (require) {
  'use strict';

  var Widget = require('web.Widget');
  var WidgetRegistry = require('web.widget_registry');
  var FieldManagerMixin = require('web.FieldManagerMixin');
  var _t = require('web.translation')._t;

  var CustomDownloadWidget = Widget.extend(FieldManagerMixin, {
    events: {
      'click button': 'download',
    },

    init: function (parent, model, node) {
      this._super.apply(this, arguments);
      this._model = model;
      this._node = node;
      FieldManagerMixin.init.call(this);
    },

    start: function () {
      this._super.apply(this, arguments);
      var className = 'btn oe_highlight' + (this._node.attrs['class'] || '');
      this.$el.append('<button class="' + className + '">' + (this._node.attrs['string'] || _t('Download')) + '</button>');
    },

    download: function (event) {
      var self = this;

      // TODO: Call in some way to save method to ensure has fresh data to process
      $.blockUI();
      self.model.getSession().get_file({
        url: '/custom_download_file/get_file/',
        data: {
          model: self._node.attrs['model'],
          record_id: self._model.rec_id,
        },
        complete: $.unblockUI,
      });
    }
  });

  WidgetRegistry.add('custom_download_button', CustomDownloadWidget);
});
