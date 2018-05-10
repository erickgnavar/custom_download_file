from odoo import models


class DownloadFileBaseModel(models.AbstractModel):

    _name = 'download.file.base.model'

    record_id = None

    def setup(self, record_id):
        self.record_id = record_id

    def get_filename(self):
        raise NotImplementedError

    def get_content(self):
        raise NotImplementedError
