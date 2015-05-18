'use strict';

openerp.custom_download_file = function (instance, local) {
    var _t = instance.web._t;
    local.download_button = instance.web.form.FormWidget.extend({
        events: {
            'click button.oe_button': 'download'
        },
        start: function () {
            this._super();
            var className = 'oe_button ' + (this.node.attrs['class'] || '');
            this.$el.attr('class', '');
            this.$el.append('<button class="' + className + '">' + (this.node.attrs['string'] || _t('Download')) + '</button>');
        },
        download: function () {
            var self = this;
            self.view.save().then(function () {
                var cm = openerp.webclient.crashmanager;
                openerp.web.blockUI();
                self.session.get_file({
                    url: '/custom_download_file/get_file/',
                    data: {
                        data: JSON.stringify({
                            model: self.node.attrs['model'],
                            record_id: self.view.datarecord.id
                        })
                    },
                    complete: openerp.web.unblockUI,
                    error: cm.rpc_error.bind(cm)
                });
            });
        }
    });
    instance.web.form.custom_widgets.add('download_button', 'instance.custom_download_file.download_button');
};
