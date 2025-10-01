<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * hbagame implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *  hbagame
 * hbagame.view.php
 */

require_once( APP_BASE_PATH."view/common/game.view.php" );

class view_hbagame_hbagame extends game_view
{
    public function getGameName()
    {
        return "hbagame";
    }

    public function build_page( $viewArgs )
    {
        // Получаем базовую информацию о игроках
        $players = $this->game->loadPlayersBasicInfos();

        // Начинаем блок notecard
        $this->page->begin_block($this->getGameName() . "_" . $this->getGameName(), "notecard");
        foreach ( $players as $player_id => $info ) {
            $this->page->insert_block("notecard", array(
                "PLAYER_NAME" => $info['player_name']
            ));
        }

        // Устанавливаем переменную для "Моя рука"
        $this->tpl['MY_HAND'] = self::_('My hand');

        // Можно добавить дополнительные переменные или блоки по мере необходимости

        // Если нужно задать класс контейнера (пример из вашего второго файла)
        // Например, если есть необходимость, можно так
        // $this->tpl['GAME_CONTAINER_CLASS'] = '';

        // Можно вставлять другие блоки, если они есть
        // Например, если есть блок "player_cards" или другие
        // $this->page->begin_block( $this->getGameName() . "_" . $this->getGameName(), "player_cards" );
        // ... и т.д.

        // В конце ничего не нужно ничего дополнительно делать, все вставки осуществлены
    }
}
?>