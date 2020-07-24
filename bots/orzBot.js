// Copyright (c) Tim Tsai. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory } = require('botbuilder');
const ImageList = require('../resources/imageList.json');
class OrzBot extends ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');
            const receiveText = context.activity.text;
            switch (receiveText) {
                case '早安':
                    let morningList = ImageList.imageList.filter(word => word.type === '早安');
                    let  morningImage = morningList[Math.floor(Math.random() * morningList.length)];
                    await context.sendActivity({ attachments: [this.imageCard(morningImage.url)] });
                    break;
                case '晚安':
                    let eveningList = ImageList.imageList.filter(word => word.type === '晚安');
                    let eveningImage = eveningList[Math.floor(Math.random() * eveningList.length)];
                    await context.sendActivity({ attachments: [this.imageCard(eveningImage.url)] });
                    break;
                default:
                    await this.dialog.run(context, this.dialogState);
                    break;
            }


            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }

    imageCard(url) {
        return CardFactory.heroCard(
            '',
            CardFactory.images([url])
        );
    }
}

module.exports.OrzBot = OrzBot;
