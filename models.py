# coding: utf-8
import base64

from openerp import models, api


class ReportReceiver(models.AbstractModel):

    _name = 'file.dispatcher'

    @api.model
    def render(self, model, record_id):
        obj = self.env[model]
        obj.init(record_id)
        return {
            'filename': obj.get_filename(),
            'content': base64.encodestring(obj.get_content())
        }


class DownloadFileBaseModel(models.AbstractModel):

    _name = 'download.file.base.model'

    record_id = None

    def init(self, record_id):
        self.record_id = record_id

    def get_filename(self):
        raise NotImplementedError

    def get_content(self):
        raise NotImplementedError
