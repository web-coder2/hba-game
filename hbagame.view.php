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

    public function build_page($viewArgs)
    {
        // Например, получим текущих игроков
        $players = $this->game->loadPlayersBasicInfos();
        $players_nbr = count($players);

        // Передаем число игроков в шаблон
        $this->tpl['players_count'] = $players_nbr;

        if (!$this->game->isSpectator()) {
			$current_player_id = $this->getCurrentPlayerId();
			$current_player_color = $this->game->getPlayerColorById($current_player_id);

			/* Display a specific number / string */

			$this->tpl['YOUR_COATL_PIECES_STR'] = self::_("Your Cóatl pieces");
			$this->tpl['YOUR_HAND_STR'] = self::_("Your hand");
			$this->tpl['YOUR_CÓATLS_STR'] = self::_("Your Cóatls");
			$this->tpl['YOU_DONT_HAVE_CÓATLS'] = self::_("(You don't have Cóatls yet)");
			$this->tpl['CURRENT_PLAYER_COLOR'] = $current_player_color;

            // $this->tpl['allPlayers'] = $players;
		}


    }

}
?>