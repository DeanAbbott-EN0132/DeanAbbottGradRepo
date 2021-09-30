// Create clients and set shared const values outside of the handler.
 
// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
 
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME;
 
/**
 * A simple example includes a HTTP put method to add one item to a DynamoDB table.
 */
exports.updateItemHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);
 
    // put info from the body of the request
    const body = JSON.parse(event.body)
    const tableID = body.tableID;
    const Name2 = body.Name2;
    const value = body.value;
    
 
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName : tableName,
        Item: {
            tableID : tableID,
            Name2: Name2,
            value: value
        }
    };
 
    const result = await docClient.put(params).promise();
 
    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };
 
    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}