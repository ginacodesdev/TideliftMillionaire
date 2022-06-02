#! /usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome () {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A Tidelift Millionaire? \n'
    )

    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue('How To Play')}
    I am a process on your  computer. 
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        }
    })

    playerName = answers.player_name
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1', 
        type: 'list',
        message: 'Tidelift\'s mission is to make open source better for who?\n',
        choices: [
            'aliens',
            'animals',
            'authors',
            'everyone'
        ],
    })
    return handleAnswer(answers.question_1 == 'everyone')
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2', 
        type: 'list',
        message: 'Tidelift\'s children book is titled: \n',
        choices: [
            'Cooking with Pint Sized People',
            'Lift The Mini Tide',
            'Cooking with Tidelift',
            'Look at what I can do'
        ],
    })
    return handleAnswer(answers.question_2 == 'Cooking with Tidelift')
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3', 
        type: 'list',
        message: 'The list of all package releases in a repository is called the...\n',
        choices: [
            'bill of materials',
            'catalog',
            'alignment',
            'downstream'
        ],
    })
    return handleAnswer(answers.question_3 == 'bill of materials')
}


async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}`})
    } else {
        spinner.error({ text: `Game over, you lose ${playerName}!`})
        process.exit(1)
    }
}

function winner() {
    console.clear()
    const msg = `Congrats , ${playerName} !\n $1,000,000`

    figlet (msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}



console.clear()
await welcome()
await askName()
await question1()
await question2()
await question3()
winner()

//This app is based on a tutorial from fireship io. thanks fireship 