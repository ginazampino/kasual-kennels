jQuery.fn.extend({
    fileUpload: function () {
        var file = $(this);
        var fileStorage = [];

        file.data('files', function () {
            var copies = fileStorage.map(createFileClone);
            return copies;
        });

        var table = $(`<table class=table style='margin-top: 10px'>
            <thead>
                <tr>
                    <th style="width: 80px">#</th>
                    <th>File Name</th>
                    <th style="width: 250px">Type</th>
                    <th style="width: 250px">Size</th>
                    <th stlye="width: 250px">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr class="no-files">
                    <td colspan=5>No files.</td>
                </tr>
            </tbody>
        </table>`);

        var tbody = table.find('tbody');

        file.after(table);

        file.on('change', function (event) {
            var files = event.originalEvent.target.files;

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fileName = trimExtension(file.name);
                var id = tbody.find('tr').length;

                if (hasFile(file)) continue;

                var row = $(`<tr data-file-id='${id}'>`);
                row.data('file', file);

                row.append('<td>' + id + '</td>');
                
                var inputCell = $('<td>').appendTo(row);
                var input = $(`<input type=text placeholder='${fileName}' value='${fileName}' style='display: inline-block; width: 100%'>`).appendTo(inputCell);

                row.append('<td>' + file.type + '</td>');
                row.append('<td>' + getFriendlySize(file.size) + '</td>');
                row.append('<td>&nbsp;</td>');

                var buttonCell = $(`<td><button class='btn btn-xs btn-default' type='button' data-id='${id}'>Remove</button></td>`);
                buttonCell.find('button').on('click', removeFile);

                row.append(buttonCell);

                tbody.append(row);
                fileStorage.push(file);
            }

            tbody.find('tr.no-files').remove();
            console.log(fileStorage);
        });

        function createFileClone(file) {
            return new File([file], getInputFileName(file), {
                type: file.type
            });
        }

        function hasFile(file) {
            return fileStorage.some((file2) => {
                return file.name === file2.name &&
                    file.type === file2.type &&
                    file.size === file2.size;
            });
        }

        function getInputFileName(file) {
            var rows = tbody.find('tr');
            for (var i = 0; i < rows.length; i++) {
                var row = $(rows[i]);
                var rowFile = row.data('file');
                if (rowFile === file) {
                    var rowInput = row.find('input[type=text]').val();
                    return rowInput;
                }
            }
            return 'invalid-input';
        }

        function getFriendlySize(size) {
            const KB = 1024;
            const MB = KB * 1024;
            const GB = MB * 1024;
            const TB = GB * 1024;

            if ( size > TB ) return Math.round(size / TB) + ' TB';
            if ( size > GB ) return Math.round(size / GB) + ' GB';
            if ( size > MB ) return Math.round(size / MB) + ' MB';
            if ( size > KB ) return Math.round(size / KB) + ' KB';
            return size + ' B';
        }

        function removeFile() {
            var button = $(this);
            var id = button.attr('data-id');
            var row = button.closest('tr');
            
            row.remove();
            var file = row.data('file');
            var i = fileStorage.indexOf(file);

            fileStorage.splice(i, 1);

            if (tbody.find('tr').length === 0) {
                tbody.append(`
                    <tr class="no-files">
                        <td colspan=5>No files.</td>
                    </tr>`);
            }
        }

        function trimExtension(fileName) {
            var i = fileName.lastIndexOf('.');
            return i == -1
                ? fileName 
                : fileName.substr(0, i);
        }
    }
});