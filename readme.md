## Custom Download File Odoo module

Widget for download a customized file

### Extend base model

```python

class MyFile(models.AbstractModel):

    _inherit = 'download.file.base.model'
    _name = 'my.file'

    def init(self, record_id):
        super(MyFile, self).init(record_id)
        # initialize values

    def get_filename(self):
        return 'filename'

    def get_content(self):
        # process a file and return content
        return 'file_content'
```

### Add to form

```xml
    <widget type="download_button" model="my.file" string="Download this file"/>
```
