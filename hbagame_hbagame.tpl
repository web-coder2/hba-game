{OVERALL_GAME_HEADER}

<!-- <div id="card_place">
    <h3>Счетчик: <span id="counter-value">0</span></h3>
    <button id="increase-btn">Увеличить</button>
</div> -->

<div style="background-color: black; color: white">
    <h3 style="text-align: center">IT Arena</h3>
    <div id="main">
        <p>игровое поле {CURRENT_PLAYER_ID}</p>
    </div>
</div>

<script type="text/javascript">
    var counter = 0;
    document.getElementById('increase-btn').addEventListener('click', function () {
        counter++;
        document.getElementById('counter-value').innerText = counter;
    });
</script>

<style>
    .main {
        background-image: url('img/1.png');
    }
</style>

{OVERALL_GAME_FOOTER}
