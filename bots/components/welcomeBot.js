// Copyright (c) Tim Tsai. All rights reserved.
// Licensed under the MIT License.

const { MessageFactory } = require('botbuilder');
const { OrzBot } = require('../orzBot');

/**
 * RichCardsBot prompts a user to select a Rich Card and then returns the card
 * that matches the user's selection.
 */
class Welcome extends OrzBot {
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const reply = MessageFactory.text('Welcome to OGC Bot. ' +
                        'This bot will show you different types of Rich Cards. ' +
                        'Please type anything to get started.');
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.WelcomeBot = Welcome;
