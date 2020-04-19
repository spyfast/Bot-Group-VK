import request from 'request-promise';

export async function requestToVkAPI(parameters)
{
    const url = `https://api.vk.com/method/${parameters.method}?${parameters.params}&access_token=${parameters.token}&v=${parameters.version}`;
    try
    {
        return await request.post(encodeURI(url));
    }
    catch(e)
    {
        console.error(e);
    }
}
