## Custom Download File Odoo module

Widget for download a customized file

## Generic custom file

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

```xml
<widget type="download_button" model="my.file" string="Download this file"/>
```



## Excel report example

```python

from StringIO import StringIO

import xlsxwriter


class MyExcelReport(models.TransientModel):

    _inherit = 'download.file.base.model'
    _name = 'my.excel.report'

    def get_filename(self):
        return 'my_report.xlsx'

    def get_content(self):
        output = StringIO()
        wb = xlsxwriter.Workbook(output)
        sheet = wb.add_worksheet('sheet1')
        # make something
        wb.close()
        output.seek(0)
        return output.read()

```

```xml
<widget type="download_button" model="my.excel.report" string="Download Excel file"/>
```
