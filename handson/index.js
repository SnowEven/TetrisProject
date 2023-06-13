const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = 'GameScore'; // 사용자의 DynamoDB 테이블 이름으로 변경해야 함

exports.handler = async (event) => {
  const { score } = event; // 클라이언트로부터 전달된 점수 데이터
  const now = new Date();
  const datetime = now.toISOString(); // 날짜와 시간을 포함한 ISO 형식으로 추출

  const params = {
    TableName,
    Item: {
      id: 'score', // 점수를 저장할 아이템의 키로 변경해야 함
      score,
      datetime,
    },
  };

  try {
    await docClient.put(params).promise();
    return {
      statusCode: 200,
      body: 'Score saved successfully.',
    };
  } catch (error) {
    console.log('Error saving score:', error);
    return {
      statusCode: 500,
      body: 'Error saving score.',
    };
  }
};
