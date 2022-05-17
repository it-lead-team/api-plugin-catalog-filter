export default function createHistoryRecord(document, context) {
    
    console.log(context)
    const {accountId, userId, userIP} = context;

    const updatedAt = Date.now();
    const history = {
        referenceId: document[`_id`],
        userId,
        accountId,
        userIP,
        updatedAt,
    };
    return history;
}