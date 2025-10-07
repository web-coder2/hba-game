{OVERALL_GAME_HEADER}

<!-- <div>
    <h3 style="text-align: center">IT Arena {CURRENT_PLAYER_ID}</h3>
</div> -->

<div class="first_section">
    <div class="round_div">
        <h4 style="z-index: 9999999">Жетон маркера раунд</h4>
    </div>
    <div class="projects_div">
        <h4>IT проекты</h4>
    </div>
    <div class="actions_div">
        <h4>События</h4>
    </div>
    <!-- <div class="main_div">
        <p>номер раунда:</p>
        <p>комбинация:</p>
    </div> -->
</div>

<div class="player_section">
    <div class="player_pad">
        <h4>Планшет игрока</h4>
    </div>
    <div class="player_stats">
        <h4>Статисткиа игрока</h4>
        <p>Баджерсы: 100</p>
        <p>Найм сотрудников: 5</p>
        <p>выполение задач: 5</p>
    </div>
</div>

<script type="text/javascript">
    var counter = 0;
    document.getElementById('increase-btn').addEventListener('click', function () {
        counter++;
        document.getElementById('counter-value').innerText = counter;
    });
</script>

{OVERALL_GAME_FOOTER}
