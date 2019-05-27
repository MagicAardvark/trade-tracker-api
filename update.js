import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'tradeId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tradeId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET tradeDate = :tradeDate, ticker = :ticker, quantity = :quantity, pricePaid = :pricePaid, priceSold = :priceSold, tradeType = :tradeType, rating = :rating, notes = :notes",
    ExpressionAttributeValues: {
      ":tradeDate": data.tradeDate || null,
      ":ticker": data.ticker || null,
      ":quantity": data.quantity || null,
      ":pricePaid": data.pricePaid || null,
      ":priceSold": data.priceSold || null,
      ":tradeType": data.tradeType || null,
      ":rating": data.rating || null,
      ":notes": data.notes || null,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log('e', e)
    return failure({ status: false });
  }
}
