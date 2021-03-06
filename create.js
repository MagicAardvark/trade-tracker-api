import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tradeId: uuid.v1(),
      tradeDate: data.tradeDate,
      ticker: data.ticker,
      quantity: data.quantity,
      pricePaid: data.pricePaid,
      priceSold: data.priceSold,
      tradeType: data.tradeType,
      rating: data.rating,
      notes: data.notes,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
