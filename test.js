const BlobService = require('./blob_service')
const CDNService = require('./cdn_service')
const config = require('./config')

let service = new BlobService()
let cdnService = new CDNService()
// service.listBlobs(config.AZURE_IMAGE_RESZIED_BLOB).then((data) => {
//     data.blobs.forEach(element => {
//         if(element.name.startsWith("MV"))
//             console.log(element.name)
//     });
// })

// service.deleteBlob(config.AZURE_IMAGE_RESZIED_BLOB, "MV004047330000",  (err, data) => {
//     console.log(data)
// })
let puragePath = [
    '/custom*'
  ]
cdnService.cdnPurage(puragePath, (err, data) => {
    if (err) console.log(err)
    console.log(data)
})