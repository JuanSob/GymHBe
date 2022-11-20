import validateApiKey from '@server/utils/apiKeyValidator';

const apiKeyMW = (req, res, next) => {
    const apiKey = req.get('apikey') || '';
    if(validateApiKey(apiKey)){
        return next();
    }
    console.log(apiKey);
    return res.status(406).json({"error":"APIKEY Not valid"});
}

export default apiKeyMW;