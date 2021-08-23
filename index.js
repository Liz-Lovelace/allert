const {Telegraf} = require('telegraf');
const fs = require('fs')

const token = JSON.parse(fs.readFileSync(__dirname + '/tokens.json', 'utf8'))['default'];
const userId = fs.readFileSync(__dirname + '/user-id.txt', 'utf8');
const bot = new Telegraf(token);

function delay(t){
  return new Promise((resolve)=>{
    setTimeout(()=>{resolve();}, t);
  });
}

bot.launch();

let inputFilePath ='/input';
async function watchInput(){
  while (true) {
    await delay(1000);
    let input = await fs.promises.readFile(inputFilePath, 'utf8');
    if (!input)
      continue;
    console.log(input);
    await bot.telegram.sendMessage(userId, input);
    await fs.promises.writeFile(inputFilePath, '');
  }
}
watchInput();