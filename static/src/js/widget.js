'use strict';

openerp.custom_download_file = function (instance, local) {
    var _t = instance.web._t;
    local.download_button = instance.web.form.FormWidget.extend({
        events: {
            'click button.oe_button': 'download'
        },
        start: function () {
            this._super();
            this.$el.append('<button class="oe_button">' + (this.node.attrs['string'] || _t('Download')) + '</button>');
        },
        download: function () {
            var self = this;
            self.view.save().then(function () {
                new instance.web.Model('file.dispatcher').call('render', [
                    self.node.attrs['model'], self.view.datarecord.id
                ]).then(function (data) {
                    var aElement = document.createElement('a');
                    aElement.setAttribute('href', 'data:application/octet-stream;charset=utf-8;base64,' + data.content);
                    aElement.setAttribute('target', '_self');
                    aElement.setAttribute('download', data.filename);
                    aElement.style.display = 'none';
                    document.body.appendChild(aElement);
                    aElement.click();
                    document.body.removeChild(aElement);
                }).fail(function (error, event) {
                    console.error(error, event);
                });
            });
        }
    });
    instance.web.form.custom_widgets.add('download_button', 'instance.custom_download_file.download_button');
};
