const decodeJWT = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      const payload = Buffer.from(base64Payload, 'base64');
      return JSON.parse(payload.toString());
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  };

export default decodeJWT;