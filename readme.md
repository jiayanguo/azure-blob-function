# BlobTrigger - JavaScript

The `BlobTrigger` makes it incredibly easy to react to new Blobs inside of Azure Blob Storage. This sample demonstrates a simple use case of processing data from a given Blob using JavaScript.

## How it works

For a `BlobTrigger` to work, you provide a path which dictates where the blobs are located inside your container, and can also help restrict the types of blobs you wish to return. For instance, you can set the path to `samples/{name}.png` to restrict the trigger to only the samples path and only blobs with ".png" at the end of their name.

## How to set connection in the function.js
Create a storage connection in the Function App Settings.


## Learn more
This is a node js project, which could listen to blob change notification, and resize uploaded images to a different blob.

update config.js with your azure blob connection endpoint

