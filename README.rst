==================================
 Custom Download File Odoo module
==================================

Widget for download a customized file

Generic custom file
===================

.. code-block:: python

    class MyFile(models.AbstractModel):

        _inherit = 'download.file.base.model'
        _name = 'my.file'

        def setup(self, record_id):
            super().setup(record_id)
            # initialize values

        def get_filename(self):
            return 'filename'

        def get_content(self):
            # process a file and return content
            return 'file_content'

.. code-block:: xml

    <widget name="custom_download_button" model="my.file" string="Download this file"/>

Excel report example
====================

.. code-block:: python

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


.. code-block:: xml

    <widget name="custom_download_button" model="my.excel.report" string="Download Excel file"/>
