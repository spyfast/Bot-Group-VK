import fs from 'fs';

export function hasKey(phrases, text)
{
    if(text.slice(-1) === '"')
    {
        text = text.slice(1, -1);
    }
    return phrases.some(phrase => text.toLowerCase().startsWith(phrase));
}

export function hasCommand(command, text)
{
    if(text.slice(-1) === '"')
    {
        text = text.slice(1, -1);
    }
    return text.toLowerCase().includes(command);
}

export function lastWordIsNotCommand(command, text)
{
    if(text.slice(-1) === '"') {
        text = text.slice(1, -1);
    }
    if(command.split(' ').length > 1)
    {
        command = command.split(' ').splice(-1).join();
    }
    console.log(`${command} --- ${text}`)
    return text.split(' ').splice(-1).join() !== command;
}
export function randomNumber(min, max)
{
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function readFile(file)
{

    fs.readFile(file, async (err, data) =>
    {
        if(err) throw err;
        let array = data.toString().split("\n");
        return await array;
    });
}
