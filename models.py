# coding: utf-8

from openerp import models


class DownloadFileBaseModel(models.AbstractModel):

    _name = 'download.file.base.model'

    record_id = None

    def init(self, record_id):
        self.record_id = record_id

    def get_filename(self):
        raise NotImplementedError

    def get_content(self):
        raise NotImplementedError
