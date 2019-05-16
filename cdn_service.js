'use strict'

const msRestAzure = require('ms-rest-azure');
const CDNManagementClient = require('azure-arm-cdn');

const resource_group_name = 'CharterSEHackathon'
const profile_name = 'hackathon'
const endpoint_name = 'imageserver-test'

const clientId = ''
const clientSecret = ''
const tenantId = ''
const subscriptionId = 'fd637cd5-fe00-470c-871f-7caa3bae946f'

class CdnService {

    cdnPurage(puragePaths, callback) {
        let credentials = new msRestAzure.ApplicationTokenCredentials(clientId, tenantId, clientSecret);
        let client = new CDNManagementClient(credentials, subscriptionId);
        client.endpoints.purgeContent(
            resource_group_name,
            profile_name,
            endpoint_name,
            puragePaths,
            callback);
    }
}

module.exports = CdnService