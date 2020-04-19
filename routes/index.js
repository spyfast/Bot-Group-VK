import express from 'express';
import { groupId, responseString, accessToken, appealPhrases, commands, adminId, phrases } from '../config';
import { requestToVkAPI } from '../api';
import { hasKey, hasCommand, randomNumber, lastWordIsNotCommand, readFile } from '../helpers';
import VkParameters from '../models/vk';
import request from 'request';
import fs from 'fs';


const router = express.Router();
var intervalId = 0;

router.post('/api/callback/approve', async (req, res) => {

    const data = req.body;
    if(data.type == "confirmation" && data.group_id == groupId) {
        res.send(responseString);
    }

    if(data.type === "message_new")
    {
        const text = JSON.stringify(data.object.text);
        const from_id = JSON.stringify(data.object.from_id);
        const chatId = JSON.stringify(data.object.peer_id) - 2000000000;
        console.log(data.object);

            if(hasCommand(commands[0], text))
            {
                if(lastWordIsNotCommand(commands[0], text))
                {
                    const time = text.split(' ').splice(-1).join().slice(0, -1);
                    if(from_id == adminId)
                    {
                        intervalId = setInterval( async () =>
                        {
                            await requestToVkAPI(new VkParameters('messages.send', chatId, phrases[randomNumber(0, phrases.length - 1)]));
                         }, time);
                    }
                    else
                    {
                        await requestToVkAPI(new VkParameters('messages.send', chatId, 'У вас нет прав для использования этой команды'));
                    }
                }
                else
                {
                    await requestToVkAPI(new VkParameters('messages.send', chatId, 'Вы не указали время флуда'));
                }
            }

            if(hasCommand(commands[1], text))
            {
                if(from_id == adminId)
                {
                    if(intervalId !== 0)
                    {
                        clearInterval(intervalId);
                        intervalId = 0;
                        await requestToVkAPI(new VkParameters('messages.send', chatId, 'Флуд остановлен'));
                    }
                    else
                    {
                        await requestToVkAPI(new VkParameters('messages.send', chatId, 'Флуд не запущен'));

                    }
                }
                else
                {
                    await requestToVkAPI(new VkParameters('messages.send', chatId, 'У вас нет прав для использования этой команды'));
                }
            }

            if(hasCommand(commands[2], text))
            {
                console.log("IN TITLE BLOCK");
                if(from_id == adminId)
                {
                    const title = text.split(' ').splice(-1).join();
                    console.log(title);
                    await requestToVkAPI(new VkParameters('messages.editChat', chatId, title));
                }
                else
                {
                    await requestToVkAPI(new VkParameters('messages.send', chatId, 'У вас нет прав для использования этой команды'));
                }
            }
    }
    res.status(200).send('ok')
});

export default router;
