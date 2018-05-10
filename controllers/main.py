from odoo import http
from odoo.http import request


class FileDispatcher(http.Controller):

    @http.route('/custom_download_file/get_file/', type='http', auth='user')
    def handler(self, model, record_id, token):
        obj = request.env[model]
        obj.setup(record_id)
        response = request.make_response(obj.get_content(), headers=[
            ('Content-Type', 'application/octet-stream;charset=utf-8;'),
            ('Content-Disposition', u'attachment; filename={};'.format(obj.get_filename()))
        ], cookies={
            'fileToken': token,
        })
        return response
