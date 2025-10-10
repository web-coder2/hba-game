<?php


declare(strict_types=1);

namespace Bga\Games\hbaGame;

class Game extends \Bga\GameFramework\Table
{
    public static array $CARD_TYPES;

    public function __construct()
    {

        parent::__construct();

        $this->initGameStateLabels(
            [
                "currentHandType" => 10,
                "trickColor" => 11,
                "alreadyPlayedHearts" => 12,
            ]
        );;

        $this->initGameStateLabels([
            "my_first_global_variable" => 10,
            "my_second_global_variable" => 11,
        ]);        

    }

    public function getGameProgression()
    {
        return 0;
    }

    public function upgradeTableDb($from_version)
    {


    }


    protected function getAllDatas(): array
    {
        $result = [];

        $current_player_id = (int) $this->getCurrentPlayerId();

        $result['cardsontable'] = $this->cards->getCardsInLocation('cardsontable');

        $result["players"] = $this->getCollectionFromDb(
            "SELECT `player_id` `id`, `player_score` `score` FROM `player`"
        );

        return $result;
    }

    protected function setupNewGame($players, $options = [])
    {

        $gameinfos = $this->getGameinfos();
        $default_colors = $gameinfos['player_colors'];

        foreach ($players as $player_id => $player) {
            $query_values[] = vsprintf("('%s', '%s', '%s', '%s', '%s')", [
                $player_id,
                array_shift($default_colors),
                $player["player_canal"],
                addslashes($player["player_name"]),
                addslashes($player["player_avatar"]),
            ]);
        }

        $this->setGameStateInitialValue('currentHandType', 0);

        $this->setGameStateInitialValue('trickColor', 0);

        $this->setGameStateInitialValue('alreadyPlayedHearts', 0);

        static::DbQuery(
            sprintf(
                "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES %s",
                implode(",", $query_values)
            )
        );

        $this->reattributeColorsBasedOnPreferences($players, $gameinfos["player_colors"]);
        $this->reloadPlayersBasicInfos();

        $this->setGameStateInitialValue("my_first_global_variable", 0);

        $this->activeNextPlayer();
    }

    public function debug_goToState(int $state = 3) {
        $this->gamestate->jumpToState($state);
    }

    public function debug_playAutomatically(int $moves = 50) {
        $count = 0;
        while (intval($this->gamestate->getCurrentMainStateId()) < 99 && $count < $moves) {
            $count++;
            foreach($this->gamestate->getActivePlayerList() as $playerId) {
                $playerId = (int)$playerId;
                $this->gamestate->runStateClassZombie($this->gamestate->getCurrentState($playerId), $playerId);
            }
        }
    }
}
