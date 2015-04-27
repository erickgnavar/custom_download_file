# coding: utf-8
import json

from openerp import http
from openerp.http import request


class FileDispatcher(http.Controller):

    @http.route('/custom_download_file/get_file/', type='http', auth='user')
    def dispatch_file(self, data, token):
        _data = json.loads(data)
        obj = request.env[_data['model']]
        obj.init(_data['record_id'])
        response = request.make_response(obj.get_content(), headers=[
            ('Content-Type', 'application/octet-stream;charset=utf-8;'),
            ('Content-Disposition', u'attachment; filename={};'.format(obj.get_filename()))
        ], cookies={
            'fileToken': token
        })
        return response
