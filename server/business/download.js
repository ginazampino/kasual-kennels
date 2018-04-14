module.exports = class DownloadBusiness {
	constructor(conn) {
		this.conn = conn;
    }

    async create(request) {
        const body = request.body;
        const files = request.files;

        // Save the image

        const imageUpload = files.image && files.image[0];
        const image = await this.conn.insert("images", {
            file_name: imageUpload.filename
        });
        const imageId = image.insertId;

        // Save the download

        const download = await this.conn.insert("downloads", {
            download_name: body.download_name,
            page_id: body.page_id,
            image_id: imageId
        });
        const downloadId = download.insertId;

        // Save the download_files

        const fileUploads = files.files;
        for (let i = 0; i < fileUploads.length; i++) {
            let file = fileUploads[i];

            await this.conn.insert("download_files", {
                download_name: file.originalname,
                file_name: file.filename,
                file_size: file.size,
                download_id: downloadId
            });
        }

        return downloadId;
    };

    deleteFile(fileId) {
        const sql = `
            DELETE FROM download_files
            WHERE
                id = ?
        `;
        return this.conn.query(sql, fileId);
    }

    getAll() {
        const sql = `
            SELECT
                downloads.*
            ,   downloads.download_name
            ,   pages.page_name
            FROM
                downloads
            INNER JOIN
                pages ON downloads.page_id = pages.id
            WHERE
                downloads.active = 1
            ORDER BY
                download_name;
        `;
        
        return this.conn.query(sql);
    };

    async getOne(id) {
        const sql = `
            SELECT
                downloads.*
            ,   imageUpload.file_name as download_image
            FROM
                downloads
            INNER JOIN
                images as imageUpload ON downloads.image_id = imageUpload.id
            WHERE
                downloads.id = ?
        `;

        const rows = await this.conn.query(sql, id);
        const download = rows[0];

        download.files = await this.getFiles(id);
        
        return download;
    };

    getFiles(downloadId) {
        const sql = `
            SELECT
                *
            FROM
                download_files
            WHERE
                download_id = ?
        `;
        return this.conn.query(sql, downloadId);
    }

    async update(request) {
        const body = request.body;
        const files = request.files;

        const imageUpload = files.image && files.image[0];

        // Update the image if required.

        if (imageUpload) {
            this.conn.update("images", {
                file_name: imageUpload.filename 
            }, {
                id: body.image_id
            });
        }

        // Update the download entity.

        this.conn.update("downloads", {
            download_name: body.download_name,
            page_id: body.page_id 
        }, { id: request.query.id });

        // Find the multipart fields whose keys start with "file_"
        // These are files to edit.

        const filesToUpdate = Object.keys(body)
            .filter( key => /^file_/.test(key) )
            .map( key => { 
                const id = /^file_(\d+)/.exec(key)[1];
                const value = body[key];
                return {
                    file_id: id,
                    download_name: value
                };
            });

        // Update the files.

        for (let i = 0; i < filesToUpdate.length; i++) {
            let file = filesToUpdate[i];

            await this.conn.update("download_files", {
                download_name: file.download_name
            }, {
                id: file.file_id
            });
        }

        // Insert new files if required.
        const fileUploads = files.files || [];
        for (let i = 0; i < fileUploads.length; i++) {
            let file = fileUploads[i];

            await this.conn.insert("download_files", {
                download_name: file.originalname,
                file_name: file.filename,
                file_size: file.size,
                download_id: request.query.id
            });
        }
    };
};
