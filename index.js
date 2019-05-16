'use strict'

const Jimp = require('jimp');
const config = require('./config')
const Service = require('./blob_service')
const CDNServie = require('./cdn_service')
const async = require('async');
const service = new Service()
const cdnService = new CDNServie()

// call context done to end the function
module.exports = async (context, myEvent) => {

  const trigger = context.bindingData.blobTrigger;
  const blobName = trigger.substr(trigger.indexOf('/') + 1)

  const dstPath = blobName.substr(0, blobName.lastIndexOf('.'))
  const format = blobName.substr(blobName.lastIndexOf('.'))

  context.log("get object from original container")
  service.downloadBlob(config.AZURE_IMAGE_BLOB, blobName, (err, data) => {
    context.log("removing resized images in resized blob")
    service.deleteBlob(config.AZURE_IMAGE_RESZIED_BLOB, dstPath, (err, data1) => {
      context.log("start resizing images!")
      let counter = 0;
      Jimp.read(data, (err, thumbnail) => {
        config.PRE_DEFINED_DIMENSIONS.forEach(
          (dimension) => {
            thumbnail.resize(dimension.w, dimension.h);

            thumbnail.getBuffer(Jimp.MIME_PNG, (err, buffer) => {

              const blobName = dstPath + "/" + dimension.w + "x" + dimension.h + format
              service.uploadToBlob(config.AZURE_IMAGE_RESZIED_BLOB,
                blobName, buffer, (err) => {
                  counter++
                  if (err) {
                    context.log("Exception while writing resized image to bucket " + err)
                  }
                  if (counter >= config.PRE_DEFINED_DIMENSIONS.length) {
                    context.log("invalidate cdn cache")
                    purageCDN();
                    context.done()
                  }

                })
            });
          }
        )
      })
    })
  })
};

let purageCDN = () => {
  context.log("invalidate cdn cache")
  let puragePath = [
    '/custom*'
  ]
  // cdnService.cdnPurage(puragePath, (err) => {
  //   if (err) {
  //     context.log('cdn purage failed')
  //     next(err)
  //   }
  //   context.log("cdn purage success")
  // })
}