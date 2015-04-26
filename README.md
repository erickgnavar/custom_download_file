## Custom Download File Odoo module

Widget for download a customized file

### Extend base model

```python
from osv import orm


class MyFile(orm.TransientModel):

    _inherit = 'download.file.base.model'
    _name = 'my.file'

    def init(self, cr, uid, record_id, context=None):
        super(MyFile, self).init(cr, uid, record_id, context=context)
        # initialize values

    def get_filename(self, cr, uid, context=None):
        return 'filename'

    def get_content(self, cr, uid, context=None):
        # process a file and return content
        return 'file_content'
```

### Add to form

```xml
    <widget type="download_button" model="my.file" string="Download this file"/>
```
