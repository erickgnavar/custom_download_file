# coding: utf-8
import base64

from osv import orm


class ReportReceiver(orm.TransientModel):

    _name = 'file.dispatcher'

    def render(self, cr, uid, model, record_id, context=None):
        obj = self.pool[model]
        obj.init(cr, uid, record_id, context=context)
        return {
            'filename': obj.get_filename(cr, uid, context=context),
            'content': base64.encodestring(obj.get_content(cr, uid, context=context))
        }


class DownloadFileBaseModel(orm.TransientModel):

    _name = 'download.file.base.model'

    record_id = None

    def init(self, cr, uid, record_id, context=None):
        self.record_id = record_id

    def get_filename(self, cr, uid, context=None):
        raise NotImplementedError

    def get_content(self, cr, uid, context=None):
        raise NotImplementedError
