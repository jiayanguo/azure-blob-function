
'use strict'

const storage = require('azure-storage');
const config = require('./config')
const stream = require('stream');

const blobService = storage.createBlobService(config.AZURE_BLOB);

class BlobService {
    listBlobs(containerName, prefix, callback) {
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, callback);
    };
    
    downloadBlob(containerName, blobName, callback) {

            let chunks = []
            let fileStream = blobService.createReadStream(containerName, blobName);
            fileStream.on('data',(chunk)=>{
                chunks.push(chunk)
            })
            
            fileStream.on('end',()=>{
                console.log('stream finish')
                callback(null, Buffer.concat(chunks))
            })
            
            fileStream.on('error',(error)=>{
                callback(err)
            })

    }

    uploadToBlob(containerName, blobName, buffer, callback) {
            const readStream = stream.PassThrough();
            readStream.end(buffer);

            blobService.createBlockBlobFromStream(containerName, blobName, readStream, buffer.length, callback);

    }

    deleteBlob(containerName, blobPath, callback) {
        this.listBlobs(containerName, blobPath, (err, list)=> {
            if (err) {
                callback(err)
            }
            if (list.entries.length == 0) {
                callback (null)
            }
            
            let counter =0;
            list.entries.forEach(element => {
                    blobService.deleteBlobIfExists(containerName, element.name, (err, data) => {
                        console.log(data)
                        counter ++;
                        if (counter >= list.entries.length) {
                            callback()
                        }
                    });
            })
        })
}

}
module.exports = BlobService