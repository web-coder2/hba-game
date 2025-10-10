define(['dojo', 'dojo/_base/declare', 'ebg/core/gamegui', 'ebg/counter'], function (dojo, declare, gamegui, counter) {
    return declare('bgagame.hbagame', ebg.core.gamegui, {
        constructor: function () {
            console.log('hbagame constructor');
        },

        setup: function (gamedatas) {
            console.log('Starting game setup');

            this.getGameAreaElement().insertAdjacentHTML(
                'beforeend',
                `
                <div id="player-tables"></div>
            `
            );

            var numPlayers = Object.keys(gamedatas.players).length;
            Object.values(gamedatas.players).forEach((player, index) => {
                document.getElementById('player-tables').insertAdjacentHTML(
                    'beforeend',
                    `
          <div>
              <div class="playertablename" style="color:#${player.color};">${player.name}</div>
              <div class="playertablecard" id="playertablecard_${player.id}"></div>
              <div class="playertablename" id="hand_score_wrap_${player.id}"><span class="hand_score_label"></span> <span id="hand_score_${player.id}"></span></div>
          </div>

          <p>Всего игроков ${numPlayers}</p>
                      `
                );
            });

            this.setupNotifications();

            console.log('Ending game setup');
        },

        onEnteringState: function (stateName, args) {
            console.log('Entering state: ' + stateName, args);

            switch (stateName) {
                case 'dummy':
                    break;
            }
        },

        onLeavingState: function (stateName) {
            console.log('Leaving state: ' + stateName);

            switch (stateName) {
                case 'dummy':
                    break;
            }
        },

        onUpdateActionButtons: function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);

            if (this.isCurrentPlayerActive()) {
                switch (stateName) {
                    case 'PlayerTurn':
                        const playableCardsIds = args.playableCardsIds;

                        playableCardsIds.forEach((cardId) => this.statusBar.addActionButton(_('Play card with id ${card_id}').replace('${card_id}', cardId), () => this.onCardClick(cardId)));

                        this.statusBar.addActionButton(_('Pass'), () => this.bgaPerformAction('actPass'), { color: 'secondary' });
                        break;
                }
            }
        },

        onCardClick: function (card_id) {
            console.log('onCardClick', card_id);

            this.bgaPerformAction('actPlayCard', {
                card_id,
            }).then(() => {});
        },

        setupNotifications: function () {
            console.log('notifications subscriptions setup');

            this.bgaSetupPromiseNotifications();
        },
    });
});
